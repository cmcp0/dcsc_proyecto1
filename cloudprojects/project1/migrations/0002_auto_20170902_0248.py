# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-02 02:48
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('project1', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='concurso',
            name='imagenurl',
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='concurso',
            name='urlconcu',
            field=models.CharField(max_length=100),
        ),
    ]
