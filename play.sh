#! /usr/bin/env bash

nginx_path='./playground/nginx/nginx.conf'

function cleanup {
    echo nginx was killed
    nginx -s stop -c $nginx_path -p "$(pwd)"
}

trap cleanup EXIT
echo nginx t
nginx -t -c $nginx_path -p "$(pwd)"
wait
echo nginx start
nginx -c $nginx_path -p "$(pwd)"
wait
echo server start
yarn --cwd ./playground/package.json dev $1
