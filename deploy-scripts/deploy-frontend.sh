#!/bin/bash
# Script para deploy do frontend Next.js na Vercel

# Substitua pelo nome do seu projeto Vercel
VERCEL_PROJECT_NAME="seu-projeto-vercel"

# Substitua pela URL pública do seu backend
BACKEND_URL="http://url-do-backend"

echo "Fazendo login na Vercel..."
vercel login

echo "Selecionando projeto Vercel..."
vercel link --project $VERCEL_PROJECT_NAME

echo "Configurando variáveis de ambiente..."
vercel env add NEXT_PUBLIC_API_URL production $BACKEND_URL

echo "Fazendo deploy para produção..."
vercel --prod --confirm --project $VERCEL_PROJECT_NAME

echo "Deploy do frontend concluído."
