#!/bin/bash
# Script principal para deploy completo: frontend, backend, DNS e SSL

# Função para validar variável de ambiente
check_env_var() {
  VAR_NAME=$1
  VAR_VALUE=$2
  if [ -z "$VAR_VALUE" ]; then
    echo "Erro: A variável de ambiente $VAR_NAME não está definida. Abortando."
    exit 1
  fi
}

# Configurações - substitua pelos seus valores reais ou configure variáveis de ambiente antes de executar

VERCEL_PROJECT_NAME="${VERCEL_PROJECT_NAME:-seu-projeto-vercel}"
BACKEND_URL="${BACKEND_URL:-http://url-do-backend}"
RAILWAY_PROJECT_NAME="${RAILWAY_PROJECT_NAME:-seu-projeto-railway}"
MONGODB_URL="${MONGODB_URL:-mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco}"
BACKEND_PORT="${BACKEND_PORT:-3001}"
HEROKU_APP_NAME="${HEROKU_APP_NAME:-seu-app-heroku}"
DOMAIN_NAME="${DOMAIN_NAME:-seudominio.com}"
CF_API_TOKEN="${CF_API_TOKEN:-seu-token-cloudflare}"
CF_ZONE_ID="${CF_ZONE_ID:-seu-zone-id-cloudflare}"
RECORD_NAME="${RECORD_NAME:-www}"
RECORD_CONTENT="${RECORD_CONTENT:-seu-projeto.vercel.app}"
VERCEL_TOKEN="${VERCEL_TOKEN:-seu-token-vercel}"
VERCEL_PROJECT_ID="${VERCEL_PROJECT_ID:-seu-project-id-vercel}"
RAILWAY_API_TOKEN="${RAILWAY_API_TOKEN:-seu-token-railway}"
RAILWAY_PROJECT_ID="${RAILWAY_PROJECT_ID:-seu-project-id-railway}"

# Validar variáveis essenciais
check_env_var "VERCEL_PROJECT_NAME" "$VERCEL_PROJECT_NAME"
check_env_var "BACKEND_URL" "$BACKEND_URL"
check_env_var "RAILWAY_PROJECT_NAME" "$RAILWAY_PROJECT_NAME"
check_env_var "MONGODB_URL" "$MONGODB_URL"
check_env_var "BACKEND_PORT" "$BACKEND_PORT"
check_env_var "DOMAIN_NAME" "$DOMAIN_NAME"
check_env_var "CF_API_TOKEN" "$CF_API_TOKEN"
check_env_var "CF_ZONE_ID" "$CF_ZONE_ID"
check_env_var "RECORD_NAME" "$RECORD_NAME"
check_env_var "RECORD_CONTENT" "$RECORD_CONTENT"
check_env_var "VERCEL_TOKEN" "$VERCEL_TOKEN"
check_env_var "VERCEL_PROJECT_ID" "$VERCEL_PROJECT_ID"
check_env_var "RAILWAY_API_TOKEN" "$RAILWAY_API_TOKEN"
check_env_var "RAILWAY_PROJECT_ID" "$RAILWAY_PROJECT_ID"

echo "Iniciando deploy do frontend..."
VERCEL_PROJECT_NAME="$VERCEL_PROJECT_NAME" BACKEND_URL="$BACKEND_URL" bash deploy-frontend.sh

echo "Iniciando deploy do backend na Railway..."
RAILWAY_PROJECT_NAME="$RAILWAY_PROJECT_NAME" MONGODB_URL="$MONGODB_URL" BACKEND_PORT="$BACKEND_PORT" bash deploy-backend-railway.sh

# Se usar Heroku, descomente a linha abaixo e comente a anterior
# HEROKU_APP_NAME="$HEROKU_APP_NAME" MONGODB_URL="$MONGODB_URL" BACKEND_PORT="$BACKEND_PORT" bash deploy-backend-heroku.sh

echo "Configurando DNS no Cloudflare..."
export CF_API_TOKEN CF_ZONE_ID DOMAIN_NAME RECORD_NAME RECORD_CONTENT
bash configure-dns-cloudflare.sh

echo "Ativando SSL no Vercel..."
export VERCEL_TOKEN VERCEL_PROJECT_ID DOMAIN_NAME
bash activate-ssl-vercel.sh

echo "Verificando status do SSL no Railway..."
export RAILWAY_API_TOKEN RAILWAY_PROJECT_ID DOMAIN_NAME
bash check-ssl-railway.sh

echo "Deploy completo e configuração finalizados."
