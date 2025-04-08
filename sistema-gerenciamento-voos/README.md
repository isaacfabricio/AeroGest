# AeroGest - Sistema de Gerenciamento de Voos

## Backend API

### Pré-requisitos
- Node.js v16+
- MongoDB
- NPM

### Configuração
1. Instale as dependências:
```bash
cd backend
npm install
```

2. Configure o arquivo .env:
```
DB_URL=mongodb://localhost:27017/aerogest
PORT=3001
```

3. Inicie o servidor:
```bash
npm run dev
```

### Endpoints
- GET `/flights` - Lista todos os voos
- POST `/flights` - Cria novo voo
- PUT `/flights/:id` - Atualiza voo existente
- DELETE `/flights/:id` - Remove voo

### Desenvolvimento
O servidor reinicia automaticamente com nodemon durante o desenvolvimento.
