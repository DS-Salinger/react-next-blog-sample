FROM node:18.10.0-alpine

WORKDIR /app
EXPOSE 3000

RUN apk --update --no-cache add git openssh
RUN npm install -g firebase-tools