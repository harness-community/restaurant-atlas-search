FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY yarn.lock ./

ADD controllers /app/controllers
ADD db /app/db
ADD models /app/models
ADD routes /app/routes

ARG ATLAS_URI

RUN pwd && echo $ATLAS_URI 
RUN yarn install --production

EXPOSE 5001

CMD node server.js
