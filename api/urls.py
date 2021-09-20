# api/urls.py
from django.urls import path, include, re_path
from rest_auth.registration.views import VerifyEmailView, RegisterView
from .views import *

urlpatterns = [


    path("userlist/", UserListAPI.as_view()),

    # 로그인 회원가입 관련 api
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/', RegisterView.as_view(), name='rest_register'),
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            ConfirmEmailView.as_view(), name='account_confirm_email'),

]
