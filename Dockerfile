FROM docker.io/library/node:18

WORKDIR /usr/src/api

COPY . .

COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "prod"]