

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

import random


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


# 챔피언 list
class ChampionListView(APIView):

    def get(self, request):

        tier = request.query_params.get('tier', None)
        position = request.query_params.get('position', None)

        result = Champion.objects.all()

        if position != None:
            result = result.filter(position=position)
        if tier != None:
            result = result.filter(grade=tier)

        serializer = ChampionSerializer(result, many=True)
        return Response(serializer.data)


class ChampionDetailView(APIView):

    def get(self, request):
        id = request.query_params.get('id', None)

        try:
            serializer = ChampionSerializer(Champion.objects.get(id=id))
        except:
            return Response({})

        return Response(serializer.data)
# 팀 생성


class MakeTeam(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        user = User.objects.get(username=request.user)
        try:
            my_team = MyTeam.objects.get(user=user)
        except:
            my_team = None

        if my_team:
            return Response({
                "success": False,
                "message": "There is your team already"
            })

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
                base_team=elem, team_num=idx+1, league=league)
            league_team.save()
        return Response({
            'success': True
        })


class GetSchedules(APIView):

    def get(self, request):
        user = request.user
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
                    if schedule.team1 > 0:
                        elem["team1"] = LeagueTeam.objects.get(
                            league=league, team_num=schedule.team1).base_team.name
                    else:
                        elem["team1"] = MyTeam.objects.get(user=user).name
                    if schedule.team2 > 0:
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
    def get_score(self, match):
        if match.set_num == 1:
            return [0, 0]
        else:
            if match.result == 1:
                return [1, 0]
            else:
                return [0, 1]

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
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
                    my_team_data = dict()
                    op_team_data = dict()
                    my_team = MyTeam.objects.get(user=user)
                    my_top_p = SimplePlayerSerializer(my_team.top.player)
                    my_jng_p = SimplePlayerSerializer(my_team.jungle.player)
                    my_mid_p = SimplePlayerSerializer(my_team.mid.player)
                    my_adc_p = SimplePlayerSerializer(my_team.adc.player)
                    my_sup_p = SimplePlayerSerializer(my_team.support.player)
                    my_team_data['name'] = my_team.name
                    my_team_data['top'] = my_top_p.data
                    my_team_data['jng'] = my_jng_p.data
                    my_team_data['mid'] = my_mid_p.data
                    my_team_data['adc'] = my_adc_p.data
                    my_team_data['sup'] = my_sup_p.data
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
                        score = self.get_score(m)

                        if elem.team1 == 0:
                            op_team__ = LeagueTeam.objects.get(
                                league=league, team_num=elem.team2)
                            op_team = op_team__.base_team
                            op_team_data['name'] = op_team.name

                            top_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Top")[0])
                            op_team_data['top'] = top_p.data
                            jng_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Jungle")[0])
                            op_team_data['jng'] = jng_p.data
                            mid_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Middle")[0])
                            op_team_data['mid'] = mid_p.data
                            adc_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="ADC")[0])
                            op_team_data['adc'] = adc_p.data
                            sup_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Support")[0])
                            op_team_data['sup'] = sup_p.data
                            s = Set(side=1, match=m)

                        else:
                            op_team__ = LeagueTeam.objects.get(
                                league=league, team_num=elem.team1)
                            op_team = op_team__.base_team
                            op_team_data['name'] = op_team.name

                            top_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Top")[0])
                            op_team_data['top'] = top_p.data
                            jng_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Jungle")[0])
                            op_team_data['jng'] = jng_p.data
                            mid_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Middle")[0])
                            op_team_data['mid'] = mid_p.data
                            adc_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="ADC")[0])
                            op_team_data['adc'] = adc_p.data
                            sup_p = SimplePlayerSerializer(Player.objects.filter(
                                team=op_team, position="Support")[0])
                            op_team_data['sup'] = sup_p.data

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
                            "score": score,
                            "my_team_data": my_team_data,
                            "op_team_data": op_team_data,
                            "set_num": 1,
                            "set_id": s.id,
                            "side": s.side,
                            "data": champion_data
                        })

                    else:
                        set_num = match.set_num
                        score = self.get_score(match)
                        op_team_data = {}
                        if match.team_num1 != 0:
                            op_team__ = LeagueTeam.objects.get(
                                league=league, team_num=match.team_num1)
                        else:
                            op_team__ = LeagueTeam.objects.get(
                                league=league, team_num=match.team_num2)

                        op_team = op_team__.base_team
                        op_team_data['name'] = op_team.name

                        top_p = SimplePlayerSerializer(Player.objects.filter(
                            team=op_team, position="Top")[0])
                        op_team_data['top'] = top_p.data
                        jng_p = SimplePlayerSerializer(Player.objects.filter(
                            team=op_team, position="Jungle")[0])
                        op_team_data['jng'] = jng_p.data
                        mid_p = SimplePlayerSerializer(Player.objects.filter(
                            team=op_team, position="Middle")[0])
                        op_team_data['mid'] = mid_p.data
                        adc_p = SimplePlayerSerializer(Player.objects.filter(
                            team=op_team, position="ADC")[0])
                        op_team_data['adc'] = adc_p.data
                        sup_p = SimplePlayerSerializer(Player.objects.filter(
                            team=op_team, position="Support")[0])
                        op_team_data['sup'] = sup_p.data

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
                                "score": score,
                                "my_team_data": my_team_data,
                                "op_team_data": op_team_data,
                                "side": set.side,
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
                                "score": score,
                                "my_team_data": my_team_data,
                                "op_team_data": op_team_data,
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
            try:
                past_league = League.objects.filter(
                    user=user, state_finish=False)
            except:
                past_league = None
            if past_league:
                return Response({"league": False,
                                "past_league": True})
            else:
                return Response({"league": False,
                                "past_league": False})

# 밴픽 완료


class BanPick(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
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


# 선택지 만들기
class MakeSelection(APIView):

    def lane_press(self):
        turn = self.set.turn
        if turn > 4:
            return 0
        match = self.set.match
        team1 = match.team_num1
        team2 = match.team_num2
        league = match.league
        if team1 == 0:

            self.my_team = league.my_team
            op_team_temp = LeagueTeam.objects.get(
                league=league, team_num=team2)
            self.op_team = op_team_temp.base_team

        else:
            self.my_team = league.my_team
            op_team_temp = LeagueTeam.objects.get(
                league=league, team_num=team1)
            self.op_team = op_team_temp.base_team

        my_top = self.my_team.top
        my_mid = self.my_team.mid
        my_adc = self.my_team.adc
        my_sup = self.my_team.support
        my_top_champ = self.set.my_top
        my_mid_champ = self.set.my_mid
        my_adc_champ = self.set.my_adc
        my_sup_champ = self.set.my_sup

        op_top = Player.objects.filter(team=self.op_team, position='Top')[0]
        op_mid = Player.objects.filter(team=self.op_team, position='Middle')[0]
        op_adc = Player.objects.filter(team=self.op_team, position='ADC')[0]
        op_sup = Player.objects.filter(
            team=self.op_team, position='Support')[0]
        op_top_champ = self.set.op_top
        op_mid_champ = self.set.op_mid
        op_adc_champ = self.set.op_adc
        op_sup_champ = self.set.op_sup
        my_top_grade = my_top.status1 * \
            (1+0.1*my_top.feeling)+(6-my_top_champ.grade)*10
        op_top_grade = op_top.status1 + (6-op_top_champ.grade)*10
        my_mid_grade = my_mid.status1 * \
            (1+0.1*my_mid.feeling)+(6-my_mid_champ.grade)*10
        op_mid_grade = op_mid.status1+(6-op_mid_champ.grade)*10
        my_bot_grade = my_adc.status1*(1+0.1*my_adc.feeling) + \
            (6-my_adc_champ.grade)*10+my_sup.status1 * \
            (1+0.1*my_sup.feeling)+(6-my_sup_champ.grade)*10
        op_bot_grade = op_adc.status1 + \
            (6-op_adc_champ.grade)*10+op_sup.status1+(6-op_sup_champ.grade)*10

        if turn % 2 == 1:
            self.data["lane_press"]["top"][0] = (my_top_grade > op_top_grade)
            self.data["lane_press"]["mid"][0] = (my_mid_grade > op_mid_grade)
            self.data["lane_press"]["bot"][0] = (my_bot_grade > op_bot_grade)

        else:
            self.data["lane_press"]["top"][0] = (my_top_grade < op_top_grade)
            self.data["lane_press"]["mid"][0] = (my_mid_grade < op_mid_grade)
            self.data["lane_press"]["bot"][0] = (my_bot_grade < op_bot_grade)
        return 0

    def ganking(self):
        if self.set.turn > 4:
            return 0
        self.data["ganking"]["top"][0] = True
        self.data["ganking"]["mid"][0] = True
        self.data["ganking"]["bot"][0] = True
        return 0

    def engage(self):
        self.data["engage"]["top"][0] = True
        self.data["engage"]["mid"][0] = True
        self.data["engage"]["bot"][0] = True
        return 0

    def fight(self):
        turn = self.set.turn
        if self.set.turn < 5:
            return 0
        self.data["fight"]["dragon"][0] = (turn % 2 == 1)
        self.data["fight"]["baron"][0] = (turn % 2 == 1) and (turn > 8)
        self.data["fight"]["elder"][0] = (turn % 2 == 1) and (
            self.set.my_dragon >= 4 or self.set.op_dragon >= 4)
        self.data["fight"]["normal"][0] = (turn % 2 == 0)

        return 0

    def tower_press(self):
        turn = self.set.turn
        if turn < 5:
            return 0
        if turn % 2 == 1:
            self.data["tower_press"]["top"][0] = (self.set.op_tower1 > 0) or (
                self.set.op_tower4 > 0) or (self.set.op_tower7 > 0)
            self.data["tower_press"]["mid"][0] = (self.set.op_tower2 > 0) or (
                self.set.op_tower5 > 0) or (self.set.op_tower8 > 0)
            self.data["tower_press"]["bot"][0] = (self.set.op_tower3 > 0) or (
                self.set.op_tower6 > 0) or (self.set.op_tower9 > 0)

            if self.set.is_baron == 1:
                self.data["tower_press"]["top"][1] = 1
                self.data["tower_press"]["mid"][1] = 1
                self.data["tower_press"]["bot"][1] = 1

        else:
            self.data["tower_press"]["top"][0] = (self.set.my_tower1 > 0) or (
                self.set.my_tower4 > 0) or (self.set.my_tower7 > 0)
            self.data["tower_press"]["mid"][0] = (self.set.my_tower2 > 0) or (
                self.set.my_tower5 > 0) or (self.set.my_tower8 > 0)
            self.data["tower_press"]["bot"][0] = (self.set.my_tower3 > 0) or (
                self.set.my_tower6 > 0) or (self.set.my_tower9 > 0)

            if self.set.is_baron == -1:
                self.data["tower_press"]["top"][1] = 1
                self.data["tower_press"]["mid"][1] = 1
                self.data["tower_press"]["bot"][1] = 1

        return 0

    def tower_destroy(self):
        turn = self.set.turn
        if turn < 5:
            return 0
        if turn % 2 == 1:
            self.data["tower_destroy"]["top"][0] = (self.set.op_tower1 > 0) or (
                self.set.op_tower4 > 0) or (self.set.op_tower7 > 0)
            self.data["tower_destroy"]["mid"][0] = (self.set.op_tower2 > 0) or (
                self.set.op_tower5 > 0) or (self.set.op_tower8 > 0)
            self.data["tower_destroy"]["bot"][0] = (self.set.op_tower3 > 0) or (
                self.set.op_tower6 > 0) or (self.set.op_tower9 > 0)

            print(self.data["tower_destroy"]["bot"][0])

            if self.set.is_baron == 1:
                self.data["tower_destroy"]["top"][1] = 1
                self.data["tower_destroy"]["mid"][1] = 1
                self.data["tower_destroy"]["bot"][1] = 1

        else:
            self.data["tower_destroy"]["top"][0] = (self.set.my_tower1 > 0) or (
                self.set.my_tower4 > 0) or (self.set.my_tower7 > 0)
            self.data["tower_destroy"]["mid"][0] = (self.set.my_tower2 > 0) or (
                self.set.my_tower5 > 0) or (self.set.my_tower8 > 0)
            self.data["tower_destroy"]["bot"][0] = (self.set.my_tower3 > 0) or (
                self.set.my_tower6 > 0) or (self.set.my_tower9 > 0)

            if self.set.is_baron == -1:
                self.data["tower_destroy"]["top"][1] = 1
                self.data["tower_destroy"]["mid"][1] = 1
                self.data["tower_destroy"]["bot"][1] = 1
        return

    def nexus_destroy(self):
        turn = self.set.turn
        if turn % 2 == 1:
            logic = (self.set.op_tower7 == 0 and self.set.my_tower_destroy >= 6) or (self.set.op_tower8 ==
                                                                                     0 and self.set.my_tower_destroy >= 6) or (self.set.op_tower9 == 0 and self.set.my_tower_destroy >= 6)
            self.data["nexus_destroy"] = logic
        else:
            logic = (self.set.my_tower7 == 0 and self.set.op_tower_destroy >= 6) or (self.set.my_tower8 ==
                                                                                     0 and self.set.op_tower_destroy >= 6) or (self.set.my_tower9 == 0 and self.set.op_tower_destroy >= 6)
            self.data["nexus_destroy"] = logic

        return

    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        self.data = {"lane_press": {"top": [False, 1, 1], "mid": [False, 1, 2], "bot": [False, 1, 3]},
                     "ganking": {"top": [False, 1, 4], "mid": [False, 1, 5], "bot": [False, 1, 6]},
                     "engage": {"top": [False, 2, 7], "mid": [False, 2, 8], "bot": [False, 2, 9]},
                     "fight": {"dragon": [False, 3, 10], "elder": [False, 3, 11], "baron": [False, 3, 12], "normal": [False, 3, 13]},
                     "tower_press": {"top": [False, 1, 14], "mid": [False, 1, 15], "bot": [False, 1, 16]},
                     "tower_destroy": {"top": [False, 2, 17], "mid": [False, 2, 18], "bot": [False, 2, 19]},
                     "nexus_destroy": [False, 3, 20]}
        # 쿼리에서 세트 가져오기
        set_id = request.query_params.get('set', None)

        self.set = Set.objects.get(pk=set_id)
        self.lane_press()
        self.ganking()
        self.engage()
        self.fight()
        self.tower_press()
        self.tower_destroy()
        self.nexus_destroy()
        return Response(self.data)


# 다른 팀들 경기 진행

class OtherTeamProcess(APIView):

    def get_team_power(self, num):
        pos = ['Top', 'Jungle', 'Middle', 'ADC', 'Support']
        team_power = 0
        team = self.team1 if num == 1 else self.team2

        base_team = team.base_team

        for elem in pos:
            player = Player.objects.filter(team=base_team, position=elem)[0]
            score = 6-player.rate
            team_power = team_power+score

        return team_power

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
        # 유저가져옴
        self.user = request.user
        # 리그 가져옴
        self.league = League.objects.get(user=self.user, state_finish=False)

        # 리그에서 현재 day가져와서
        date = self.league.current_date

        schedules = LeagueSchedule.objects.filter(day=date)

        for elem in schedules:
            if elem.team1 == -1:
                self.league.current_date = self.league.current_date+1
                if self.league.current_date > 68:
                    self.league.state_finish = True
                self.league.save()
                # 날짜만 증가 시킴
                return Response({
                    "success": True
                })

            if elem.team1 == 0 or elem.team2 == 0:
                continue

            self.team1 = LeagueTeam.objects.get(
                league=self.league, team_num=elem.team1)
            self.team2 = LeagueTeam.objects.get(
                league=self.league, team_num=elem.team2)
            team_power1 = self.get_team_power(1)
            team_power2 = self.get_team_power(2)
            rate = team_power1/(team_power1+team_power2)
            rand = random.random()
            if rand < rate:  # team1 win
                self.team1.win = self.team1.win+1
                self.team2.lose = self.team2.lose+1

            else:
                self.team2.win = self.team2.win+1
                self.team1.lose = self.team1.lose+1

            self.team1.save()
            self.team2.save()

        self.league.current_date = self.league.current_date+1
        if self.league.current_date > 68:
            self.league.state_finish = True
        self.league.save()

        # 아군팀 있으면 무시
        # 다른팀들 게임 진행
        # 경기 없으면 그냥 패스
        # day하나 증가
        return Response({
            "success": True
        })


class TeamInfo(APIView):

    def initiate(self):

        self.league = League(user=self.user, state_finish=False)
        self.my_team = MyTeam.objects.get(user=self.user)
        return

    def get_available_sponsor(self):
        rt = []
        temp = Sponsor.objects.all()
        for elem in temp:
            rt.append(elem.name)

        if self.league.win < 3:
            rt.remove('블루불')
        if self.league.win < 7:
            rt.remove('오디도스')
        if self.league.win < 3:
            rt.remove('DWM')

        for elem in rt:
            if self.my_team.sponsor1:
                if self.my_team.sponsor1.name in rt:
                    rt.remove(elem)
                    continue
            if self.my_team.sponsor2:
                if self.my_team.sponsor2.name in rt:
                    rt.remove(elem)
                    continue
            if self.my_team.sponsor3:
                if self.my_team.sponsor3.name in rt:
                    rt.remove(elem)
                    continue

        result = []
        for elem in rt:
            result.append(Sponsor.objects.get(name=elem))
        return result

    def get_available_enterprise(self):
        rt = []
        temp = Enterprise.objects.all()
        for elem in temp:
            rt.append(elem.name)

        for elem in rt:

            if self.my_team.enterprise1:
                if self.my_team.enterprise1.name in rt:
                    rt.remove(elem)
                    continue
            if self.my_team.enterprise2:
                if self.my_team.enterprise2.name in rt:
                    rt.remove(elem)
                    continue

        result = []
        for elem in rt:
            result.append(Enterprise.objects.get(name=elem))
        return result

    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        self.user = request.user
        self.initiate()
        my_team_serializer = MyTeamSerializer(self.my_team)

        available_sponsor = self.get_available_sponsor()
        sponsor_serializer = SponsorSerializer(available_sponsor, many=True)

        available_enterprise = self.get_available_enterprise()
        enterprise_serializer = EnterpriseSerializer(
            available_enterprise, many=True)

        response_data = {
            "my_team": my_team_serializer.data,
            "available_sponsor": sponsor_serializer.data,
            "available_enterprise": enterprise_serializer.data
        }
        # 알아서 팀 정보 전달!!
        return Response(response_data)

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
        self.user = request.user
        self.initiate()
        try:

            self.my_team.top = MyPlayer.objects.get(pk=request.data['top'])
            self.my_team.jungle = MyPlayer.objects.get(pk=request.data['jng'])
            self.my_team.mid = MyPlayer.objects.get(pk=request.data['mid'])
            self.my_team.adc = MyPlayer.objects.get(pk=request.data['adc'])
            self.my_team.support = MyPlayer.objects.get(pk=request.data['sup'])
            self.my_team.sub1 = MyPlayer.objects.get(
                pk=request.data['sub1']) if request.data['sub1'] else None
            self.my_team.sub2 = MyPlayer.objects.get(
                pk=request.data['sub2']) if request.data['sub2'] else None
        except:
            return Response({
                "success": False
            })
            # 유저 팀 가져와서
            # 알아서 할당
        return Response({
            "success": True
        })


class GetPersonalSchedule(APIView):

    def get(self, request):
        schedules = Schedule.objects.all()
        schedule_serializer = ScheduleSerializer(schedules, many=True)

        return Response(schedule_serializer.data)


class ProgressSchedule(APIView):
    def progress_schedule(self, my_player, id):

        if id == None:
            return

        if id == 1:
            temp_cond = my_player.feeling+2
            new_condtion = 2 if temp_cond > 2 else temp_cond
            temp_exp = my_player.exp-3
            new_exp = 0 if temp_exp < 0 else temp_exp
            my_player.feeling = new_condtion
            my_player.exp = new_exp
            my_player.save()

            # 휴식:컨디션 +2 경험치 -3
            return

        elif id == 2:  # 헬스 : 컨디션+1
            temp_cond = my_player.feeling+1
            new_condtion = 2 if temp_cond > 2 else temp_cond
            my_player.feeling = new_condtion
            my_player.save()
            return

        elif id == 3:  # 스트리밍 :개인방송 선수단 예산 +500 인기도 +1
            self.my_team.popularity = self.my_team.popularity+1
            self.my_team.money = self.my_team.money+500
            self.my_team.save()
            return
        else:  # 추가 연습 : 경험치 +3 컨디션 -1
            temp_cond = my_player.feeling-1
            new_condtion = -2 if temp_cond < -2 else temp_cond
            temp_exp = my_player.exp+3
            if temp_exp > 9:
                new_exp = temp_exp-10
                max_level = 10+5*(5-my_player.rate)
                if my_player.level != max_level:
                    my_player.level = my_player.level+1
                    if my_player.level == max_level:
                        my_player.exp = 0
                    else:
                        my_player.exp = new_exp
            else:
                new_exp = temp_exp
                my_player.exp = new_exp

            my_player.feeling = new_condtion

            my_player.save()
            return

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
        self.my_team = MyTeam.objects.get(pk=request.data['my_team'])
        schedule = dict()
        try:
            schedule['top'] = request.data['top']
            self.progress_schedule(self.my_team.top, schedule['top'])
            schedule['jng'] = request.data['jng']
            self.progress_schedule(self.my_team.jungle, schedule['jng'])
            schedule['mid'] = request.data['mid']
            self.progress_schedule(self.my_team.mid, schedule['mid'])
            schedule['adc'] = request.data['adc']
            self.progress_schedule(self.my_team.adc, schedule['adc'])
            schedule['sup'] = request.data['sup']
            self.progress_schedule(self.my_team.support, schedule['sup'])
            schedule['sub1'] = request.data['sub1']
            self.progress_schedule(self.my_team.sub1, schedule['sub1'])
            schedule['sub2'] = request.data['sub2']
            self.progress_schedule(self.my_team.sub2, schedule['sub2'])
        except:
            return Response({
                'success': False
            })
        return Response({
            'success': True
        })

# 선수 능력치 증가


class IncreaseStatus(APIView):

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        my_player = MyPlayer.objects.get(pk=request.data['my_player'])

        my_player.status1 = my_player.status1+request.data['status1']
        my_player.status2 = my_player.status1+request.data['status2']
        my_player.status3 = my_player.status1+request.data['status3']

        my_player.remain = request.data['remain']

        my_player.save()
        serializers = MyPlayerSerializer(my_player)

        return Response(serializers.data)

# 선수단 사업 시작


class EnterpriseStart(APIView):

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
        enterprise_num = request.data['enterprise']
        new_enter = Enterprise.objects.get(
            pk=enterprise_num)
        self.my_team = MyTeam.objects.get(user=request.user)
        if self.my_team.money < new_enter.cost:
            return Response({
                "success": False,
                "message": "자금이 부족합니다"
            })

        self.my_team.money = self.my_team.money-new_enter.cost
        if self.my_team.enterprise1:
            if not self.my_team.enterprise2:
                self.my_team.enterprise2 = new_enter
        else:
            self.my_team.enterprise1 = new_enter

        self.my_team.save()

        return Response({
            "success": True
        })

# 선수단 스폰서 계약


class SponsorStart(APIView):

    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
        enterprise_num = request.data['sponsor']
        new_sponsor = Enterprise.objects.get(
            pk=enterprise_num)
        self.my_team = MyTeam.objects.get(user=request.user)

        if not self.my_team.enterprise1:

            self.my_team.sponsor1 = new_sponsor
        elif not self.my_team.enterprise2:
            self.my_team.sponsor2 = new_sponsor

        elif not self.my_team.enterprise3:
            self.my_team.sponsor3 = new_sponsor

        self.my_team.save()

        return Response({
            "success": True
        })


# 리그 순위 가져오기

class LeagueRank(APIView):

    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')
        lst = []

        self.league = League.objects.get(user=request.user, state_finish=False)
        self.my_team = MyTeam.objects.get(league=self.league)
        my_team_data = dict()
        my_team_data['name'] = self.my_team.name
        my_team_data['win'] = self.league.win
        my_team_data['lose'] = self.league.lose
        lst.append(my_team_data)

        league_teams = LeagueTeam.objects.filter(league=self.league)
        for elem in league_teams:
            temp = dict()
            base_team = elem.base_team
            temp['name'] = str(base_team)
            temp['win'] = elem.win
            temp['lose'] = elem.lose
            lst.append(temp)

        lst.sort(key=lambda x: (-x['win'], x['lose']))
        return Response({"Data": lst})
        # 역대 리그 성적 가져오기

        # 새로운 리그 생성


class MakeNewLeague(APIView):
    def post(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        my_team = MyTeam.objects.get(user=request.user)

        league = League(my_team=my_team, season='Summer', user=request.user)
        league.save()

        team = Team.objects.order_by('?')[0:9]

        for idx, elem in enumerate(team):
            league_team = LeagueTeam(
                base_team=elem, team_num=idx+1, league=league)
            league_team.save()

        return Response({"success": True})


class MachineLearningModel(APIView):
    def showMatchResult(self, dragons, barons, towers, model):
        num = 1
        x = np.array(dragons)
        y = np.array(barons)
        z = np.array(towers)

        if x.shape[0] != 1:
            num = x.shape[0]
        x = np.asarray(x).astype('int32').reshape((-1, 1))
        y = np.asarray(y).astype('int32').reshape((-1, 1))
        z = np.asarray(z).astype('int32').reshape((-1, 1))

        preds = model.predict([x, y, z])
        preds = preds.reshape(num,)
        return preds

    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        # or request.query_params.get('dragons', None)
        dragons = request.data['dragons']
        barons = request.data['barons']
        towers = request.data['towers']

        preds = showMatchResult(dragons, barons, towers)

        return Response({"Data": lst})  # 이 부분은 어떻게 해야 할 지 몰라서 안 건드렸음
