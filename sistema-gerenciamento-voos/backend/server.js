import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conexão com o MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { getFlights, createFlight, updateFlight, deleteFlight } from './flightscontrollers.js';
import cors from 'cors';

// Configura CORS
app.use(cors());

// Rotas de voos
app.get('/flights', getFlights);
app.post('/flights', createFlight);
app.put('/flights/:id', updateFlight);
app.delete('/flights/:id', deleteFlight);

// Rota de saúde
app.get('/', (req, res) => {
  res.send('Servidor de gerenciamento de voos funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});