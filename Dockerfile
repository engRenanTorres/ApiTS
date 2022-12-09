FROM node:14
WORKDIR /apitTs
COPY . .
RUN npm i
RUN npm run build
ENTRYPOINT node build/server.js