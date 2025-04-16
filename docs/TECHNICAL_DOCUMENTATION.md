# Documentação Técnica - AeroGestAviation

## Visão Geral da Arquitetura

O sistema AeroGestAviation é composto por três principais módulos:

- **Frontend**: Aplicação Next.js que fornece a interface do usuário para gerenciamento de voos.
- **Backend**: API Node.js com Express que expõe endpoints REST para manipulação dos dados de voos.
- **Pacote Compartilhado**: Código reutilizável entre frontend e backend, localizado em `packages/shared`.

A comunicação entre frontend e backend ocorre via chamadas HTTP REST.

## Fluxo de Dados

1. O usuário interage com a interface no frontend.
2. O frontend realiza requisições HTTP para a API backend para obter ou modificar dados.
3. O backend processa as requisições, interage com o banco de dados e retorna respostas JSON.
4. O frontend atualiza a interface com os dados recebidos.

## Decisões Técnicas

- **Monorepo com Turborepo**: Facilita o gerenciamento e build dos múltiplos pacotes.
- **TypeScript**: Garantia de tipagem estática para maior robustez.
- **Vitest**: Framework de testes leve e rápido para frontend e backend.
- **Middleware de tratamento de erros centralizado**: Para padronizar respostas de erro e facilitar o debug.
- **Next.js no frontend**: Framework React com SSR para melhor performance e SEO.

## Documentação da API

### Endpoint: GET /flights

Retorna a lista de voos cadastrados.

**Resposta de sucesso (200):**

```json
[
  {
    "_id": "123",
    "number": "AB123",
    "origin": "GRU",
    "destination": "JFK",
    "status": "Em voo",
    "passengers": 100,
    "departureTime": "10:00",
    "arrivalTime": "14:00"
  }
]
```

### Endpoint: GET /api/health

Retorna o status do servidor.

**Resposta de sucesso (200):**

```json
{
  "status": "ok"
}
```

## Como Executar os Testes

- No backend:

```bash
cd apps/backend
vitest
```

- No frontend:

```bash
cd apps/frontend
vitest
```

## Considerações Finais

Esta documentação deve ser mantida atualizada conforme o sistema evolui. Para dúvidas ou contribuições, consulte as diretrizes no README principal.
