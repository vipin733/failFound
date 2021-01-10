
FROM node:12

WORKDIR /src/client/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5003

CMD ["npm", "run", "dev"]