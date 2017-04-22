# -*- coding: utf-8 -*-
from django import forms

from .models import restaurants


# Para campos individuales:

class RestaurantesForm(forms.Form):
  nombre    = forms.CharField(required=True, label='Name', max_length=80)
  cocina    = forms.CharField(required=True, label='Cuisine', widget=forms.TextInput(attrs={'placeholder': 'Granaina'}))
  direccion = forms.CharField(required=True, label='Street')
  barrio    = forms.CharField(required=True, label='Borough', widget=forms.TextInput())
  imagen    = forms.ImageField(required=False, label='Photo')

'''
#for mongoengine
class RestaurantesForm(ModelForm):

  class Meta:
    model = restaurants
    fields = ['name', 'cuisine', 'address.street', 'borough', 'image']
    '''
