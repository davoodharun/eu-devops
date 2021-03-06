#!/usr/bin/env bash

mkdir "$PM2HOME"
chmod 777 "$PM2HOME"
ln -s /home/LogFiles "$PM2HOME"/logs

# Get environment variables to show up in SSH session
eval $(printenv | awk -F= '{print "export " $1"="$2 }' >> /etc/profile)

# feature flag for remote debugging for with npm
# set flag and restart site to remove these changes
if [ "$APPSVC_REMOTE_DEBUGGING" = "TRUE" ] && [ ! "$APPSETTING_REMOTE_DEBUGGING_FEATURE_FLAG" = "FALSE" ]
then
        mv /usr/local/bin/node /usr/local/bin/node-original
        mv /opt/startup/node-wrapper.sh /usr/local/bin/node
        chmod a+x /usr/local/bin/node
        sed -i 's/env node/env node-original/' /usr/local/lib/node_modules/npm/bin/npm-cli.js
        sed -i 's/env node/env node-original/' /usr/local/lib/node_modules/pm2/bin/pm2
        sed -i 's/env node/env node-original/' /opt/startup/generateStartupCommand.js
fi

echo "$@" > /opt/startup/startupCommand
node /opt/startup/generateStartupCommand.js
chmod 755 /opt/startup/startupCommand
STARTUPCOMMAND=$(cat /opt/startup/startupCommand)
echo "Running $STARTUPCOMMAND"
eval "exec $STARTUPCOMMAND" &

# Ensure this happens after /sbin/init
( sleep 5 ; /etc/init.d/sshd restart ) &

# Needs to start as PID 1 for openrc on alpine
exec -c /sbin/init 