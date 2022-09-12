#!/bin/sh
git pull origin main
rm -rf /dist
nest build
pm2 delete 0
pm2 start dist/main.js --name randori2