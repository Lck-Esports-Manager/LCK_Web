from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

import random


class ProcessSelection(APIView):

    def initiate(self):
        self.match = self.set.match
        self.league = self.match.league
        self.is_elder = self.set.is_elder
        self.elder_power = [[1, 1], [1.2, 1], [1, 1.2]]

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

        self.my_team['top'] = []
        my_top = self.my_team['team'].top
        self.my_team['top'].append(
            my_top.status1*(1+0.1*my_top.feeling)+(6-self.set.my_top.grade)*10)
        self.my_team['top'].append(
            my_top.status2*(1+0.1*my_top.feeling)+(6-self.set.my_top.grade)*10)
        self.my_team['top'].append(
            my_top.status3*(1+0.1*my_top.feeling)+(6-self.set.my_top.grade)*10)

        self.my_team['jng'] = []
        my_jng = self.my_team['team'].jungle
        self.my_team['jng'].append(
            my_jng.status1*(1+0.1*my_jng.feeling)+(6-self.set.my_jng.grade)*10)
        self.my_team['jng'].append(
            my_jng.status2*(1+0.1*my_jng.feeling)+(6-self.set.my_jng.grade)*10)
        self.my_team['jng'].append(
            my_jng.status3*(1+0.1*my_jng.feeling)+(6-self.set.my_jng.grade)*10)

        self.my_team['mid'] = []
        my_mid = self.my_team['team'].mid
        self.my_team['mid'].append(
            my_mid.status1*(1+0.1*my_mid.feeling)+(6-self.set.my_mid.grade)*10)
        self.my_team['mid'].append(
            my_mid.status2*(1+0.1*my_mid.feeling)+(6-self.set.my_mid.grade)*10)
        self.my_team['mid'].append(
            my_mid.status3*(1+0.1*my_mid.feeling)+(6-self.set.my_mid.grade)*10)

        self.my_team['adc'] = []
        my_adc = self.my_team['team'].adc
        self.my_team['adc'].append(
            my_adc.status1*(1+0.1*my_adc.feeling)+(6-self.set.my_adc.grade)*10)
        self.my_team['adc'].append(
            my_adc.status2*(1+0.1*my_adc.feeling)+(6-self.set.my_adc.grade)*10)
        self.my_team['adc'].append(
            my_adc.status3*(1+0.1*my_adc.feeling)+(6-self.set.my_adc.grade)*10)

        self.my_team['sup'] = []
        my_sup = self.my_team['team'].support
        self.my_team['sup'].append(
            my_sup.status1*(1+0.1*my_sup.feeling)+(6-self.set.my_sup.grade)*10)
        self.my_team['sup'].append(
            my_sup.status2*(1+0.1*my_sup.feeling)+(6-self.set.my_sup.grade)*10)
        self.my_team['sup'].append(
            my_sup.status3*(1+0.1*my_sup.feeling)+(6-self.set.my_sup.grade)*10)


# 3
        self.op_team['top'] = []
        op_top = Player.objects.filter(
            team=self.op_team['team'], position='Top')[0]
        self.op_team['top'].append(
            op_top.status1+(6-self.set.op_top.grade)*10)
        self.op_team['top'].append(
            op_top.status2+(6-self.set.op_top.grade)*10)
        self.op_team['top'].append(
            op_top.status3+(6-self.set.op_top.grade)*10)

        self.op_team['jng'] = []
        op_jng = Player.objects.filter(
            team=self.op_team['team'], position='Jungle')[0]
        self.op_team['jng'].append(
            op_jng.status1+(6-self.set.op_jng.grade)*10)
        self.op_team['jng'].append(
            op_jng.status2+(6-self.set.op_jng.grade)*10)
        self.op_team['jng'].append(
            op_jng.status3+(6-self.set.op_jng.grade)*10)

        self.op_team['mid'] = []
        op_mid = Player.objects.filter(
            team=self.op_team['team'], position='Middle')[0]
        self.op_team['mid'].append(
            op_mid.status1+(6-self.set.op_mid.grade)*10)
        self.op_team['mid'].append(
            op_mid.status2+(6-self.set.op_mid.grade)*10)
        self.op_team['mid'].append(
            op_mid.status3+(6-self.set.op_mid.grade)*10)

        self.op_team['adc'] = []
        op_adc = Player.objects.filter(
            team=self.op_team['team'], position='ADC')[0]
        self.op_team['adc'].append(
            op_adc.status1+(6-self.set.op_adc.grade)*10)
        self.op_team['adc'].append(
            op_adc.status2+(6-self.set.op_adc.grade)*10)
        self.op_team['adc'].append(
            op_adc.status3+(6-self.set.op_adc.grade)*10)

        self.op_team['sup'] = []
        op_sup = Player.objects.filter(
            team=self.op_team['team'], position='Support')[0]
        self.op_team['sup'].append(
            op_sup.status1+(6-self.set.op_sup.grade)*10)
        self.op_team['sup'].append(
            op_sup.status2+(6-self.set.op_sup.grade)*10)
        self.op_team['sup'].append(
            op_sup.status3+(6-self.set.op_sup.grade)*10)

        self.my_fight_score = self.my_team['top'][2]+self.my_team['jng'][2] + \
            self.my_team['mid'][2]+self.my_team['adc'][2] + \
            self.my_team['sup'][2]
        self.my_fight_score = self.my_fight_score * \
            self.elder_power[self.is_elder][0]
        self.op_fight_score = self.op_team['top'][2]+self.op_team['jng'][2] + \
            self.op_team['mid'][2]+self.op_team['adc'][2] + \
            self.op_team['sup'][2]
        self.op_fight_score = self.op_fight_score**self.elder_power[self.is_elder][1]
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

                    self.set.my_gold = self.set.my_gold+300
                    self.set.op_tower1 = self.set.op_tower1-1
                    self.response.append(
                        "{0} : {1}팀 탑의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.set.op_gold = self.set.op_gold+300
                    self.set.my_tower1 = self.set.my_tower1-1
                    self.response.append(
                        "{0} : {1}팀 탑의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 2:
                if self.set.turn % 2 == 1:
                    self.set.my_gold = self.set.my_gold+300
                    self.set.op_tower2 = self.set.op_tower2-1
                    self.response.append(
                        "{0} : {1}팀 미드의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.set.op_gold = self.set.op_gold+300
                    self.set.my_tower2 = self.set.my_tower2-1
                    self.response.append(
                        "{0} : {1}팀 미드의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 3:
                if self.set.turn % 2 == 1:
                    self.set.my_gold = self.set.my_gold+300
                    self.set.op_tower3 = self.set.op_tower3-1
                    self.response.append(
                        "{0} : {1}팀 바텀의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.set.op_gold = self.set.op_gold+300
                    self.set.my_tower3 = self.set.my_tower3-1
                    self.response.append(
                        "{0} : {1}팀 바텀의 라인전이 우세하여 300골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 4:
                if self.set.turn % 2 == 1:
                    self.set.my_gold = self.set.my_gold+500
                    self.set.op_tower1 = self.set.op_tower1-1
                    self.response.append(
                        "{0} : {1}팀 탑의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.set.op_gold = self.set.op_gold+500
                    self.set.my_tower1 = self.set.my_tower1-1
                    self.response.append(
                        "{0} : {1}팀 탑의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 5:
                if self.set.turn % 2 == 1:
                    self.set.my_gold = self.set.my_gold+500
                    self.set.op_tower2 = self.set.op_tower2-1
                    self.response.append(
                        "{0} : {1}팀 미드의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.set.op_gold = self.set.op_gold+500
                    self.set.my_tower2 = self.set.my_tower2-1
                    self.response.append(
                        "{0} : {1}팀 미드의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 6:
                if self.set.turn % 2 == 1:
                    self.set.my_gold = self.set.my_gold+500
                    self.set.op_tower3 = self.set.op_tower3-1
                    self.response.append(
                        "{0} : {1}팀 바텀의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    self.set.op_gold = self.set.op_gold+500
                    self.set.my_tower3 = self.set.my_tower3-1
                    self.response.append(
                        "{0} : {1}팀 바텀의 갱킹이 성공하여 500골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 7:

                mine = self.my_team['top'][1]+self.my_team['jng'][1]
                op = self.op_team['top'][1]+self.op_team['jng'][1]
                if self.set.turn % 2 == 1:

                    rate = (mine/(mine+op))*0.4+(
                        self.set.my_gold/(self.set.my_gold+self.set.op_gold))*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+800
                        self.response.append(
                            "{0} : {1}팀 탑에서의 교전이 승리하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+800
                        self.response.append(
                            "{0} : {1}팀 탑에서의 교전이 패배하여를 상대팀이 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

                else:
                    rate = (op/(mine+op))*0.4+(
                        self.set.op_gold/(self.set.my_gold+self.set.op_gold))*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+800
                        self.response.append(
                            "{0} : {1}팀 탑에서의 교전이 승리하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+800
                        self.response.append(
                            "{0} : {1}팀 탑에서의 교전이 패배하여를 상대팀이 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 8:
                mine = self.my_team['mid'][1]+self.my_team['jng'][1]
                op = self.op_team['mid'][1]+self.op_team['jng'][1]
                if self.set.turn % 2 == 1:
                    rate = (mine/(mine+op))*0.4*0.4+(
                        self.set.my_gold/(self.set.my_gold+self.set.op_gold))*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+800
                        self.response.append(
                            "{0} : {1}팀 미드에서의 교전이 승리하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+800
                        self.response.append(
                            "{0} : {1}팀 미드에서의 교전이 패배하여를 상대팀이 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

                else:
                    rate = (op/(mine+op))*0.4+(
                        self.set.op_gold/(self.set.my_gold+self.set.op_gold))*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+800
                        self.response.append(
                            "{0} : {1}팀 미드에서의 교전이 승리하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+800
                        self.response.append(
                            "{0} : {1}팀 미드에서의 교전이 패배하여를 상대팀이 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 9:
                mine = self.my_team['adc'][1] + \
                    self.my_team['sup'][1]+self.my_team['jng'][1]
                op = self.op_team['adc'][1] + \
                    self.op_team['sup'][1]+self.op_team['jng'][1]
                if self.set.turn % 2 == 1:
                    rate = (mine/(mine+op))*0.4+(
                        self.set.my_gold/(self.set.my_gold+self.set.op_gold))*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+800
                        self.response.append(
                            "{0} : {1}팀 바텀에서의 교전이 승리하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+800
                        self.response.append(
                            "{0} : {1}팀 바텀에서의 교전이 패배하여를 상대팀이 800골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

                else:
                    rate = (op/(mine+op))*0.4+(
                        self.set.op_gold/(self.set.my_gold+self.set.op_gold))*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+800
                        self.response.append(
                            "{0} : {1}팀 바텀에서의 교전이 승리하여를 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+800
                        self.response.append(
                            "{0} : {1}팀 바텀에서의 교전이 패배하여를 상대팀이 800골드를 추가로 얻습니다.".format(self.set.turn, self.op_team['side']))

            elif elem == 10:
                if self.set.turn % 2 == 1:
                    rate = self.my_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.my_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+1000
                        self.set.my_dragon = self.set.my_dragon+1
                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+1000
                        self.set.op_dragon = self.set.op_dragon+1
                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    rate = self.op_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.op_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+1000
                        self.set.op_dragon = self.set.op_dragon+1
                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+1000
                        self.set.my_dragon = self.set.my_dragon+1
                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

            elif elem == 11:
                if self.set.turn % 2 == 1:
                    rate = self.my_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.my_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+1000
                        self.set.my_dragon = self.set.my_dragon+1
                        self.set.is_elder = 1
                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 장로드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+1000
                        self.set.op_dragon = self.set.op_dragon+1
                        self.set.is_elder = -1
                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 장로드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    rate = self.op_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.op_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+1000
                        self.set.op_dragon = self.set.op_dragon+1
                        self.set.is_elder = -1
                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 장로드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+1000
                        self.set.my_dragon = self.set.my_dragon+1
                        self.set.is_elder = 1
                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 장로드래곤을 획득하고 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

            elif elem == 12:
                if self.set.turn % 2 == 1:
                    rate = self.my_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.my_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+2000
                        self.set.my_baron = self.set.my_baron+1
                        self.set.is_baron = 1
                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 바론을 획득하고 2000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+2000
                        self.set.op_baron = self.set.op_baron+1
                        self.set.is_baron = -1
                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 바론을 획득하고 2000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    rate = self.op_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.op_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+2000
                        self.set.op_baron = self.set.op_baron+1
                        self.set.is_baron = -1
                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 바론을 획득하고 2000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+2000
                        self.set.my_baron = self.set.my_baron+1
                        self.set.is_baron = 1
                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 바론을 획득하고 2000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

            elif elem == 13:
                if self.set.turn % 2 == 1:
                    rate = self.my_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.my_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.my_gold = self.set.my_gold+1000

                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.op_gold = self.set.op_gold+1000

                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                else:
                    rate = self.op_fight_score/(self.my_fight_score+self.op_fight_score)*0.4 + \
                        self.set.op_gold/(self.set.my_gold +
                                          self.set.op_gold)*0.6
                    rand_n = random.random()
                    if rand_n < rate:
                        self.set.op_gold = self.set.op_gold+1000

                        self.response.append(
                            "{0} : {1}팀이 한타를 승리하여 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))
                    else:
                        self.set.my_gold = self.set.my_gold+1000

                        self.response.append(
                            "{0} : {1}팀이 한타를 패배하여 상대팀이 1000골드를 추가로 얻습니다.".format(self.set.turn, self.my_team['side']))

            elif elem == 14:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 압박합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                    if self.set.op_tower1 != 0:
                        if self.set.op_tower1 <= 3:
                            self.set.op_tower1 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 탑의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower1 = self.set.op_tower1-3
                    elif self.set.op_tower4 != 0:
                        if self.set.op_tower4 <= 3:
                            self.set.op_tower4 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 탑의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower4 = self.set.op_tower4-3
                    else:
                        if self.set.op_tower7 <= 3:
                            self.set.op_tower7 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 탑의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower7 = self.set.op_tower7-3

                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 압박합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
                    if self.set.my_tower1 != 0:
                        if self.set.my_tower1 <= 3:
                            self.set.my_tower1 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 탑의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower1 = self.set.my_tower1-3
                    elif self.set.my_tower4 != 0:
                        if self.set.my_tower4 <= 3:
                            self.set.my_tower4 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 탑의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower4 = self.set.my_tower4-3
                    else:
                        if self.set.my_tower7 <= 3:
                            self.set.my_tower7 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 탑의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower7 = self.set.my_tower7-3
            elif elem == 15:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 미드의 타워를 압박합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                    if self.set.op_tower2 != 0:
                        if self.set.op_tower2 <= 3:
                            self.set.op_tower2 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 미드의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower2 = self.set.op_tower2-3
                    elif self.set.op_tower5 != 0:
                        if self.set.op_tower5 <= 3:
                            self.set.op_tower5 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 미드의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower5 = self.set.op_tower5-3
                    else:
                        if self.set.op_tower8 <= 3:
                            self.set.op_tower8 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 미드의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower8 = self.set.op_tower8-3

                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 미드의 타워를 압박합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
                    if self.set.my_tower2 != 0:
                        if self.set.my_tower2 <= 3:
                            self.set.my_tower2 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 미드의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower2 = self.set.my_tower2-3
                    elif self.set.my_tower5 != 0:
                        if self.set.my_tower5 <= 3:
                            self.set.my_tower5 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 미드의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower5 = self.set.my_tower5-3
                    else:
                        if self.set.my_tower8 <= 3:
                            self.set.my_tower8 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 미드의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower8 = self.set.my_tower8-3

            elif elem == 16:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 바텀의 타워를 압박합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                    if self.set.op_tower3 != 0:
                        if self.set.op_tower3 <= 3:
                            self.set.op_tower3 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower3 = self.set.op_tower3-3
                    elif self.set.op_tower6 != 0:
                        if self.set.op_tower6 <= 3:
                            self.set.op_tower6 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower6 = self.set.op_tower6-3
                    else:
                        if self.set.op_tower9 <= 3:
                            self.set.op_tower9 = 0
                            self.set.my_gold = self.set.my_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.op_tower9 = self.set.op_tower9-3

                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 바텀의 타워를 압박합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))
                    if self.set.my_tower3 != 0:
                        if self.set.my_tower3 <= 3:
                            self.set.my_tower3 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower3 = self.set.my_tower3-3
                    elif self.set.my_tower6 != 0:
                        if self.set.my_tower6 <= 3:
                            self.set.my_tower6 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower6 = self.set.my_tower6-3
                    else:
                        if self.set.my_tower9 <= 3:
                            self.set.my_tower9 = 0
                            self.set.op_gold = self.set.op_gold+500
                            self.response.append(
                                "{0} : {1}팀이 {2}팀 바텀의 타워를 파괴하였습니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                        else:
                            self.set.my_tower9 = self.set.my_tower9-3

            elif elem == 17:
                if self.set.turn % 2 == 1:
                    if self.set.op_tower1 > 0:
                        self.set.op_tower1 = 0
                    elif self.set.op_tower4 > 0:
                        self.set.op_tower4 = 0
                    else:
                        self.set.op_tower7 = 0
                    self.set.my_gold = self.set.my_gold+500
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    if self.set.my_tower1 > 0:
                        self.set.my_tower1 = 0
                    elif self.set.my_tower4 > 0:
                        self.set.my_tower4 = 0
                    else:
                        self.set.my_tower7 = 0
                    self.set.op_gold = self.set.op_gold+500
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))

            elif elem == 18:
                if self.set.turn % 2 == 1:
                    if self.set.op_tower2 > 0:
                        self.set.op_tower2 = 0
                    elif self.set.op_tower5 > 0:
                        self.set.op_tower5 = 0
                    else:
                        self.set.op_tower8 = 0
                    self.set.my_gold = self.set.my_gold+500
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    if self.set.my_tower2 > 0:
                        self.set.my_tower2 = 0
                    elif self.set.my_tower5 > 0:
                        self.set.my_tower5 = 0
                    else:
                        self.set.my_tower8 = 0
                    self.set.op_gold = self.set.op_gold+500
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))

            elif elem == 19:
                if self.set.turn % 2 == 1:
                    if self.set.op_tower3 > 0:
                        self.set.op_tower3 = 0
                    elif self.set.op_tower6 > 0:
                        self.set.op_tower6 = 0
                    else:
                        self.set.op_tower9 = 0
                    self.set.my_gold = self.set.my_gold+500
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    if self.set.my_tower3 > 0:
                        self.set.my_tower3 = 0
                    elif self.set.my_tower6 > 0:
                        self.set.my_tower6 = 0
                    else:
                        self.set.my_tower9 = 0
                    self.set.op_gold = self.set.op_gold+500
                    self.response.append(
                        "{0} : {1}팀이 {2}팀 탑의 타워를 파괴합니다.".format(self.set.turn, self.op_team['side'], self.my_team['side']))

            else:
                if self.set.turn % 2 == 1:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀에게 승리했습니다!".format(self.set.turn, self.my_team['side'], self.op_team['side']))
                else:
                    self.response.append(
                        "{0} : {1}팀이 {2}팀에게 승리했습니다!".format(self.set.turn, self.op_team['side'], self.my_team['side']))

                self.post_process()
        return

    def save(self):
        self.set.turn = self.set.turn+1
        self.set.save()
        self.match.save()
        self.league.save()

    # def acquire_ext(self, win):

    def post_process(self):
        # *세트의 status를 변화시킨다.
        self.set.status = 'finish'
        # *세트의 승패를 저장한다.
        self.set.result = self.set.turn % 2
        # *Match에 결과를 저장한다.
        if self.set.result == 1:
            if self.match.team_num1 == 0:
                self.match.result = self.match.result+1
            else:
                self.match.result = self.match.result-1
        else:
            if self.match.team_num1 == 0:
                self.match.result = self.match.result-1
            else:
                self.match.result = self.match.result+1

        # *Match가 끝난다.

        if (self.match.set_num == 2 and (self.match.result == 2 or self.match.result == -2))\
                and (self.match.set_num == 3 and (self.match.result == 1 or self.match.result == -1)):
            self.match.status_finish = True

        if self.match.status_finish == True:
            if self.match.result > 0:
                if self.match.team_num1 == 0:
                    self.league.win = self.league.win+1
                    # 돈하고 인기도,선수들 경험치 상승
                    op_team = LeagueTeam.objects.get(
                        league=self.league, team_num=self.match.team_num2)
                    op_team.lose = op_team.lose+1
                    op_team.save()
                else:
                    self.league.lose = self.league.lose+1
                    # 돈하고 인기도,선수들 경험치 상승
                    op_team = LeagueTeam.objects.get(
                        league=self.league, team_num=self.match.team_num2)
                    op_team.win = op_team.win+1
                    op_team.save()
            else:
                if self.match.team_num1 == 0:
                    self.league.lose = self.league.lose+1
                    # 돈하고 인기도,선수들 경험치 상승
                    op_team = LeagueTeam.objects.get(
                        league=self.league, team_num=self.match.team_num2)
                    op_team.win = op_team.win+1
                    op_team.save()
                else:
                    self.league.win = self.league.win+1
                    # 돈하고 인기도,선수들 경험치 상승
                    op_team = LeagueTeam.objects.get(
                        league=self.league, team_num=self.match.team_num2)
                    op_team.lose = op_team.lose+1
                    op_team.save()

        else:
            self.match.set_num = self.match.set_num+1
            new_set = Set(match=self.match,
                          set_num=self.set.set_num+1, side=self.set.side)
            new_set.save()
            # **새로운 set를 만든다.

    def post(self, request):
        self.my_team = dict()
        self.op_team = dict()
        self.set = Set.objects.get(pk=request.data['set_id'])
        self.selection = request.data['selection']
        self.response = []
        self.initiate()
        self.progress()
        self.save()
        return Response({
            "message": self.response

        })
