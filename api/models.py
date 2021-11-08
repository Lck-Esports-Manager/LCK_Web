from django.db import models
from django.db.models.fields import GenericIPAddressField
from django.contrib.auth.models import User


class Team(models.Model):

    name = models.CharField(max_length=30)
    year = models.IntegerField(default=0)
    season = models.CharField(max_length=30)

    def __str__(self):
        return str(self.year)+' ' + self.season+' ' + self.name


class Champion(models.Model):
    name = models.CharField(max_length=30)
    grade = models.IntegerField(default=0)
    position = models.CharField(max_length=30)

    def __str__(self):
        return self.name+' ' + self.position


class LeagueTeam(models.Model):
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)
    team_num = models.IntegerField(default=0)
    base_team = models.ForeignKey(Team, default=1, on_delete=models.CASCADE)
    league = models.ForeignKey("League", null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.league)+' ' + str(self.base_team)


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

    def __str__(self):
        return str(self.year)+' ' + self.season+' ' + self.name


class Enterprise(models.Model):
    name = models.CharField(null=True, max_length=20)
    description = models.CharField(null=True, max_length=150)
    earning = models.IntegerField(default=0)
    cost = models.IntegerField(default=0)


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
    exp = models.IntegerField(default=0)
    schedule = models.ForeignKey(
        Schedule, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.player)


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

    def __str__(self):
        return self.name


class League(models.Model):
    my_team = models.ForeignKey(MyTeam, default=1, on_delete=models.CASCADE)
    season = models.CharField(null=True, max_length=20)
    current_date = models.IntegerField(default=1)
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    state_finish = models.BooleanField(default=False)
    win = models.IntegerField(default=0)
    lose = models.IntegerField(default=0)

    def __str__(self):
        return str(self.my_team) + " 's league"


class Match(models.Model):
    team_num1 = models.IntegerField(default=0)
    team_num2 = models.IntegerField(default=0)
    set_num = models.IntegerField(default=1)
    result = models.IntegerField(default=0)
    league = models.ForeignKey(League, default=0, on_delete=models.CASCADE)
    status_finish = models.BooleanField(default=False)


class Set(models.Model):
    side = models.IntegerField(default=0)
    turn = models.IntegerField(default=1)
    my_top = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='my_top')
    my_jng = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='my_jng')
    my_mid = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='my_mid')
    my_adc = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='my_adc')
    my_sup = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='my_sup')
    op_top = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='op_top')
    op_jng = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='op_jng')
    op_mid = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='op_mid')
    op_adc = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='op_adc')
    op_sup = models.ForeignKey(
        Champion, null=True, on_delete=models.CASCADE, related_name='op_sup')
    my_tower1 = models.IntegerField(default=5)
    my_tower2 = models.IntegerField(default=5)
    my_tower3 = models.IntegerField(default=5)
    my_tower4 = models.IntegerField(default=5)
    my_tower5 = models.IntegerField(default=5)
    my_tower6 = models.IntegerField(default=5)
    my_tower7 = models.IntegerField(default=5)
    my_tower8 = models.IntegerField(default=5)
    my_tower9 = models.IntegerField(default=5)
    op_tower1 = models.IntegerField(default=5)
    op_tower2 = models.IntegerField(default=5)
    op_tower3 = models.IntegerField(default=5)
    op_tower4 = models.IntegerField(default=5)
    op_tower5 = models.IntegerField(default=5)
    op_tower6 = models.IntegerField(default=5)
    op_tower7 = models.IntegerField(default=5)
    op_tower8 = models.IntegerField(default=5)
    op_tower9 = models.IntegerField(default=5)
    my_dragon = models.IntegerField(default=0)
    op_dragon = models.IntegerField(default=0)
    my_baron = models.IntegerField(default=0)
    op_baron = models.IntegerField(default=0)
    my_gold = models.IntegerField(default=2500)
    op_gold = models.IntegerField(default=2500)
    my_tower_destroy = models.IntegerField(default=0)
    op_tower_destroy = models.IntegerField(default=0)
    set_num = models.IntegerField(default=1)
    status = models.CharField(default='bp', max_length=10)
    result = models.IntegerField(default=1)
    match = models.ForeignKey(Match, default=0, on_delete=models.CASCADE)

    is_baron = models.IntegerField(default=0)
    is_elder = models.IntegerField(default=0)


class LeagueSchedule(models.Model):
    team1 = models.IntegerField(null=True)
    team2 = models.IntegerField(null=True)
    day = models.IntegerField(default=1)
    spring = models.CharField(null=True, max_length=20)
    summer = models.CharField(null=True, max_length=20)
