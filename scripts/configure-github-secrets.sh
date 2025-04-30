#!/bin/bash

# Script para configurar segredos no repositório GitHub via GitHub CLI
# Requer GitHub CLI instalado e autenticado (gh auth login)

REPO="usuario/repositorio" # Substitua pelo seu usuário e repositório GitHub
SECRETS=(
  "SNYK_TOKEN"
  "SMTP_USERNAME"
  "SMTP_PASSWORD"
)

for SECRET in "${SECRETS[@]}"
do
  echo "Digite o valor para o segredo $SECRET:"
  read -s VALUE
  echo "Configurando segredo $SECRET..."
  echo "$VALUE" | gh secret set $SECRET --repo $REPO --body -
done

echo "Segredos configurados com sucesso."
