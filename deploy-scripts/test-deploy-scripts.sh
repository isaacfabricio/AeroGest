#!/bin/bash
# Script simples para testar os scripts de deploy e configuração

echo "Testando deploy-frontend.sh..."
bash deploy-frontend.sh --dry-run || echo "deploy-frontend.sh falhou ou não suporta --dry-run"

echo "Testando deploy-backend-railway.sh..."
bash deploy-backend-railway.sh --dry-run || echo "deploy-backend-railway.sh falhou ou não suporta --dry-run"

echo "Testando deploy-backend-heroku.sh..."
bash deploy-backend-heroku.sh --dry-run || echo "deploy-backend-heroku.sh falhou ou não suporta --dry-run"

echo "Testando configure-dns-cloudflare.sh..."
bash configure-dns-cloudflare.sh --dry-run || echo "configure-dns-cloudflare.sh falhou ou não suporta --dry-run"

echo "Testando activate-ssl-vercel.sh..."
bash activate-ssl-vercel.sh --dry-run || echo "activate-ssl-vercel.sh falhou ou não suporta --dry-run"

echo "Testando check-ssl-railway.sh..."
bash check-ssl-railway.sh --dry-run || echo "check-ssl-railway.sh falhou ou não suporta --dry-run"

echo "Testando full-deploy.sh..."
bash full-deploy.sh --dry-run || echo "full-deploy.sh falhou ou não suporta --dry-run"

echo "Testes concluídos. Verifique as mensagens acima para erros."
