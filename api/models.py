from django.db import models
from django.db.models.fields import GenericIPAddressField
from django.contrib.auth.models import User


class Team(models.Model):

    name = models.CharField(max_length=30)
    year = models.IntegerField(default=0)
    season = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class LeagueTeam(models.Model):
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    team_num = models.IntegerField(default=0)
    base_team = models.OneToOneField(Team, default=1, on_delete=models.CASCADE)
    league = models.ForeignKey("League", default=1, on_delete=models.CASCADE)


class Player(models.Model):

    name = models.CharField(max_length=20)
    season = models.CharField(max_length=20)
    year = models.IntegerField(default=0)
    position = models.CharField(max_length=20)
    status1 = models.IntegerField(default=0)
    status2 = models.IntegerField(default=0)
    status3 = models.IntegerField(default=0)
    rate = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    images = models.ImageField(
        blank=True, upload_to="images", null=True)
    team = models.ForeignKey(Team, default=1, on_delete=models.CASCADE)


class Enterprise(models.Model):
    name = models.CharField(null=True, max_length=20)
    description = models.CharField(null=True, max_length=150)
    earning = models.IntegerField(default=0)


class Sponsor(models.Model):
    name = models.CharField(null=True, max_length=20)
    description = models.CharField(null=True, max_length=150)
    earning = models.IntegerField(default=0)


class Schedule(models.Model):

    name = models.CharField(null=True, max_length=20)
    description = models.CharField(null=True, max_length=150)


class MyPlayer(models.Model):
    player = models.ForeignKey(Player, default=1, on_delete=models.CASCADE)
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)
    feeling = models.IntegerField(default=0)
    status1 = models.IntegerField(default=0)
    status2 = models.IntegerField(default=0)
    status3 = models.IntegerField(default=0)
    remain = models.IntegerField(default=0)
    schedule = models.ForeignKey(
        Schedule, null=True, on_delete=models.CASCADE)


class MyTeam(models.Model):

    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    name = models.CharField(null=True, max_length=40)
    top = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='top')
    jungle = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='junggle')
    mid = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='mid')
    adc = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='adc')
    support = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='support')
    sub1 = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='sub1')
    sub2 = models.ForeignKey(
        MyPlayer, null=True, on_delete=models.CASCADE, related_name='sub2')
    sponsor1 = models.ForeignKey(
        Sponsor, null=True, on_delete=models.CASCADE, related_name='sponsor1')
    sponsor2 = models.ForeignKey(
        Sponsor, null=True, on_delete=models.CASCADE, related_name='sponsor2')
    sponsor3 = models.ForeignKey(
        Sponsor, null=True, on_delete=models.CASCADE, related_name='sponsor3')
    enterprise1 = models.ForeignKey(
        Enterprise, null=True, on_delete=models.CASCADE, related_name='enterprise1')
    enterprise2 = models.ForeignKey(
        Enterprise, null=True, on_delete=models.CASCADE, related_name='enterprise2')

    money = models.IntegerField(default=0)
    popularity = models.IntegerField(default=0)


class League(models.Model):
    my_team = models.ForeignKey(MyTeam, default=1, on_delete=models.CASCADE)
    current_date = models.IntegerField(default=0)
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    state_finish = models.BooleanField(default=False)


class Match(models.Model):
    team_num1 = models.IntegerField(default=0)
    team_num2 = models.IntegerField(default=0)
    match_num = models.IntegerField(default=0)
    result = models.CharField(null=True, max_length=20)
    league = models.OneToOneField(League, default=0, on_delete=models.CASCADE)


class Set(models.Model):
    blue = models.IntegerField(default=0)
    red = models.IntegerField(default=0)
    idx = models.IntegerField(default=1)
    result = models.IntegerField(default=1)
    match = models.ForeignKey(Match, default=0, on_delete=models.CASCADE)
