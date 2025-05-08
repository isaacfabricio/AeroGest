# Documentação do Frontend - AeroGest

## Visão Geral

O frontend do AeroGest é construído com Next.js (React) e utiliza as seguintes principais dependências:

- next: Framework React para aplicações web.
- react e react-dom: Biblioteca React para construção de interfaces.
- @prisma/client: ORM para comunicação com o banco de dados.
- dotenv: Gerenciamento de variáveis de ambiente.
- node-fetch: Para requisições HTTP.

## Scripts npm

- `npm run dev`: Inicia o servidor de desenvolvimento Next.js.
- `npm run build`: Compila o projeto para produção.
- `npm run start`: Inicia o servidor Next.js em modo produção.

## Arquitetura

- `components/`: Componentes React reutilizáveis, como botões e contadores.
- `pages/`: Páginas da aplicação, que correspondem às rotas do Next.js.
- `styles/`: Arquivos CSS para estilização.
- Integração com backend FastAPI para execução de circuitos quânticos via API REST.

## Integração Frontend e Backend

- O frontend consome a API REST do backend FastAPI para executar circuitos quânticos, visualizar resultados e gerenciar histórico.
- As requisições são feitas usando `node-fetch` ou outras bibliotecas HTTP.
- O backend está disponível em uma porta separada (ex: 3002) e o frontend pode ser configurado para proxy ou chamadas diretas.

## Como Rodar o Frontend

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse a aplicação em `http://localhost:3000`.

## Testes

- O projeto utiliza Vitest para testes unitários e de integração.
- Os testes devem ser colocados em arquivos com extensão `.test.js` ou `.spec.js` dentro das pastas `components/` ou `pages/`.

## Sugestões para Desenvolvimento

- Configurar ESLint e Prettier para manter a qualidade e padronização do código.
- Implementar testes unitários e de integração para componentes e páginas.
- Documentar componentes e páginas para facilitar manutenção.
