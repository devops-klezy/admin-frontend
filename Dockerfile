FROM node:alpine

WORKDIR /usr/klezy-admin-frontend

COPY ./ ./

RUN npm install

EXPOSE 5173

CMD [ "npm","run","dev" ]