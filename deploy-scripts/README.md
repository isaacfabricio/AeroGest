# Documentação dos Scripts de Deploy e Configuração

Este documento explica como usar os scripts de deploy e configuração automatizados para seu projeto frontend e backend, incluindo configuração de DNS e SSL.

---

## Scripts disponíveis

- `deploy-frontend.sh`: Faz deploy do frontend Next.js na Vercel.
- `deploy-backend-railway.sh`: Faz deploy do backend Node.js/MongoDB na Railway.
- `deploy-backend-heroku.sh`: Faz deploy do backend na Heroku.
- `configure-dns-cloudflare.sh`: Configura registros DNS no Cloudflare via API.
- `activate-ssl-vercel.sh`: Adiciona domínio personalizado e ativa SSL no Vercel via API.
- `check-ssl-railway.sh`: Verifica status do domínio e SSL no Railway via API.
- `full-deploy.sh`: Script principal que integra todos os passos acima.

---

## Configuração das variáveis de ambiente

Antes de executar os scripts, configure as variáveis de ambiente necessárias. Você pode definir no terminal ou editar os valores padrão no script `full-deploy.sh`.

Variáveis principais:

- `VERCEL_PROJECT_NAME`: Nome do projeto na Vercel.
- `BACKEND_URL`: URL pública do backend.
- `RAILWAY_PROJECT_NAME`: Nome do projeto na Railway.
- `MONGODB_URL`: URL de conexão do MongoDB Atlas.
- `BACKEND_PORT`: Porta do backend.
- `HEROKU_APP_NAME`: Nome do app na Heroku.
- `DOMAIN_NAME`: Seu domínio personalizado.
- `CF_API_TOKEN`: Token da API do Cloudflare.
- `CF_ZONE_ID`: Zone ID do Cloudflare.
- `RECORD_NAME`: Nome do registro DNS (ex: www).
- `RECORD_CONTENT`: Conteúdo do registro DNS (ex: seu-projeto.vercel.app).
- `VERCEL_TOKEN`: Token de acesso da API Vercel.
- `VERCEL_PROJECT_ID`: ID do projeto Vercel.
- `RAILWAY_API_TOKEN`: Token de acesso da API Railway.
- `RAILWAY_PROJECT_ID`: ID do projeto Railway.

---

## Como usar

1. Configure as variáveis de ambiente conforme seu ambiente.
2. Execute o script principal para deploy completo:

```bash
bash deploy-scripts/full-deploy.sh
```

---

## Validação das variáveis

O script `full-deploy.sh` valida se as variáveis essenciais estão definidas antes de executar cada etapa. Se alguma variável estiver faltando, o script exibirá uma mensagem de erro e interromperá a execução.

---

## Requisitos

- `curl` e `jq` instalados para chamadas API e manipulação JSON.
- Acesso à internet para comunicação com APIs e hospedagens.
- Credenciais válidas para Vercel, Railway, Heroku e Cloudflare.

---

## Suporte

Para dúvidas ou personalizações adicionais, entre em contato com o responsável pelo projeto.

---
