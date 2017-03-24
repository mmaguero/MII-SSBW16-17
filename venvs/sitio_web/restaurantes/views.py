from django.shortcuts import render, HttpResponse
from .models import restaurants

# Create your views here.


def index(request):
    return HttpResponse('Hello World Django!')

def test(request):
    valor = 3
    context = {
        'variable': valor,
        'resta': restaurants.objects[:5], 
    }   # Aqui van la las variables para la plantilla
    return render(request,'test.html', context)  

def listar(request):
    context = {
        'resta': restaurants.objects[:50], 
    }   # Aqui van la las variables para la plantilla
    return render(request,'listar.html', context)  

def buscar(request):
    cocina = request.GET.get('cocina')
    lista=restaurants.objects(cuisine__icontains=cocina)
    context = {
        'resta': lista, 
    }
    return render(request,'listar.html', context) 
 
