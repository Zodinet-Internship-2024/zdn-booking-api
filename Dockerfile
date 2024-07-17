FROM node:20.9.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install @css-inline/css-inline-linux-x64-gnu

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]