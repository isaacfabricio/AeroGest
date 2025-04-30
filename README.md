# AeroGest

Sistema completo para gestão de operações aeroportuárias, incluindo:

- Controle de voos
- Monitoramento em tempo real
- Integração com sistemas externos

## Como rodar o projeto

### Backend

1. Configure as variáveis de ambiente no arquivo `.env`:
   - `PORT`: Porta onde o servidor irá rodar (exemplo: 3001)
   - `DB_URL`: URL de conexão com o MongoDB

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor:
   ```
   npm start
   ```

### Frontend

1. Navegue até a pasta do frontend:
   ```
   cd AeroGest/sistema-gerenciamento-voos-frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o frontend:
   ```
   npm run dev
   ```

## Testes

Para rodar os testes do backend:
```
npm test
```

## Observações

- Certifique-se de que o MongoDB está rodando e acessível pela URL configurada.
- O backend está configurado para rodar na porta definida na variável de ambiente `PORT`.
- Apenas uma porta está aberta para o servidor Express, garantindo segurança e simplicidade.
