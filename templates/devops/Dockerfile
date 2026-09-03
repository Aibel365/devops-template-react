FROM node:26-alpine AS base
RUN apk add --update nodejs
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci --silent
COPY . .

FROM base AS lint
RUN npm run lint

FROM base AS format
RUN npm run format:check

FROM base AS test
ENV CI=true
RUN npm test

FROM base AS builder
RUN npm run build

FROM node:26-alpine AS final
RUN apk add --update nodejs
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package*.json /app/

EXPOSE 8080
USER node

CMD ["node", ".output/server/index.mjs"]