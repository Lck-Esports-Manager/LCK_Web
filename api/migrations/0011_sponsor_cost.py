# Generated by Django 3.2.7 on 2021-11-08 10:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_myplayer_exp'),
    ]

    operations = [
        migrations.AddField(
            model_name='sponsor',
            name='cost',
            field=models.IntegerField(default=0),
        ),
    ]