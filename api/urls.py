# api/urls.py
from django.urls import path, include, re_path
from rest_auth.registration.views import VerifyEmailView, RegisterView
from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [

    # 선수 도감
    path('playerlist/', PlayerListView.as_view()),
    path('playerlist/detail/', PlayerDetailView.as_view()),

    # 팀 생성
    path('maketeam/', test.as_view()),

    # 로그인 회원가입 관련 api
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/', RegisterView.as_view(), name='rest_register'),
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            ConfirmEmailView.as_view(), name='account_confirm_email'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
