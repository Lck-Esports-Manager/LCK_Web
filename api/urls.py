# api/urls.py
from django.urls import path, include
from .views import UserListAPI

urlpatterns = [
    path("userlist/", UserListAPI.as_view()),


]
