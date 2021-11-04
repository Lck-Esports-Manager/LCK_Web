

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
# 팀 생성


class MakeTeam(APIView):
    def post(self, request):

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
                            "my_team_data": my_team_data,
                            "op_team_data": op_team_data,
                            "set_num": 1,
                            "set_id": s.id,
                            "side": s.side,
                            "data": champion_data
                        })

                    else:
                        set_num = match.set_num
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
        my_top_grade = my_top.status1+(6-my_top_champ.grade)*20
        op_top_grade = op_top.status1+(6-op_top_champ.grade)*20
        my_mid_grade = my_mid.status1+(6-my_mid_champ.grade)*20
        op_mid_grade = op_mid.status1+(6-op_mid_champ.grade)*20
        my_bot_grade = my_adc.status1 + \
            (6-my_adc_champ.grade)*20+my_sup.status1+(6-my_sup_champ.grade)*20
        op_bot_grade = op_adc.status1 + \
            (6-op_adc_champ.grade)*20+op_sup.status1+(6-op_sup_champ.grade)*20

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

        else:
            self.data["tower_press"]["top"][0] = (self.set.my_tower1 > 0) or (
                self.set.my_tower4 > 0) or (self.set.my_tower7 > 0)
            self.data["tower_press"]["mid"][0] = (self.set.my_tower2 > 0) or (
                self.set.my_tower5 > 0) or (self.set.my_tower8 > 0)
            self.data["tower_press"]["bot"][0] = (self.set.my_tower3 > 0) or (
                self.set.my_tower6 > 0) or (self.set.my_tower9 > 0)

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

        else:
            self.data["tower_destroy"]["top"][0] = (self.set.my_tower1 > 0) or (
                self.set.my_tower4 > 0) or (self.set.my_tower7 > 0)
            self.data["tower_destroy"]["mid"][0] = (self.set.my_tower2 > 0) or (
                self.set.my_tower5 > 0) or (self.set.my_tower8 > 0)
            self.data["tower_destroy"]["bot"][0] = (self.set.my_tower3 > 0) or (
                self.set.my_tower6 > 0) or (self.set.my_tower9 > 0)
        return

    def nexus_destroy(self):
        turn = self.set.turn
        if turn % 2 == 1:
            self.data["nexus_destroy"] = self.set.my_tower_destroy >= 9
        else:
            self.data["nexus_destroy"] = self.set.op_tower_destroy >= 9

        return

    def get(self, request):

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
        self.nexus_destroy()
        return Response(self.data)


class ProcessSelection(APIView):

    def initiate(self):
        self.match = self.set.match
        self.league = self.match.league

        if self.match.team_num1 == 0:
            self.my_team['team'] = self.league.my_team

            op_team_temp = LeagueTeam.objects.get(
                league=self.league, team_num=self.match.team_num2)
            self.op_team['team'] = op_team_temp.base_team

        else:
            self.my_team['team'] = self.league.my_team
            op_team_temp = LeagueTeam.objects.get(
                league=self.league, team_num=self.match.team_num1)
            self.op_team['team'] = op_team_temp.base_team

        self.my_team['top'] = self.my_team['team'].top
        self.my_team['jng'] = self.my_team['team'].jungle
        self.my_team['mid'] = self.my_team['team'].mid
        self.my_team['adc'] = self.my_team['team'].adc
        self.my_team['sup'] = self.my_team['team'].support

        self.op_team['top'] = Player.objects.filter(
            team=self.op_team['team'], position='Top')[0]
        self.op_team['jng'] = Player.objects.filter(
            team=self.op_team['team'], position='Jungle')[0]
        self.op_team['mid'] = Player.objects.filter(
            team=self.op_team['team'], position='Middle')[0]
        self.op_team['adc'] = Player.objects.filter(
            team=self.op_team['team'], position='ADC')[0]
        self.op_team['sup'] = Player.objects.filter(
            team=self.op_team['team'], position='Support')[0]
        if self.set.side == 1:
            self.my_team['side'] = 'Blue'
            self.op_team['side'] = 'Red'

        else:
            self.my_team['side'] = 'Red'
            self.op_team['side'] = 'Blue'
        return

    def progress(self):

        for elem in self.selection:
            if elem == 1:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 탑의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 탑의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 2:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 미드의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 미드의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 3:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 바텀의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 바텀의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 4:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 탑의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 탑의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 5:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 미드의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 미드의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 6:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 바텀의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 바텀의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 7:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 탑에서의 교전이 성공하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 탑에서의 교전이 성공하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 8:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 미드에서의 교전이 성공하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 미드에서의 교전이 성공하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 9:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀 바텀에서의 교전이 성공하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀 바텀에서의 교전이 성공하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 10:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 11:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 장로 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 장로 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 12:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 바론을 획득하고 2000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 바론을 획득하고 2000골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 13:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 한타를 승리하여 1000골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
            elif elem == 14:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 압박합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 압박합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
            elif elem == 15:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 미드의 타워를 압박합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 미드의 타워를 압박합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
            elif elem == 16:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 바텀의 타워를 압박합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 바텀의 타워를 압박합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
            elif elem == 17:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
            elif elem == 18:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 미드의 타워를 파괴합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 미드의 타워를 파괴합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
            elif elem == 19:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
            else:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀에게 승리했습니다!".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀에게 승리했습니다!".format(self.set.turn, self.op_team['side'], self.my_team['side']))

        return

    def post(self, request):
        self.my_team = dict()
        self.op_team = dict()
        self.set = Set.objects.get(pk=request.data['set_id'])
        self.selection = request.data['selection']
        self.response = []
        self.initiate()
        self.progress()

        return Response({
            "message": self.response

        })
