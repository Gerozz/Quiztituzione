#!/usr/bin/env bash
service mariadb start
mysql -e "CREATE DATABASE IF NOT EXISTS quiztituzione;"
mysql quiztituzione < /quiztituzione.sql
