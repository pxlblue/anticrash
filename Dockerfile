FROM node:14-alpine
WORKDIR /usr/src/app

COPY yarn.lock .
COPY package.json .

RUN yarn install --production --ignore-scripts --prefer-offline

COPY src/ ./src

CMD ["yarn", "start"]