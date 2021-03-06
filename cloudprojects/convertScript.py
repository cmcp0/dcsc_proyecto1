# export DJANGO_SETTINGS_MODULE=cloudprojects.settings
import manage
import django
import subprocess
import datetime
import os
import smtplib

os.system('export DJANGO_SETTINGS_MODULE=cloudprojects.settings')


import random
import string


django.setup()
from project1.models import Video



q = list(Video.objects.filter(estado="Pendiente"))
# subprocess.call('ls')
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/cloudprojects/media/'

url = ' media/videosPublicados/'
name = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(16)])
date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
# fsa.join()
print(BASE_DIR)

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('pruebascloud2017@gmail.com', 'cloud2017')
msg = '\n El video ha sido publicado exitosamente!'

for Q in q:
    print('\n')
    url = 'videosPublicados/'
    name = ''.join([random.choice(string.ascii_letters + string.digits) for n in xrange(16)])
    date = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    # command = 'cp .' + Q.videoSubido.url+ ' ' + url
    command = 'ffmpeg -i ' + BASE_DIR + Q.videoSubido.name+ ' -c:a aac -c:v copy ' + BASE_DIR + url+name+'_'+date+'.mp4'

    try:
        print(command)
        # subprocess.call(command)
        os.system(command)
        Q.videoPublicado = 'videosPublicados/'+name+'_'+date+'.mp4'
        Q.estado ='Convertido'
        Q.save()
    except Exception as e:
        # raise
        print('Error ' + Q.videoSubido.name)
        print('\n')
        print(e)
    else:
        print('Convertido ' + url+name+'_'+date+'.mp4')

        try:

            server.sendmail("pruebascloud2017@gmail.com", Q.emailconcursante, msg)
        except Exception as e:
            print(e)
        else:
            print('email enviado')


# print(a[0])
