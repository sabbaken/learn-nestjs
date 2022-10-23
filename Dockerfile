FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install
ADD . .
RUN yarn run build
CMD ["node", "./dist/main.js"]