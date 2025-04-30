#!/bin/bash
# Script para deploy do backend Express/MongoDB na Heroku

# Substitua pelo nome do seu app Heroku
HEROKU_APP_NAME="seu-app-heroku"

# Substitua pela URL de conexão do seu MongoDB Atlas
MONGODB_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco"

# Substitua pela porta que seu backend deve usar
BACKEND_PORT=3001

echo "Fazendo login na Heroku..."
heroku login

echo "Configurando variáveis de ambiente..."
heroku config:set DB_URL=$MONGODB_URL --app $HEROKU_APP_NAME
heroku config:set PORT=$BACKEND_PORT --app $HEROKU_APP_NAME

echo "Fazendo deploy do backend..."
git push heroku main

echo "Deploy do backend concluído."
