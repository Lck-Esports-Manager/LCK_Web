from django.contrib import admin


from .models import Player, Team, MyTeam, League, LeagueTeam, LeagueSchedule


admin.site.register(Player)
admin.site.register(Team)
admin.site.register(MyTeam)
admin.site.register(League)
admin.site.register(LeagueTeam)
admin.site.register(LeagueSchedule)
