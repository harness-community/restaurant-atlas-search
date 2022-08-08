#!/bin/bash

cd server
yarn install
yarn start &
cd ../client
yarn install
yarn start &

