# ======== STAGE 1: Build ========
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# O frontend precisa saber o endereço do Strapi em build time
ARG VITE_STRAPI_URL=http://localhost:1337
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL

RUN npm run build

# ======== STAGE 2: Servir com Nginx ========
FROM nginx:alpine

# Copiar build do Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
