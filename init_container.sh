#!/usr/bin/env bash

cat >/etc/motd <<EOL

 P P   S E R V I C E   O N   L I N U X
Documentation: http://aka.ms/webapp-linux
NodeJS quickstart: https://aka.ms/node-qs

EOL

cat /etc/motd

service ssh start

mkdir "$PM2HOME"
chmod 777 "$PM2HOME"
ln -s /home/LogFiles "$PM2HOME"/logs

echo "$@" > /opt/startup/startupCommand
node /opt/startup/generateStartupCommand.js

STARTUPCOMMAND=$(cat /opt/startup/startupCommand)
echo "Running $STARTUPCOMMAND"
eval "exec $STARTUPCOMMAND"
