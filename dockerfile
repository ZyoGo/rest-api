FROM node:18.17.0

workdir /app
COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 4001
CMD [ "npm", "run", "dev" ]