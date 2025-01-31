# Usa uma imagem oficial do Node.js como base
FROM node:18-alpine AS build

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos do projeto para dentro do contêiner
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Instala as dependências do frontend
RUN npm install --frozen-lockfile

# Copia o restante do código do frontend
COPY ./frontend ./

# Gera a build otimizada para produção
RUN npm run build

# Usa Nginx para servir a aplicação no ambiente de produção
FROM nginx:stable-alpine

# Copia os arquivos da build para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80 para servir a aplicação React
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
