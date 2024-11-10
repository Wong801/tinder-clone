FROM node:23-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm run prisma-generate
RUN npm run build

# remove dev dependencies
RUN npm prune --production

FROM alpine:latest

WORKDIR /usr/src/app

# copy from build image
COPY --from=build /usr/src/app/dist/src .
COPY --from=build /usr/src/app/dist/prisma ./prisma
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ../package.json

RUN \
  apk add --update nodejs --no-cache && \
  mkdir /public/images

EXPOSE 80

CMD ["node", "index.js"]