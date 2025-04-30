#!/bin/bash
# Script para configurar registro DNS no Cloudflare via API
# Requer: CF_API_TOKEN, CF_ZONE_ID, DOMAIN_NAME, RECORD_NAME, RECORD_CONTENT

if [ -z "$CF_API_TOKEN" ] || [ -z "$CF_ZONE_ID" ] || [ -z "$DOMAIN_NAME" ] || [ -z "$RECORD_NAME" ] || [ -z "$RECORD_CONTENT" ]; then
  echo "Erro: Variáveis CF_API_TOKEN, CF_ZONE_ID, DOMAIN_NAME, RECORD_NAME e RECORD_CONTENT devem estar definidas."
  exit 1
fi

echo "Buscando registros DNS existentes para $RECORD_NAME.$DOMAIN_NAME..."

RECORD_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records?type=CNAME&name=$RECORD_NAME.$DOMAIN_NAME" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')

if [ "$RECORD_ID" = "null" ]; then
  echo "Registro não encontrado. Criando novo registro CNAME..."
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"$RECORD_NAME\",\"content\":\"$RECORD_CONTENT\",\"ttl\":3600,\"proxied\":true}"
  echo "Registro criado."
else
  echo "Registro encontrado (ID: $RECORD_ID). Atualizando registro..."
  curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records/$RECORD_ID" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"CNAME\",\"name\":\"$RECORD_NAME\",\"content\":\"$RECORD_CONTENT\",\"ttl\":3600,\"proxied\":true}"
  echo "Registro atualizado."
fi

echo "Configuração DNS concluída."
