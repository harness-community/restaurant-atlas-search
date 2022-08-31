FROM node:16-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY yarn.lock ./
COPY .env ./

ADD controllers /app/controllers
ADD db /app/db
ADD models /app/models
ADD routes /app/routes

RUN yarn install --production

EXPOSE 5001

CMD node server.js
