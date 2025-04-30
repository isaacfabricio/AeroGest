#!/bin/bash
# Script para deploy do backend Express/MongoDB na Railway

# Substitua pelo nome do seu projeto Railway
RAILWAY_PROJECT_NAME="seu-projeto-railway"

# Substitua pela URL de conexão do seu MongoDB Atlas
MONGODB_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco"

# Substitua pela porta que seu backend deve usar
BACKEND_PORT=3001

echo "Fazendo login na Railway..."
railway login

echo "Selecionando projeto Railway..."
railway link --project $RAILWAY_PROJECT_NAME

echo "Configurando variáveis de ambiente..."
railway variables set DB_URL=$MONGODB_URL
railway variables set PORT=$BACKEND_PORT

echo "Fazendo deploy do backend..."
railway up

echo "Deploy do backend concluído."
