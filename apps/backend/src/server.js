require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(bodyParser.json());

const errorHandler = require('./middlewares/errorHandler');

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Middleware de tratamento de erros (deve ser o último middleware)
app.use(errorHandler);

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
