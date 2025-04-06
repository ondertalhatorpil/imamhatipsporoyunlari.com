FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Yükleme dizinini oluştur
RUN mkdir -p ./public/uploads/gallery

EXPOSE 8561
CMD ["node", "src/server.js"]