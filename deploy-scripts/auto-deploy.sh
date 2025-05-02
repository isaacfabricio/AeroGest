#!/bin/bash
# Script para rodar automaticamente a parte de deploy e configuração disponível
# Certifique-se de configurar as variáveis de ambiente necessárias antes de executar este script

echo "Iniciando deploy automático..."

# Verifica se as variáveis essenciais estão definidas
required_vars=(VERCEL_PROJECT_NAME BACKEND_URL RAILWAY_PROJECT_NAME MONGODB_URL BACKEND_PORT HEROKU_APP_NAME DOMAIN_NAME CF_API_TOKEN CF_ZONE_ID RECORD_NAME RECORD_CONTENT VERCEL_TOKEN VERCEL_PROJECT_ID RAILWAY_API_TOKEN RAILWAY_PROJECT_ID)

for var in "${required_vars[@]}"
do
  if [ -z "${!var}" ]; then
    echo "Erro: A variável de ambiente $var não está definida."
    exit 1
  fi
done

echo "Todas as variáveis de ambiente essenciais estão definidas."

# Executa o deploy completo
bash deploy-scripts/full-deploy.sh

echo "Deploy automático finalizado."
