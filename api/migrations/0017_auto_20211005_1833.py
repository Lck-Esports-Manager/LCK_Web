# Generated by Django 3.2.7 on 2021-10-05 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20211005_1816'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leagueschedule',
            name='team1',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='leagueschedule',
            name='team2',
            field=models.IntegerField(null=True),
        ),
    ]
