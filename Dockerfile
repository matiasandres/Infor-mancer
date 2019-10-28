FROM node:latest

WORKDIR /app

COPY . .

ENV PORT=3000

RUN cd servidor_api-rest/
RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]
