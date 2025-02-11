FROM node:23-alpine AS build

WORKDIR /app

COPY . .

RUN npm install --production

FROM build AS render-server
EXPOSE 4000
CMD ["node", "server.mjs"]

FROM build AS admin-cabinet
EXPOSE 3000
CMD ["npm", "run", "dev"]
