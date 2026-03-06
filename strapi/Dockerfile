FROM node:20-alpine

WORKDIR /app

# Copiar dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build do Strapi
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
