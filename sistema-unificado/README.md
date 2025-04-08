# AeroGest - Sistema de Gerenciamento de Voos

## Descrição
Sistema completo para gestão de operações aeroportuárias, incluindo:

- Controle de voos
- Monitoramento em tempo real
- Integração com sistemas terceiros
- API RESTful para integrações

## Tecnologias Utilizadas
- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
- **Frontend**:
  - React
  - Redux
- **Ferramentas**:
  - Swagger (documentação)
  - Mocha/Chai (testes)
  - Prometheus (monitoramento)

## Instalação
1. Clone o repositório:
```bash
git clone https://github.com/crazydog22/AeroGest.git
cd AeroGest/sistema-unificado
```

2. Instale as dependências:
```bash
cd backend
npm install
```

3. Configure o ambiente:
```bash
cp .env.example .env
# Edite o .env com suas configurações
```

4. Inicie o servidor:
```bash
npm start
```

## Documentação da API
A API está documentada usando Swagger. Acesse:
```
http://localhost:3000/api-docs
```

## Testes
Para executar os testes automatizados:
```bash
npm test
```

## Monitoramento
Métricas disponíveis em:
```
http://localhost:3000/metrics
```

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).
