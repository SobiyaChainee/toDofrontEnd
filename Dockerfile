FROM node:18-alpine as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.19.0
COPY --from=builder /app/build  /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]
