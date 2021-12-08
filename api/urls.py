# api/urls.py
from django.urls import path, include, re_path
from rest_auth.registration.views import VerifyEmailView, RegisterView
from django.conf import settings
from django.conf.urls.static import static
from .views import *
from .league_process_view import *
from .prediction_model_views import *
from .test_view import *

urlpatterns = [

    path('auth/', AuthView.as_view()),
    # 선수 도감
    path('playerlist/', PlayerListView.as_view()),
    path('playerlist/detail/', PlayerDetailView.as_view()),

    # 챔피언 가져오기

    path('champion/', ChampionListView.as_view()),
    path('champion/detail/', ChampionDetailView.as_view()),
    # 팀 생성
    path('maketeam/', MakeTeam.as_view()),
    path('makenewleague/', MakeNewLeague.as_view()),

    # 스케줄 5개 가져오기(main page에서 사용)

    path('getschedule/', GetSchedules.as_view()),
    path('getdayschedule/', GetDaySchedules.as_view()),

    # 다른 팀 경기 진행
    path('otherteamprocess/', OtherTeamProcess.as_view()),
    # 리그 진행

    path('progressleague/', ProgressLeague.as_view()),

    # 밴픽 완료

    path('banpick/', BanPick.as_view()),

    # 팀정보
    path('teaminfo/', TeamInfo.as_view()),
    path('updatestatus/', IncreaseStatus.as_view()),
    path('enterprisestart/', EnterpriseStart.as_view()),
    path('sponsorstart/', SponsorStart.as_view()),
    path('changeroaster/', ChangeRoaster.as_view()),
    path('removeplayer/',RemovePlayer.as_view()),
    path('addplayer/',AddPlayer.as_view()),
    # 선택지 가져오기

    path('makeselection/', MakeSelection.as_view()),

    # 선택지 적용

    path('selectionprocess/', ProcessSelection.as_view()),

    # 스케줄가져오기

    path('personalschedule/', GetPersonalSchedule.as_view()),

    # 개인스케줄 진행하기

    path('progresspersonalschedule/', ProgressSchedule.as_view()),

    # 리그 랭킹
    path('leaguerank/', LeagueRank.as_view()),
    path('modeltest/', MachineLearningModel.as_view()),
    #리그 68만들기
    path('leagueend/', Make68.as_view()),
    # 내 선수 상세보기
    path('myplayerdetail/', MyPlayerInfo.as_view()),

    # 테스트
    path('addsub/', AddSub.as_view()),
    # 로그인 회원가입 관련 api
    path('sponsor/', SponsorView.as_view()),
    path('enterprise/', EnterpriseView.as_view()),
    

    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),
    path('rest-auth/registration/', RegisterView.as_view(), name='rest_register'),
    re_path(r'^account-confirm-email/$', VerifyEmailView.as_view(),
            name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
            ConfirmEmailView.as_view(), name='account_confirm_email'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
