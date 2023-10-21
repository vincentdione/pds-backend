#FROM node:14

#ENV  NODE_ENV = dev

#WORKDIR  /usr/src/api
#COPY package.json .
#COPY package-lock.json .
#RUN npm install
#COPY . .

#CMD ["sh","-c","npm start"]
FROM node:14.14.0-alpine as DEV 
ENV  NODE_ENV = dev

WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start"]