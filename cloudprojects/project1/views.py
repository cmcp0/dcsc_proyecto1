# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from project1.models import Video, Concurso, Usuario
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def index(request):
	return HttpResponse("WELCOME TO SMARTOOLS")


def administrador_new(request):
	context={}
	return render(request, 'administrador_new.html', context)	

@csrf_exempt
def administrador_create(request):
	context={}
	return render(request, 'administrador_create.html', context)	

