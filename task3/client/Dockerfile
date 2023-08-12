# Utiliza una imagen base adecuada para tu aplicación React
FROM node:18-alpine

ARG APP_PORT
ENV PORT=$APP_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${APP_PORT}

CMD [ "npm", "start" ]
