# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from project1.models import Video, Concurso, Usuario
from django.views.decorators.csrf import csrf_exempt

import json
from django.core import serializers
from django.http import QueryDict

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


def usuarios(request, id=-1):
	metodo = request.method

	if metodo == 'GET':
		# print(request.scheme)
		# print(request.GET.__getitem__('key'))
		# print(id)
		key = request.GET.__getitem__('key')
		try:
			user = Usuario.objects.get(_token=key)
		except (KeyError, Usuario.DoesNotExist):
			return JsonResponse({'error': 'Token invalido'})
		else:
			# print('val')
			try:
				if id > -1:
					userToGet = [Usuario.objects.get(id=id)]
				else:
					userToGet = Usuario.objects.all()
			except (KeyError, Usuario.DoesNotExist):
				return JsonResponse({'error': 'Usuario no existe'})
			else:
				data = serializers.serialize('json', userToGet, fields=('nombres','apellidos','email'))
				return JsonResponse(data, safe=False)


	if metodo == 'POST':
		body_unicode = request.body.decode('utf-8')
		body = json.loads(body_unicode)
		user_email = body['email']

		try:
			user = Usuario.objects.get(email=user_email)
		except (KeyError, Usuario.DoesNotExist):
			# save user
			user = Usuario(**body)
			user.save()
			return JsonResponse({'mensaje': 'Usuario guardado'})
		else:
			# return error
			return JsonResponse({'error': 'Ya existe el Usuario'})

	if metodo == 'DELETE':
		# print(QueryDict(request.get_full_path().split("?")[1]).get('key'))
		print(id)
		_sessionToken = QueryDict(request.get_full_path().split("?")[1]).get('key')

		try:
			user = Usuario.objects.get(_token=_sessionToken)
		except (KeyError, Usuario.DoesNotExist):
			return JsonResponse({'error': 'Token invalido'})
		else:
			try:
				userToDel = Usuario.objects.get(id=id)
			except (KeyError, Usuario.DoesNotExist):
				return JsonResponse({'error': 'Usuario no existe'})
			else:
				userToDel.delete()
				return JsonResponse({'mensaje':'Usuario Borrado'})
