FROM node:18.10.0-alpine
WORKDIR /app
EXPOSE 3000

RUN npm install -g firebase-tools