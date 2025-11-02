#FROM node:lts-alpine AS builder
FROM node:slim AS builder

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

RUN npm run build || echo "no build script found"

FROM node:lts-alpine AS runtime

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl

COPY --from=builder /usr/src/app /usr/src/app

ENV NODE_ENV=production \
    PORT=3000

EXPOSE 3000

CMD sh -c "npm run prisma:prod && node build/index.js"
