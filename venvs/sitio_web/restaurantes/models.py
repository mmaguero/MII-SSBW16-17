# -*- coding: utf-8 -*-
from django.db import models
from mongoengine import *
import datetime
import PIL

#mongoimport --db test --collection restaurants --drop --file primer-dataset.json
connect('test') #host='localhost', port=27017

# Esquema para la BD de mongoDB
class addr(EmbeddedDocument):
    building = StringField()
    street   = StringField()
    city     = StringField()   # anhadido
    zipcode  = IntField()
    coord    = GeoPointField() # OJO, al BD de test estan a reves
                               # [long, lat] en vez de [lat, long]

class likes(EmbeddedDocument):
    grade = StringField(max_length=1)
    score = IntField()
    date  = DateTimeField()

# class image(EmbeddedDocument):
#   extension = StringField()
#   img = ImageField(size=(800, 600, True))

class restaurants(Document):
    name             = StringField(required=True, max_length=80)
    restaurant_id    = IntField()
    cuisine          = StringField()
    borough          = StringField()
    address          = EmbeddedDocumentField(addr)              # en la misma colleccion
    grades           = ListField(EmbeddedDocumentField(likes))
    image            = ImageField()

#insert simple
#dir = addr(street="Hermosa, 5 ", city="Granada", zipcode=18010, coord=[37.1766872, -3.5965171])  # asi estan bien
#r = restaurants(name="Casa Julio", cuisine="Granaina", borough="Centro", address=dir)
#r.save()

# Consulta, los tres primeros
# for r in restaurants.objects[:3]:
#    print (r.name, r.address.coord, r.grades[0].date)
