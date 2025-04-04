FROM node:18-alpine

WORKDIR /app

# Uygulama bağımlılıklarını kopyala ve yükle
COPY package*.json ./
RUN npm install

# Uygulama kaynak kodunu kopyala
COPY . .

# Gerekirse environment değişkenlerini ayarla
ENV NODE_ENV production

# Port'u aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["node", "src/server.js"]