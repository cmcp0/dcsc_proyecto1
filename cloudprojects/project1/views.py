# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from project1.models import Video, Concurso, Usuario
from django.views.decorators.csrf import csrf_exempt
import datetime
import json
from django.core import serializers
from django.http import QueryDict
from django.conf import settings
from django.core.files.storage import FileSystemStorage

# Create your views here.

def index(request):
    return HttpResponse("WELCOME TO SMARTOOLS")


def administrador_new(request):
    context={}
    #return render(request, 'administrador_new.html', context)
    return HttpResponse("PRUEBA")

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
        # 
        key = request.META['HTTP_TOKEN'] 
        print key
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
        print body
        user_email = body['email']

        try:
            user = Usuario.objects.get(email=user_email)
        except (KeyError, Usuario.DoesNotExist):
            # save user
            user = Usuario(nombres=body['nombres'], apellidos=body['apellidos'],email=body['email'],contrasena=body["contrasena"],_token=body["token"])
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


    if metodo == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        user_id= body['id']

        try:
            user = Usuario.objects.get(id=user_id)
            
        except (KeyError, Usuario.DoesNotExist):
            # save user
            
            return JsonResponse({'mensaje': 'Usuario no encontrado'})
        else:
            # return error
            user = Usuario(**body)
            user.save()
            return JsonResponse({'correcto': ' Usuario modificado'})            


def concursos(request, id=-1):
    metodo = request.method

    if metodo == 'GET':
        # print(request.scheme)
        # print(request.GET.__getitem__('key'))
        # print(id)
        key = request.META['HTTP_TOKEN'] 
        print key
        try:
            #válida si el usuario tiene acceso a data
            usuario = Usuario.objects.get(_token=key)
        
        except (KeyError, Usuario.DoesNotExist):
             
            return JsonResponse({'error1': 'Token invalido'})
        else:
            # print('val')

            try:
                if id > -1:
                    concursoToGet = [Concurso.objects.get(administraconcu=key)]
                else:
                    
                    concursoToGet =Concurso.objects.all().filter(administraconcu=key)
            except (KeyError, Concurso.DoesNotExist):
                return JsonResponse({'error2': 'Concurso no existe'})
            else:
                data = serializers.serialize('json', concursoToGet)
                return HttpResponse(data)


    if metodo == 'POST' and request.FILES['imagen']:
        print request.POST
        concurso_url = request.POST['urlconcu']
        myfile = request.FILES['imagen']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        uploaded_file_url = fs.url(filename)
        print uploaded_file_url
        data = request.POST
        try:
            concuso_ = Concurso.objects.get(urlconcu=concurso_url)
        except (KeyError, Concurso.DoesNotExist):
            # save user
            concurso_ = Concurso(nombreconcu = data['nombreconcu'],imagenurl = uploaded_file_url,imagenconcu = myfile,urlconcu = concurso_url,feini = datetime.datetime.strptime(data['feini'], '%d/%m/%Y'),fefin = datetime.datetime.strptime(data['fefin'], '%d/%m/%Y'),premio = data['premio'],administraconcu = Usuario.objects.get(_token=data['admin']))
            concurso_.save()
            return JsonResponse({'mensaje': 'Concurso guardado'})
        else:
            # return error
            return JsonResponse({'error': 'Ya existe el Concurso'})             


    if metodo == 'DELETE':
        # print(QueryDict(request.get_full_path().split("?")[1]).get('key'))
        print(id)
        _sessionToken = QueryDict(request.get_full_path().split("?")[1]).get('key')

        try:
            usuario = Usuario.objects.get(_token=_sessionToken)
        except (KeyError, Usuario.DoesNotExist):
            return JsonResponse({'error': 'Usuario invalido'})
        else:
            try:
                if id > -1:
                    concursoToDel = Concurso.objects.get(id=id)
                else:
                    return JsonResponse({'error': 'Concurso no encontrado'})    

            except (KeyError, Concurso.DoesNotExist):
                return JsonResponse({'error': 'Concurso no existe'})
            else:
                concursoToDel.delete()
                return JsonResponse({'mensaje':'Concurso Borrado'})


    if metodo == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        concurso_id= body['id']

        try:
            concurso_ = Concurso.objects.get(id=concurso_id)
            
        except (KeyError, Concurso.DoesNotExist):
            # save user
            
            return JsonResponse({'mensaje': 'Concurso no encontrado'})
        else:
            # return error
            concurso_ = Concurso(**body)
            concurso_.save()
            return JsonResponse({'correcto': ' Concurso modificado'})           

def videos(request, id=-1):
    metodo = request.method

    if metodo == 'GET':
        # print(request.scheme)
        # print(request.GET.__getitem__('key'))
        # print(id)
        key = request.GET.__getitem__('key')
        try:
            #válida si el usuario tiene acceso a data
            usuario = Usuario.objects.get(_token=key)
        
        except (KeyError, Usuario.DoesNotExist):
             
            return JsonResponse({'error1': 'Token invalido'})
        else:
            # print('val')

            try:
                if id > -1:
                    videoToGet = [Video.objects.get(id=id)]
                else:
                    
                    videoToGet = Video.objects.all()

            except (KeyError, Video.DoesNotExist):
                return JsonResponse({'error2': 'Video no existe'})
            else:
                data = serializers.serialize('json', videoToGet, fields=('fechasub','estado','video', 'descrip','particoncu','nombreconcursante','apellidoconcursante','emailconcursante' ))
                return JsonResponse(data, safe=False)

    if metodo == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        concurso_id = body['particoncu_id']

        try:
            concurso_ = Concurso.objects.get(id=concurso_id)
            video_ = Video(**body)
            video_.save()
            return JsonResponse({'mensaje': 'Video guardado'})
        except (KeyError, Concurso.DoesNotExist):
            # save user
            
            return JsonResponse({'mensaje': 'Video no guardado'})
        
            
    if metodo == 'PUT':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        video_id= body['id']

        try:
            video_ = Video.objects.get(id=video_id)
            
        except (KeyError, Concurso.DoesNotExist):
                        
            return JsonResponse({'mensaje': 'Video no encontrado'})
        
        else: 
            # return error
            video_ = Video(**body)
            video_.save()
            return JsonResponse({'correcto': ' Video modificado'})
                        

    if metodo == 'DELETE':
        # print(QueryDict(request.get_full_path().split("?")[1]).get('key'))
        print(id)
        _sessionToken = QueryDict(request.get_full_path().split("?")[1]).get('key')

        try:
            usuario = Usuario.objects.get(_token=_sessionToken)
        except (KeyError, Usuario.DoesNotExist):
            return JsonResponse({'error': 'Usuario invalido'})
        else:
            try:
                if id > -1:
                    videoToDel = Video.objects.get(id=id)
                else:
                    return JsonResponse({'error': 'Concurso no encontrado'})    

            except (KeyError, Video.DoesNotExist):
                return JsonResponse({'error': 'Video no existe'})
            else:
                videoToDel.delete()
                return JsonResponse({'mensaje':'Video Borrado'})                    