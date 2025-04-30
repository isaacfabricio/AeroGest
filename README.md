# AeroGest - Sistema de Gerenciamento de Voos

## Descrição
Sistema completo para gestão de operações aeroportuárias, incluindo controle de voos, monitoramento em tempo real e integração com sistemas externos.

---

## Instalação

### Backend
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd AeroGest/sistema-unificado/backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente criando um arquivo `.env` com as seguintes variáveis:
   ```
   DB_URL=<sua-string-de-conexao-mongodb>
   PORT=3001
   ALLOWED_ORIGINS=http://localhost:3000,https://seu-dominio.com
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

### Frontend
1. Navegue até o diretório frontend:
   ```bash
   cd AeroGest/sistema-gerenciamento-voos-frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure a variável de ambiente para a URL da API criando um arquivo `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```
4. Inicie o frontend:
   ```bash
   npm run dev
   ```

---

## Documentação da API Backend

A API possui as seguintes rotas principais:

- `GET /flights` - Lista todos os voos (requer autenticação)
- `POST /flights` - Cria um novo voo (requer autenticação)
- `PUT /flights/:id` - Atualiza um voo existente (requer autenticação)
- `DELETE /flights/:id` - Remove um voo (requer autenticação)
- `GET /weather` - Retorna dados meteorológicos

### Exemplo de requisição para criar voo

```bash
POST /flights
Content-Type: application/json
Authorization: Bearer <token>

{
  "flightNumber": "AB123",
  "origin": "São Paulo",
  "destination": "Rio de Janeiro",
  "departureTime": "2024-06-01T10:00:00Z",
  "arrivalTime": "2024-06-01T11:00:00Z",
  "status": "Em voo",
  "passengers": 150
}
```

---

## Guia de Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature ou correção: `git checkout -b minha-feature`.
3. Faça commits claros e descritivos.
4. Envie um pull request detalhando as mudanças.

---

## Variáveis de Ambiente

| Variável          | Descrição                                  | Exemplo                              |
|-------------------|--------------------------------------------|------------------------------------|
| DB_URL            | String de conexão com o MongoDB            | mongodb://usuario:senha@host:porta |
| PORT              | Porta onde o backend será executado        | 3001                               |
| ALLOWED_ORIGINS   | Domínios permitidos para CORS (separados por vírgula) | http://localhost:3000,https://seu-dominio.com |
| NEXT_PUBLIC_API_URL | URL da API para o frontend consumir       | http://localhost:3001               |

---

## Testes

### Backend

- Testes unitários para funções críticas usando Jest.
- Testes de integração para rotas e middlewares.
- Testes end-to-end (E2E) com Cypress para fluxos principais.

### Frontend

- Testes unitários para componentes React com React Testing Library.
- Testes de integração para interações entre componentes.
- Testes E2E com Cypress simulando uso real.

### Integração Contínua (CI)

- Configuração para rodar testes automaticamente em cada commit e pull request.
- Monitoramento da cobertura de testes para garantir qualidade.

---

## Ferramentas Recomendadas para Testes

- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress](https://www.cypress.io/)
- [Swagger](https://swagger.io/) para documentação interativa da API

---

## Comentários no Código

- Comentários explicativos foram adicionados em trechos complexos para facilitar a manutenção e entendimento.
- Recomenda-se manter o padrão de comentários para futuras contribuições.

---

## Contato

Para dúvidas ou sugestões, abra uma issue ou entre em contato com os mantenedores do projeto.
