FROM node:12.16.1

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . /app

RUN bash -c "npm run react-prod"

EXPOSE 3003

CMD ["node", "server/server.js"]