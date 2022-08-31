#!/bin/bash

cd server
yarn install
yarn start &
cd ../client
yarn install
sleep 10
yarn start &

