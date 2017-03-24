#Bares

from lxml import etree

que_son = ['Julio', 'Cebollas', 'Bodegas Castañeda', 'La Isla', 'Marisquería EL Puerto']

strr = 'http://maps.googleapis.com/maps/api/geocode/xml?address='

for bar in que_son:
   r = strr+bar+' Granada'
   print(bar)

   tree = etree.parse(r)
   dire = tree.xpath('//formatted_address/text()')

   if dire:
       print(dire[0])
   print('---')
