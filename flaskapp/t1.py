# -*- coding: utf-8 -*-

from flask import Flask, Response, render_template
app = Flask(__name__)

@app.route('/un_texto_html/')                         # decorador, varia los parametros
def hello_world():                                   # I/O de la función localhost:5000
    return '¡Hola Mundo! pero en texto html'

@app.route('/un_texto_plano/<mas_cosas>/')                         
def hello_world_(mas_cosas):   
    response = Response()
    response.headers['Content-Type'] = 'text/plain; charset=utf-8'
    response.set_data("Un texto plano..."+mas_cosas);                           
    return response

@app.route('/jpg')
def png():
    response = Response()
    response.headers.add('Content-Type', 'image/jpg')
    f = open ('granada.jpg', 'rb')
    imagen = f.read();
    f.close();
    response.set_data(imagen);   # Datos binarios
    return response

@app.route('/sitio')
def sitio():
    usuarios = []
    usuarios.append({'name':'Pepe', 'dni':1})
    usuarios.append({'name':'Pepa', 'dni':2})
    usuarios.append({'name':'Pope', 'dni':3})
    return render_template('hola.html', var='esto', usuario = usuarios)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)  # 0.0.0.0 para permitir conexiones
                                         #         desde cualquier sitio.
                                         #         Ojo, peligroso en solo
                                         #         en modo debug
