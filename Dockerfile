FROM node:alpine

WORKDIR /usr/src/app

ENV PORT 8080

COPY package*.json ./

RUN npm install --only=production

COPY ./dist ./dist

CMD ["npm", "run", "start:prod"]