# Generated by Django 3.2.7 on 2021-11-18 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_player_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='player',
            name='images',
            field=models.CharField(default='/api/media/images/player.png', max_length=100),
        ),
    ]
