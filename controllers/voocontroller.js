const express = require('express');
const router = express.Router();
const Voo = require('../models/voo.js');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
  const voos = await Voo.find();
  res.json(voos);
});

router.post('/', async (req, res) => {
  const { origem, destino, duracao, horario } = req.body;

  // Validação do horário
  if (!dayjs(horario, 'HH:mm', true).isValid()) {
      return res.status(400).json({ error: 'Horário inválido! Use o formato HH:mm.' });
  }

  // Validação de intervalo
  const inicio = '06:00';
  const fim = '23:00';
  if (!dayjs(horario, 'HH:mm').isBetween(dayjs(inicio, 'HH:mm'), dayjs(fim, 'HH:mm'))) {
      return res.status(400).json({ error: 'Horário fora do intervalo permitido!' });
  }

  const voo = new Voo(req.body);
  await voo.save();
  res.status(201).json({ message: 'Voo criado com sucesso!', voo });
});

router.put('/:id', async (req, res) => {
  const voo = await Voo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(voo);
});

router.delete('/:id', async (req, res) => {
  await Voo.findByIdAndRemove(req.params.id);
  res.json({ message: 'Voo deletado com sucesso' });
});

module.exports = router;
