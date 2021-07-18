#!/usr/bin/env bash

nohup npm start &
echo $! > server.pid
