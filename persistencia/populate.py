from mongoengine import *
import datetime

#mongoimport --db test --collection restaurants --drop --file primer-dataset.json
connect('test')

# Esquema para la BD de pruebas de mongoDB

class addr(EmbeddedDocument):
    building = StringField()
    street   = StringField()
    city     = StringField()   # añadido
    zipcode  = IntField()
    coord    = GeoPointField() # OJO, al BD de test estan a revés
                               # [long, lat] en vez de [lat, long]

class likes(EmbeddedDocument):
    grade = StringField(max_length=1)
    score = IntField()
    date  = DateTimeField()

class restaurants(Document):
    name             = StringField(required=True, max_length=80)
    restaurant_id    = IntField()
    cuisine          = StringField()
    borough          = StringField()
    address          = EmbeddedDocumentField(addr)              # en la misma collección
    grades           = ListField(EmbeddedDocumentField(likes))


dir = addr(street="Hermosa, 5 ", city="Granada", zipcode=18010, coord=[37.1766872, -3.5965171])  # así están bien
r = restaurants(name="Casa Julio", cuisine="Granaina", borough="Centro", address=dir)
r.save()

# Poner alguno más
# ...

dir = addr(street="Calle Olimpia, 5 ", city="Granada", zipcode=18014, coord=[37.2006472, -3.6248401])  # así están bien
r = restaurants(name="El Cordobés", cuisine="Cordobés", borough="Cerrillo de Maracena", address=dir)
r.save()

dir = addr(street="Calle Periodista Eugenio Selles, 10 ", city="Granada", zipcode=18014, coord=[37.1964443, -3.6235739])  # así están bien
r = restaurants(name="La Posada", cuisine="Granaina", borough="Cerrillo de Maracena", address=dir)
r.save()

# Poner alguno más
# ...

# Consulta, los tres primeros
for r in restaurants.objects[:3]:
    print (r.name, r.address.coord, r.grades[0].date)

# Hacer más consultas, probar las de geolocalización
# ... bares.py

