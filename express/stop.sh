#!/usr/bin/env bash

kill -9 `ps -ef|grep node|awk '{print $2}'`
