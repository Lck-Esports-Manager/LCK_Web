

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets, generics
from .serializers import UserSerializer
from django.contrib.auth.models import User


class UserListAPI(generics.ListCreateAPIView):

    serializer_class = UserSerializer
    queryset = User.objects.all()
