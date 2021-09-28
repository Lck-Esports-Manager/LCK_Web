

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
        rate = request.query_params.get('rate', None)
        position = request.query_params.get('position', None)
        season = request.query_params.get('season', None)

        print(rate, position, season)

        serializer = PlayerSerializer(Player.objects.all(), many=True)
        # serializer = PlayerSerializer(
        #     Player.objects.filter(season=''), many=True)
        return Response(serializer.data)

# 선수 상세 정보 API


class PlayerDetailView(APIView):
    def get(self, request):
        id = request.query_params.get('id', None)

        serializer = PlayerSerializer(Player.objects.get(id=id))
        return Response(serializer.data)
