FROM node:6.9.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV SSH_PASSWD "root:Docker!"

RUN apt-get update \
        && apt-get install -y --no-install-recommends dialog \
        && apt-get update \
	&& apt-get install -y --no-install-recommends openssh-server \
	&& echo "$SSH_PASSWD" | chpasswd 

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/init.sh
EXPOSE 80 8000 2222

ENTRYPOINT ["init.sh"]
