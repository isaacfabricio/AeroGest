#!/bin/bash
# Script para remover tokens e segredos do histórico git do projeto AeroGest
# ATENÇÃO: Este script reescreve o histórico git. Use com cuidado e faça backup antes.

echo "Removendo tokens e segredos do histórico git..."

# Substitua 'TOKEN_A_REMOVER' pelo padrão do token a ser removido
# Exemplo: token IBMQ ou outros padrões detectados

git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch quantum/ibmq_setup.py" \
  --prune-empty --tag-name-filter cat -- --all

# Limpeza final
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now --aggressive

echo "Histórico git limpo. Faça push forçado para atualizar o repositório remoto:"
echo "git push origin --force --all"
echo "git push origin --force --tags"

# Fim do script
