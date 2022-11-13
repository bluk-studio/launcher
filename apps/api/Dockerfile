#
# Build step
#

FROM node:16.14.0-alpine as builder
WORKDIR /app

COPY . .

# Installing required system deps
RUN apk add --no-cache build-base

# > Install python/pip
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Installing node_modules
RUN npm install

# Building api
RUN npx nx run api:build:production

#
# Production
#
FROM node:16.14.0-alpine
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/apps/api/dist/ ./dist/
COPY --from=builder /app/node_modules/ ./node_modules/

EXPOSE 3000
CMD ["node", "dist/main.js"]