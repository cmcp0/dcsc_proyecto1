# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Usuario(models.Model):
	nombres = models.CharField(max_length=50)
	apellidos = models.CharField(max_length=20)
	email = models.EmailField(max_length=50)
	contrasena = models.CharField(max_length=50)
	_token = models.CharField(max_length=50)



class Concurso(models.Model):
	nombreconcu = models.CharField(max_length=100)
	imagenconcu = models.ImageField(upload_to='imagen/')
	urlconcu =models.URLField()
	feini =models.DateTimeField()
	fefin =models.DateTimeField()
	premio = models.CharField(max_length=200)
	administraconcu= models.ForeignKey(Usuario, on_delete=models.CASCADE)



class Video(models.Model):
	fechasub = models.DateTimeField()
	estado = models.CharField(max_length=50)
	video =models.CharField(max_length=200)
	descrip = models.CharField(max_length=200)
	particoncu= models.ForeignKey(Concurso, on_delete=models.CASCADE)
	nombreconcursante= models.CharField(max_length=50)
	apellidoconcursante= models.CharField(max_length=50)
	emailconcursante= models.EmailField(max_length=50)
