from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

# 선수 도감

# 팀


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"

# 챔피언


class ChampionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Champion
        fields = "__all__"


# 세트
class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = "__all__"


# 선수


class PlayerSerializer(serializers.ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = Player
        fields = "__all__"
