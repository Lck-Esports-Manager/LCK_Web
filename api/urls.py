# api/urls.py
from django.urls import path, include
from .views import UserListAPI

urlpatterns = [
    path("userlist/", UserListAPI.as_view()),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),
]
