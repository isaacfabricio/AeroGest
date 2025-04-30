#!/bin/bash
# Script para verificar status do domínio e SSL no Railway via API
# Requer: RAILWAY_API_TOKEN, RAILWAY_PROJECT_ID, DOMAIN_NAME

if [ -z "$RAILWAY_API_TOKEN" ] || [ -z "$RAILWAY_PROJECT_ID" ] || [ -z "$DOMAIN_NAME" ]; then
  echo "Erro: Variáveis RAILWAY_API_TOKEN, RAILWAY_PROJECT_ID e DOMAIN_NAME devem estar definidas."
  exit 1
fi

echo "Buscando domínios configurados no projeto Railway..."

curl -s -X GET "https://backboard.railway.app/v1/projects/$RAILWAY_PROJECT_ID/domains" \
  -H "Authorization: Bearer $RAILWAY_API_TOKEN" \
  -H "Content-Type: application/json" | jq '.domains[] | select(.domain == "'$DOMAIN_NAME'")'

echo "Verifique o campo 'ssl' para status do certificado."
