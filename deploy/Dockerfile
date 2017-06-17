 FROM python:3
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /sitio_web
 WORKDIR /sitio_web
 ADD requirements.txt /sitio_web/
 RUN pip3 install -r requirements.txt
 #RUN install nginx or apache 
 ADD . /sitio_web/
