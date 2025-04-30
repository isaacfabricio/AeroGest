# Dockerfile para backend Node.js

FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json
COPY AeroGest/sistema-unificado/backend/package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do código
COPY AeroGest/sistema-unificado/backend .

# Expõe a porta da aplicação
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
