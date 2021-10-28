

# Create your views here.
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect, HttpResponse
from .serializers import *
from .models import *
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

#


class AuthView(APIView):
    def get(self, request):

        if request.user.is_authenticated:
            return Response({"login": True})

        else:
            return Response({"login": False})
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
            return Response({})

        return Response(serializer.data)


# 팀 생성

class MakeTeam(APIView):
    def post(self, request):

        user = User.objects.get(username=request.user)
        name = request.data['name']
        top = Player.objects.get(pk=request.data['top'])
        top1 = MyPlayer(player=top, user=user, status1=top.status1, status2=top.status2, status3=top.status3,
                        level=1)
        top1.save()

        jungle = Player.objects.get(pk=request.data['jungle'])
        jungle1 = MyPlayer(player=jungle, user=user, status1=jungle.status1, status2=jungle.status2, status3=jungle.status3,
                           level=1)
        jungle1.save()

        mid = Player.objects.get(pk=request.data['mid'])
        mid1 = MyPlayer(player=mid, user=user, status1=mid.status1, status2=mid.status2, status3=mid.status3,
                        level=1)
        mid1.save()

        adc = Player.objects.get(pk=request.data['adc'])

        adc1 = MyPlayer(player=adc, user=user, status1=adc.status1, status2=adc.status2, status3=adc.status3,
                        level=1)
        adc1.save()

        sup = Player.objects.get(pk=request.data['sup'])
        sup1 = MyPlayer(player=sup, user=user, status1=sup.status1, status2=sup.status2, status3=sup.status3,
                        level=1)
        sup1.save()
        total_money = request.data['total_money']

        myteam = MyTeam(user=user, name=name, top=top1, jungle=jungle1, mid=mid1,
                        adc=adc1, support=sup1, money=total_money)
        myteam.save()

        league = League(my_team=myteam, season='Spring', user=user)
        league.save()

        team = Team.objects.order_by('?')[0:9]

        for idx, elem in enumerate(team):
            league_team = LeagueTeam(
                base_team=elem, team_num=idx, league=league)
            league_team.save()
        return Response({
            'success': True
        })


class GetSchedules(APIView):

    def get(self, request):
        user = User.objects.get(username=request.user)
        league = League.objects.get(user=user, state_finish=False)
        season = league.season

        return_data = []
        count = 0
        i = league.current_date

        while True:

            schedules = LeagueSchedule.objects.filter(day=i)

            for schedule in schedules:
                elem = {"team1": None, "team2": None, "date": None}
                if schedule.team1 == -1:
                    continue
                else:
                    if schedule.team1 < 9:
                        elem["team1"] = LeagueTeam.objects.get(
                            league=league, team_num=schedule.team1).base_team.name
                    else:
                        elem["team1"] = MyTeam.objects.get(user=user).name
                    if schedule.team2 < 9:
                        elem["team2"] = LeagueTeam.objects.get(
                            league=league, team_num=schedule.team2).base_team.name
                    else:
                        elem["team2"] = MyTeam.objects.get(user=user).name
                    if season == 'spring':
                        elem["date"] = schedule.spring
                    else:
                        elem["date"] = schedule.summer
                    return_data.append(elem)
                    count += 1
            i += 1
            if count == 10:
                break

        data = {"schedule": return_data}
        return Response(data)

# 리그진행


class ProgressLeague(APIView):

    def post(self, request):
        user = User.objects.get(username=request.user)
        try:
            league = League.objects.get(user=user, state_finish=False)
        except:
            league = None
        # 리그가 있는지 확인
        if league:
            current_date = league.current_date
            schedules = LeagueSchedule.objects.filter(day=current_date)
            for elem in schedules:
                if elem.team1 == 0 or elem.team2 == 0:
                    # match데이터를 확인한다.
                    try:
                        match = Match.objects.get(
                            status_finish=False, league=league)
                    except:
                        match = None

                    if not match:
                        m = Match(team_num1=elem.team1,
                                  team_num2=elem.team2, league=league)
                        m.save()
                        if elem.team1 == 0:
                            s = Set(side=1, match=m)

                        else:
                            s = Set(side=0, match=m)
                        s.save()
                        top = ChampionSerializer(
                            Champion.objects.filter(position="Top"), many=True)
                        jng = ChampionSerializer(
                            Champion.objects.filter(position="Jungle"), many=True)
                        mid = ChampionSerializer(
                            Champion.objects.filter(position="Middle"), many=True)
                        adc = ChampionSerializer(
                            Champion.objects.filter(position="Bottom"), many=True)
                        sup = ChampionSerializer(
                            Champion.objects.filter(position="Support"), many=True)
                        champion_data = {
                            "top": top.data,
                            "jng": jng.data,
                            "mid": mid.data,
                            "adc": adc.data,
                            "sup": sup.data

                        }
                        return Response({
                            "league": True,
                            "my_team": True,
                            "other_team": False,
                            "banpick": True,
                            "set_num": 1,
                            "set_id": s.id,
                            "data": champion_data
                        })

                    else:
                        set_num = match.set_num
                        set = Set.objects.get(match=match, set_num=set_num)
                        if set.status == 'bp':
                            top = ChampionSerializer(
                                Champion.objects.filter(position="Top"), many=True)
                            jng = ChampionSerializer(
                                Champion.objects.filter(position="Jungle"), many=True)
                            mid = ChampionSerializer(
                                Champion.objects.filter(position="Middle"), many=True)
                            adc = ChampionSerializer(
                                Champion.objects.filter(position="Bottom"), many=True)
                            sup = ChampionSerializer(
                                Champion.objects.filter(position="Support"), many=True)
                            champion_data = {
                                "top": top.data,
                                "jng": jng.data,
                                "mid": mid.data,
                                "adc": adc.data,
                                "sup": sup.data

                            }
                            return Response({
                                "league": True,
                                "my_team": True,
                                "other_team": False,
                                "banpick": True,
                                "set_num": set_num,
                                "set_id": set.id,
                                "data": champion_data
                            })

                        else:
                            set_data = SetSerializer(set)
                            return Response({
                                "league": True,
                                "my_team": True,
                                "other_team": False,
                                "banpick": False,
                                "data": set_data.data
                            })

                if elem.team1 == -1:
                    return Response({
                        "league": True,
                        "my_team": False,
                        "other_team": False,
                        "banpick": False
                    })

            return Response({
                "league": True,
                "my_team": False,
                "other_team": True,
                "banpick": False
            })

        else:
            return Response({"league": False})

# 밴픽 완료


class BanPick(APIView):
    def post(self, request):
        user = request.user
        set_id = request.data['set_id']
        try:
            set = Set.objects.get(pk=set_id)
        except:
            return Response({"Success": False})

        btop = request.data['btop']
        bjng = request.data['bjng']
        bmid = request.data['bmid']
        badc = request.data['badc']
        bsup = request.data['bsup']
        rtop = request.data['rtop']
        rjng = request.data['rjng']
        rmid = request.data['rmid']
        radc = request.data['radc']
        rsup = request.data['rsup']

        if set.side == 1:
            set.my_top = Champion.objects.get(pk=btop)
            set.my_jng = Champion.objects.get(pk=bjng)
            set.my_mid = Champion.objects.get(pk=bmid)
            set.my_adc = Champion.objects.get(pk=badc)
            set.my_sup = Champion.objects.get(pk=bsup)
            set.op_top = Champion.objects.get(pk=rtop)
            set.op_jng = Champion.objects.get(pk=rjng)
            set.op_mid = Champion.objects.get(pk=rmid)
            set.op_adc = Champion.objects.get(pk=radc)
            set.op_sup = Champion.objects.get(pk=rsup)
            set.status = "ongoing"
            set.save()

        else:
            set.my_top = Champion.objects.get(pk=rtop)
            set.my_jng = Champion.objects.get(pk=rjng)
            set.my_mid = Champion.objects.get(pk=rmid)
            set.my_adc = Champion.objects.get(pk=radc)
            set.my_sup = Champion.objects.get(pk=rsup)
            set.op_top = Champion.objects.get(pk=btop)
            set.op_jng = Champion.objects.get(pk=bjng)
            set.op_mid = Champion.objects.get(pk=bmid)
            set.op_adc = Champion.objects.get(pk=badc)
            set.op_sup = Champion.objects.get(pk=bsup)
            set.status = "ongoing"
            set.save()
        return Response({"Success": True})
