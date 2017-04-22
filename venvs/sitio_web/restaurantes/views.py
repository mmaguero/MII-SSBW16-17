# -*- coding: utf-8 -*-
from django.shortcuts import render, HttpResponse,redirect
from django.http import JsonResponse
from .forms import RestaurantesForm
from .models import restaurants, addr#, image
from django.contrib.auth.decorators import login_required

import logging

log = logging.getLogger(__name__)

# Create your views here.

def index(request):
    log.info("INDEX - Hey there it works!!")
    context = {
        'menu': 'index'
    }
    #return HttpResponse('My Restaurants Manager')
    return render(request,'index.html',context)

def test(request):
    valor = 3
    context = {
        'variable': valor,
        'resta': restaurants.objects[:5],
    }   # Aqui van la las variables para la plantilla
    return render(request,'test.html', context)

@login_required
def listar(request):
    log.info("LIST - Hey there it works!!")
    context = {
        'resta': restaurants.objects[:10],
        'menu': 'list'
    }   # Aqui van la las variables para la plantilla
    return render(request,'listar.html', context)

@login_required
def buscar(request):
    log.info("SEARCH - Hey there it works!!")
    cocina = request.GET.get('cocina')
    lista=restaurants.objects(cuisine__icontains=cocina)
    context = {
        'resta': lista,
    }
    return render(request,'listar.html', context)

@login_required
def add(request):
    log.info("ADD - Hey there it works!!")
    formu = RestaurantesForm()

    if request.method == "POST":

    	formu = RestaurantesForm(request.POST, request.FILES)
    	if formu.is_valid():                    # valida o anhade errores

    		# datos sueltos
            nombre = formu.cleaned_data['nombre']
            cocina = formu.cleaned_data['cocina']
            barrio = formu.cleaned_data['barrio']
            calle  = formu.cleaned_data['direccion']
            imagen = request.FILES['imagen'] #formu.cleaned_data['imagen']

            #tipo_foto = imagen.content_type
            # tipo y nombre
            direc = addr(street=calle)
            #i = image(extension=tipo_foto, img=imagen)
            r = restaurants(name=nombre, cuisine=cocina, borough=barrio, address=direc , image=imagen)

            r.save()

            # formu.save()                         # si está ligado al model

            return redirect(index)
    # GET o error
    context = {
      'form': formu,
      'menu': 'add',
    }

    return render(request, 'form.html', context)

# @login_required
# def update(request):
#     log.info("UPD - Hey there it works!!")
#     name = request.GET.get('name')
#     obj=restaurants.objects(name=name)
#     context = {
#         'resta': obj,
#     }
#     return render(request,'formUpdate.html', context)

# url
@login_required
def restaurant(request, name):
  log.info("DETAIL - Hey there it works!!")
  resta=restaurants.objects(name=name)[0]
  context = {
      'resta': resta,
  }
  return render(request, 'detalle.html', context)

# recuperar foto
@login_required
def imagen(request, name):
  log.info("IMAGE - Hey there it works!!")
  res = restaurants.objects(name=name)[0]
  img = res.image.read()
  return HttpResponse(img, content_type="image/" + res.image.format)

def r_ajax(request, name):
  log.info("AJAX - Hey there it works!!")
  resta = restaurants.objects(name=name)[0]
  maps = '<iframe width="450" height="300" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Space+Needle,Seattle+WA" allowfullscreen></iframe>'
  return JsonResponse({'map':maps})    # podría ser string o HTML
