# Uso dos Containers Docker no Projeto AeroGest

## Pré-requisitos
- Docker instalado na máquina
- Docker Compose instalado

## Rodando o ambiente local com Docker Compose

1. Clone o repositório e navegue até a raiz do projeto.

2. Crie um arquivo `.env` baseado no `.env.example` e configure as variáveis de ambiente.

3. Execute o comando para subir os containers:
```bash
docker-compose up --build
```

4. O backend estará disponível em `http://localhost:3001` e o frontend em `http://localhost:3000`.

5. Para parar os containers:
```bash
docker-compose down
```

## Comandos úteis

- Para rodar o backend isoladamente:
```bash
docker build -t aerogest-backend ./AeroGest/sistema-unificado/backend
docker run -p 3001:3001 --env-file .env aerogest-backend
```

- Para rodar o frontend isoladamente:
```bash
docker build -t aerogest-frontend ./AeroGest/sistema-gerenciamento-voos-frontend
docker run -p 3000:3000 aerogest-frontend
```

## Logs e Debug

- Para visualizar logs dos containers:
```bash
docker-compose logs -f
```

- Para acessar o shell de um container:
```bash
docker exec -it <container_name> sh
```

---

# Configuração Kubernetes para Produção

## Estrutura básica

- Crie arquivos YAML para Deployment, Service e ConfigMap para backend, frontend e banco de dados.
- Utilize Secrets para variáveis sensíveis como `ACCESS_TOKEN_SECRET`.
- Configure Ingress para roteamento HTTP/HTTPS.
- Configure Persistent Volumes para o banco de dados.

## Exemplo simplificado de Deployment para backend

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aerogest-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: aerogest-backend
  template:
    metadata:
      labels:
        app: aerogest-backend
    spec:
      containers:
      - name: backend
        image: seu-registro/aerogest-backend:latest
        ports:
        - containerPort: 3001
        envFrom:
        - secretRef:
            name: aerogest-secrets
```

## Deploy

- Use `kubectl apply -f <arquivo.yaml>` para aplicar as configurações.
- Configure Horizontal Pod Autoscaler para escalabilidade automática.
- Monitore pods e serviços com `kubectl get pods` e `kubectl get svc`.

---

# Integração com Sentry para Monitoramento

## Backend

1. Instale o SDK do Sentry:
```bash
npm install @sentry/node
```

2. Configure no backend (`server.js`):

```js
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

3. Adicione a variável de ambiente `SENTRY_DSN` com o DSN do seu projeto Sentry.

## Frontend

1. Instale o SDK do Sentry para React:
```bash
npm install @sentry/react @sentry/tracing
```

2. Configure no frontend (`_app.tsx` ou equivalente):

```tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

3. Adicione a variável de ambiente `NEXT_PUBLIC_SENTRY_DSN`.

## Benefícios

- Captura automática de erros e exceções.
- Rastreamento de performance.
- Alertas configuráveis para falhas críticas.

---

Se desejar, posso ajudar a criar os arquivos YAML para Kubernetes ou scripts de integração com Sentry.
