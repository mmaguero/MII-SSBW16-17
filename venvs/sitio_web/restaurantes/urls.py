# restaurantes/urls.py

from django.conf.urls import url

from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^test/$', views.test, name='test'), 
  url(r'^buscar/$', views.buscar, name='buscar'),
  url(r'^listar/$', views.listar, name='listar'),   
]
