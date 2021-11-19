from django.http import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from django.conf import settings

import numpy as np


class MachineLearningModel(APIView):

    def normalize(self, np_input):
        # 평균과 표준편차 값은 기존 match2.csv에서 계산된 값을 이용
        mean = 0  # 전체 match에서 블루 팀과 레드 팀의 글로벌 골드 차이의 평균
        std = 12143  # 전체 match에서 블루 팀과 레드 팀의 글로벌 골드 차이의 표준편차
        return (np_input - mean) / std

   def showMatchResult(self,dragons_blue,barons_blue,towers_blue,totalgold_blue,\
                    dragons_red,barons_red,towers_red,totalgold_red,model):
        
        num=1
       

       # dragons,barons,towers,totalgold 각각은 블루팀의 드래곤 처치수 - 레드팀의 드래곤 처치수, 블루팀의 바론 처치수 - 레드팀의 바론 처치수 등등을 의미함
        dragons = dragons_blue - dragons_red
        barons = barons_blue - barons_red
        towers = towers_blue - towers_red
        totalgold = totalgold_blue - totalgold_red
        

        x=dragons
        y=barons
        z = towers
        a = totalgold
        
        x = np.asarray(x).astype('int32').reshape((-1,1))
        y = np.asarray(y).astype('int32').reshape((-1,1))
        z = np.asarray(z).astype('int32').reshape((-1,1))
        a = np.asarray(a).astype('int32').reshape((-1,1))
        a = self.normalize(a) * 10
        preds = model.predict([x,y,z,a])
        preds = preds.reshape(num,)
        return preds

    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        model = getattr(settings, 'gModelObjs', None)
        model=model['model_1']
        # or request.query_params.get('dragons', None)
        dragons_blue = request.data['my_dragon']
        dragons_red = request.data['op_dragon'] #블루팀의 드래곤 처치수 레드팀의 처치수를 가져올 수 있게 하는 특정 조건을 추가하면 된다 생각함

        barons_blue = request.data['my_baron']
        barons_red = request.data['op_barons']

        towers_blue = request.data['my_tower']
        towers_red = request.data['op_tower']

        totalgold_blue = request.data['my_gold']
        totalgold_red = request.data['op_gold']


        preds = self.showMatchResult(dragons_blue,barons_blue,towers_blue,totalgold_blue,dragons_red,barons_red,towers_red,totalgold_red,model)
        print(preds)
        return Response({"Data": True})  # 이 부분은 어떻게 해야 할 지 몰라서 안 건드렸음
