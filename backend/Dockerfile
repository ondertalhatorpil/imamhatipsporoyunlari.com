# frontend/Dockerfile
# Build aşaması
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Prodüksiyon build'i oluştur
RUN npm run build

# Prodüksiyon aşaması
FROM nginx:stable-alpine as production-stage

# Build aşamasında oluşturulan dosyaları nginx'e kopyala
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx yapılandırma dosyasını kopyala
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]