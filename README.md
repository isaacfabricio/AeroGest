# AeroGestAviation

Sistema unificado de gerenciamento de voos

## Estrutura do Projeto

```
AeroGestAviation/
├── apps/
│   ├── frontend/       # Aplicação Next.js
│   └── backend/        # API Node.js
├── packages/
│   └── shared/         # Código compartilhado
├── package.json        # Configurações do monorepo
├── turbo.json          # Configurações de build
└── tsconfig.json       # Configurações TypeScript
```

## Pré-requisitos

- Node.js 18+
- Yarn 1.22+ ou npm 8+
- Docker (opcional para bancos de dados)

## Setup

1. Instalar dependências:
```bash
yarn install
```

2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
```

3. Iniciar aplicação em desenvolvimento:
```bash
yarn dev
```

## Comandos Úteis

| Comando       | Descrição                          |
|---------------|------------------------------------|
| `yarn build`  | Build de todos os pacotes          |
| `yarn test`   | Executa testes em todos os pacotes |
| `yarn lint`   | Executa lint em todo o código      |
| `yarn start`  | Inicia aplicação em produção       |

## Contribuição

1. Crie um branch para sua feature:
```bash
git checkout -b feature/nova-feature
```

2. Faça commit das alterações:
```bash
git commit -m "Adiciona nova feature"
```

3. Envie para o repositório remoto:
```bash
git push origin feature/nova-feature
