# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC


class AddSub(APIView):
    def post(self, request):
        user = request.user
        id = request.data['player_id']
        base = Player.objects.get(pk=id)
        new = MyPlayer(player=base, user=user, status1=base.status1,
                       status2=base.status2, status3=base.status3)
        new.save()
        my_team = MyTeam.objects.get(user=user)
        my_team.sub1 = new
        my_team.save()
        return Response({"success": True})
