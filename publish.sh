#! /usr/bin/env bash

echo building
yarn --cwd ./site/package.json build
wait
cd ..
echo git add
git add .
wait
echo git commit
git commit -m "$1"
wait
echo git push
git push
wait
