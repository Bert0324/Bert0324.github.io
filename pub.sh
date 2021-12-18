#! /usr/bin/env bash

cd ./site
yarn build
cd ..
git add .
git commit -m "$1"
git push
