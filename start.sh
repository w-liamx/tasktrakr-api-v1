#!/bin/bash
# Basic startup script for EC2 deployment

npm install --production
pm2 start npm --name tasktrackr-api -- run start:prod
