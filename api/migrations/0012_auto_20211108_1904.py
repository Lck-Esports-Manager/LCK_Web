# Generated by Django 3.2.7 on 2021-11-08 10:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_sponsor_cost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sponsor',
            name='cost',
        ),
        migrations.AddField(
            model_name='enterprise',
            name='cost',
            field=models.IntegerField(default=0),
        ),
    ]
