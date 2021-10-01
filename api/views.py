

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect, HttpResponse
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC


# 이메일인증 API
class ConfirmEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        # A React Router Route will handle the failure scenario
        return HttpResponseRedirect('/')

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return HttpResponseRedirect('/')
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs


# 선수 도감 API

class PlayerListView(APIView):
    def get(self, request):

        name = request.query_params.get('name', None)
        rate = request.query_params.get('rate', None)
        position = request.query_params.get('position', None)
        season = request.query_params.get('season', None)
        year = request.query_params.get('year', None)
        result = Player.objects.all()

        if name != None:
            result = result.filter(name=name)
        if rate != None:
            result = result.filter(rate=rate)
        if position != None:
            result = result.filter(position=position)
        if season != None:
            result = result.filter(season=season)
        if year != None:
            result = result.filter(year=year)

        serializer = PlayerSerializer(result, many=True)
        return Response(serializer.data)

# 선수 상세 정보 API


class PlayerDetailView(APIView):

    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            serializer = PlayerSerializer(Player.objects.get(id=id))
        except:
            return Response([])

        return Response(serializer.data)
