# Usa Node.js 20 como base
FROM node:20-slim AS base

# Instalar OpenSSL para Prisma
RUN apt-get update -y && apt-get install -y openssl

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias de producción
RUN npm ci --only=production

# Stage de build
FROM base AS build

# Copiar todo el código
COPY . .

# Instalar todas las dependencias (incluyendo dev)
RUN npm ci

# Generar Prisma Client
RUN npx prisma generate

# Construir la aplicación
RUN npm run build

# Stage final de producción
FROM node:20-slim

# Instalar OpenSSL para Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copiar dependencias de producción desde base
COPY --from=base /app/node_modules ./node_modules

# Copiar archivos de Prisma
COPY --from=build /app/prisma ./prisma

# Copiar el build de Astro
COPY --from=build /app/dist ./dist

# Copiar package.json para el comando start
COPY --from=build /app/package.json ./package.json

# Crear directorios para datos persistentes
RUN mkdir -p /app/prisma /app/public/uploads && \
    chmod -R 755 /app/prisma /app/public/uploads

# Exponer el puerto
EXPOSE 3000

# Variables de entorno por defecto
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Ejecutar migraciones y arrancar la app
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
