#!/bin/bash
# Script para ativar domínio personalizado e SSL no Vercel via API
# Requer: VERCEL_TOKEN, VERCEL_PROJECT_ID, DOMAIN_NAME

if [ -z "$VERCEL_TOKEN" ] || [ -z "$VERCEL_PROJECT_ID" ] || [ -z "$DOMAIN_NAME" ]; then
  echo "Erro: Variáveis VERCEL_TOKEN, VERCEL_PROJECT_ID e DOMAIN_NAME devem estar definidas."
  exit 1
fi

echo "Adicionando domínio personalizado $DOMAIN_NAME ao projeto Vercel..."

curl -s -X POST "https://api.vercel.com/v9/projects/$VERCEL_PROJECT_ID/domains" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$DOMAIN_NAME\"}"

echo "Domínio adicionado. O SSL será provisionado automaticamente pelo Vercel."

echo "Verifique no painel Vercel o status do SSL para $DOMAIN_NAME."
