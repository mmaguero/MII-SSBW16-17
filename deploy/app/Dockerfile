FROM frolvlad/alpine-python3
# Reference https://docs.docker.com/engine/reference/builder/#label
LABEL maintainer "mmaguero <marvin-aguero@hotmail.com>"

RUN apk update && apk upgrade \
    && apk add git supervisor gcc linux-headers python3-dev musl-dev freetype-dev libjpeg-turbo-dev lcms2-dev openjpeg-dev tiff-dev libwebp-dev libxml2-dev libxslt-dev zlib-dev \
    && pip install uwsgi 

ARG SHA=LATEST
RUN SHA=${SHA} \
    git clone https://github.com/mmaguero/MII-SSBW16-17.git /home/MII-SSBW16-17

COPY requirements.txt /home/MII-SSBW16-17/

RUN pip3 install --upgrade pip setuptools 

RUN pip3 install -r /home/MII-SSBW16-17/requirements.txt 

RUN apk del git gcc linux-headers

EXPOSE 8000

COPY app.ini /home/MII-SSBW16-17/venvs/sitio_web/uwsgi/
COPY supervisord.conf /etc/

CMD ["supervisord", "-n"]
