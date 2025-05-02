# Guia Completo para Organização, Teste e Deploy do Projeto AeroGest

Este guia detalha os passos para organizar os arquivos no VS Code, testar localmente, registrar domínio (opcional), escolher provedor de hospedagem, fazer upload, configurar MongoDB Atlas, conectar domínio com HTTPS e testar o site.

---

## 1. Organização dos Arquivos no VS Code

O projeto AeroGest está dividido em duas partes principais:

- **Backend:** localizado em `AeroGest/sistema-unificado/backend`
- **Frontend:** localizado em `AeroGest/sistema-gerenciamento-voos-frontend`
- **Scripts de Deploy:** localizados em `deploy-scripts/`

Recomenda-se abrir essas pastas principais no VS Code para facilitar a navegação e edição.

---

## 2. Teste Local

### Backend

1. Navegue até o diretório do backend:
   ```bash
   cd AeroGest/sistema-unificado/backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` com as variáveis de ambiente necessárias:
   ```
   DB_URL=<string de conexão MongoDB Atlas>
   PORT=3001
   ALLOWED_ORIGINS=http://localhost:3000,https://seu-dominio.com
   ACCESS_TOKEN_SECRET=<chave secreta JWT>
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Para rodar os testes:
   ```bash
   npm test
   ```

### Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd AeroGest/sistema-gerenciamento-voos-frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env.local` com a variável de ambiente:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
4. Inicie o frontend:
   ```bash
   npm run dev
   ```
5. Para rodar os testes:
   ```bash
   npm test
   ```

---

## 3. Registro de Domínio (Opcional)

Para registrar um domínio, você pode usar serviços populares como:

- Registro.br (para domínios .br)
- GoDaddy
- Namecheap
- Google Domains

Após registrar, você terá acesso ao painel para configurar DNS.

---

## 4. Escolha do Provedor de Hospedagem

- **Frontend estático:** Netlify ou Vercel (o projeto já possui scripts para deploy no Vercel)
- **Backend dinâmico:** Hostinger, Render, Railway, Heroku (existem scripts para Railway e Heroku)

---

## 5. Upload e Deploy

Utilize os scripts localizados em `deploy-scripts/` para facilitar o deploy:

- `deploy-frontend.sh`: deploy do frontend no Vercel
- `deploy-backend-railway.sh`: deploy do backend na Railway
- `deploy-backend-heroku.sh`: deploy do backend na Heroku
- `configure-dns-cloudflare.sh`: configuração DNS via Cloudflare
- `activate-ssl-vercel.sh`: ativação de SSL no Vercel
- `full-deploy.sh`: script principal que integra todos os passos acima

Antes de executar, configure as variáveis de ambiente necessárias (exemplo no `deploy-scripts/README.md`).

Para executar o deploy completo:
```bash
bash deploy-scripts/full-deploy.sh
```

---

## 6. Configuração do MongoDB Atlas

1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Crie um cluster gratuito.
3. Configure o acesso de rede (Whitelist) para permitir conexões do seu backend.
4. Crie um usuário com permissões para o banco.
5. Copie a string de conexão e configure no arquivo `.env` do backend (`DB_URL`).

---

## 7. Conexão do Domínio e HTTPS

- Configure os registros DNS no painel do seu provedor de domínio ou use o script `configure-dns-cloudflare.sh` se usar Cloudflare.
- Ative o SSL para seu domínio usando o script `activate-ssl-vercel.sh` para Vercel ou verifique o status no Railway com `check-ssl-railway.sh`.
- Certifique-se que o domínio está apontando corretamente para o frontend e backend.

---

## 8. Teste do Site e Resolução de Problemas

- Acesse o site pelo domínio configurado.
- Teste as funcionalidades principais (login, listagem de voos, criação, atualização, exclusão).
- Verifique no console do navegador e logs do backend por erros.
- Para erros 404, verifique rotas e configurações de build.
- Para falhas de conexão, confirme URLs, variáveis de ambiente e permissões de rede.
- Consulte os logs do backend para detalhes de erros.

---

Este guia cobre o fluxo completo para organizar, testar e publicar o projeto AeroGest com domínio e HTTPS ativos.
