# Generated by Django 3.2.13 on 2022-12-09 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seat_management', '0001_initial'),
        ('candidate_profile', '0004_profile_submitted'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='prefrences',
            field=models.ManyToManyField(blank=True, to='seat_management.Seats'),
        ),
    ]
