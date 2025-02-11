FROM node:23-alpine AS build

WORKDIR /app

COPY . .

RUN npm install --production

FROM build AS render-server

RUN apt-get update
RUN apt install -y \
  libnss3 \
  libdbus-1-3 \
  libatk1.0-0 \
  libgbm-dev \
  libasound2 \
  libxrandr2 \
  libxkbcommon-dev \
  libxfixes3 \
  libxcomposite1 \
  libxdamage1 \
  libatk-bridge2.0-0 \
  libpango-1.0-0 \
  libcairo2 \
  libcups2

RUN npx remotion browser ensure

EXPOSE 4000
CMD ["node", "server.mjs"]

FROM build AS admin-cabinet
EXPOSE 3000
CMD ["npm", "run", "dev"]
