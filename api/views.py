

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from django.contrib.auth.models import User


class UserListAPI(APIView):
    def get(self, request):
        print(request.user)
        test = {"hi": "hi"}
        return Response(test)
