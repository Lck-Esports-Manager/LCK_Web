from django.http import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponseRedirect
from .serializers import *
from .models import *
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
import numpy as np


class MachineLearningModel(APIView):
    def showMatchResult(self, dragons, barons, towers,totalgold, model):
        num = 1
        x = np.array(dragons)
        y = np.array(barons)
        z = np.array(towers)
        a = np.array(totalgold)

        if x.shape[0] != 1:
            num = x.shape[0]
        x = np.asarray(x).astype('float32').reshape((-1, 1))
        y = np.asarray(y).astype('float32').reshape((-1, 1))
        z = np.asarray(z).astype('float32').reshape((-1, 1))
        a = np.asarray(a).astype('float32').reshape((-1, 1))

        preds = model.predict([x, y, z,a])
        preds = preds.reshape(num,)
        return preds

    def get(self, request):
        if not request.user.is_authenticated:
            return HttpResponseRedirect('/login')

        # or request.query_params.get('dragons', None)
        dragons = request.data['dragons']
        barons = request.data['barons']
        towers = request.data['towers']
        totalgold = request.data['totalgold']

        preds = self.showMatchResult(dragons, barons, towers,totalgold)
        print(preds)
        return Response({"Data": True})  # 이 부분은 어떻게 해야 할 지 몰라서 안 건드렸음
