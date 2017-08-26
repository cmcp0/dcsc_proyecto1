from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^new$', views.administrador_new, name='administrador_new'),
    url(r'^create$', views.administrador_create, name='administrador_create'),

    url(r'^usuario/(?P<id>[0-9]+)$', views.usuarios),
    url(r'^usuario/$', views.usuarios),
    # url(r'^usuario/(?P<key>\w{1,50})$', views.usuarios),

]
