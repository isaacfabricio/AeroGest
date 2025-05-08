#!/bin/bash
# Script para configurar variáveis de ambiente seguras para tokens do projeto AeroGest

echo "Configurando variáveis de ambiente para tokens..."

# Exemplo para configurar token IBMQ
read -sp "Digite o token IBMQ: " IBMQ_TOKEN
echo
export IBMQ_TOKEN=$IBMQ_TOKEN
echo "Token IBMQ configurado na sessão atual."

# Exemplo para configurar token GitHub Actions PAT
read -sp "Digite o token GitHub Actions PAT: " ACTIONS_PAT
echo
export ACTIONS_PAT=$ACTIONS_PAT
echo "Token GitHub Actions PAT configurado na sessão atual."

echo "Variáveis de ambiente configuradas. Para persistir, adicione-as ao seu arquivo ~/.bashrc ou ~/.zshrc."

echo "Lembre-se de configurar os segredos correspondentes no repositório GitHub para uso no CI/CD."

# Fim do script
