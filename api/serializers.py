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


class SimplePlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ['name', 'season', 'year']


class SimplePlayerSerializer2(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ['name', 'season', 'year', 'rate', 'images', 'position']

# 나의 팀


class MyPlayerSerializer(serializers.ModelSerializer):
    player = SimplePlayerSerializer2()

    class Meta:
        model = MyPlayer
        fields = '__all__'


class SponsorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sponsor
        fields = '__all__'


class EnterpriseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Enterprise
        fields = '__all__'


class MyTeamSerializer(serializers.ModelSerializer):
    top = MyPlayerSerializer()
    jungle = MyPlayerSerializer()
    mid = MyPlayerSerializer()
    adc = MyPlayerSerializer()
    support = MyPlayerSerializer()
    sub1 = MyPlayerSerializer()
    sub2 = MyPlayerSerializer()
    sponsor1 = SponsorSerializer()
    sponsor2 = SponsorSerializer()
    sponsor3 = SponsorSerializer()
    enterprise1 = EnterpriseSerializer()
    enterprise1 = EnterpriseSerializer()

    class Meta:
        model = MyTeam
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


# class SimpleMyPlayerSerializer(serializers.ModelSerializer):
