#! /usr/bin/env bash

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout ./cert/key.pem -out ./cert/cert.pem
