#! /usr/bin/env bash

echo start static
yarn --cwd ./playground/package.json static &
yarn --cwd ./playground/package.json server &
