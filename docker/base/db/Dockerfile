FROM postgres:alpine

RUN apk update && \
    apk add --no-cache \
        gcc \
        musl-dev \
        python3-dev \
        py3-pip

RUN pip3 install --upgrade pip
RUN pip3 install pgcli

COPY ./docker/base/db/manage /manage

RUN chmod +x /manage/* \
    && mv /manage/* /usr/local/bin \
    && rmdir /manage