FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD ["sh", "-c", "PORT=${PORT} NODE_ENV=production node src/server.js"]
