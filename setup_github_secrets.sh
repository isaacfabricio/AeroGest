#!/bin/bash
# Script para configurar secrets no GitHub usando GitHub CLI (gh)
# Requer que o GitHub CLI esteja instalado e autenticado (gh auth login)
REPO="isaacfabricio/AeroGest"  # Substitua pelo seu usuário e repositório GitHub reais


echo "Configurando secrets no repositório $REPO"

# Função para criar ou atualizar um secret
set_secret() {
  local secret_name=$1
  local secret_value=$2
  echo "Configurando secret $secret_name"
  echo "$secret_value" | gh secret set "$secret_name" --repo "$REPO" --body -
}

# Defina os valores dos secrets abaixo
IBMQ_TOKEN="deb349f6ee1ce49d65ba7dd61c167b1d6d66e1cdb6c64102dea91ceb282c8542e98b61b792307fd894f7108375a8704212c48114fc231bf24bf5f6ebd6ae08e9"
CODECOV_TOKEN="seu_token_codecov_aqui"
HEROKU_API_KEY="sua_api_key_heroku_aqui"
HEROKU_APP_NAME="nome-do-app-heroku"
HEROKU_EMAIL="seu-email@example.com"

set_secret "IBMQ_TOKEN" "$IBMQ_TOKEN"
set_secret "CODECOV_TOKEN" "$CODECOV_TOKEN"
set_secret "HEROKU_API_KEY" "$HEROKU_API_KEY"
set_secret "HEROKU_APP_NAME" "$HEROKU_APP_NAME"
set_secret "HEROKU_EMAIL" "$HEROKU_EMAIL"

echo "Configuração dos secrets concluída."
