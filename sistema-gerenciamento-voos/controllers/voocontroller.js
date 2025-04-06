// controllers/VooController.js
const express = require('express');
const router = express.Router();
const Voo = require('../models/voo.js');
const dayjs = require('dayjs');

// Função para validar o formato do horário
const validarHorario = (horario) => {
    const formatoValido = dayjs(horario, 'HH:mm', true).isValid(); // Valida o formato HH:mm
    return formatoValido;
};

// Função para verificar se o horário está dentro de um intervalo permitido
const validarIntervaloHorario = (horario, inicio, fim) => {
    const horarioAtual = dayjs(horario, 'HH:mm');
    const horarioInicio = dayjs(inicio, 'HH:mm');
    const horarioFim = dayjs(fim, 'HH:mm');

    return horarioAtual.isAfter(horarioInicio) && horarioAtual.isBefore(horarioFim);
};

router.get('/', async (req, res) => {
  const voos = await Voo.find();
  res.json(voos);
});

// Endpoint para criar um voo
router.post('/voos', (req, res) => {
    const { origem, destino, duracao, horario } = req.body;

    // Validação do horário
    if (!dayjs(horario, 'HH:mm', true).isValid()) {
        return res.status(400).json({ error: 'Horário inválido! Use o formato HH:mm.' });
    }

    // Validação de intervalo (opcional)
    const inicio = '06:00';
    const fim = '23:00';
    if (!dayjs(horario, 'HH:mm').isBetween(dayjs(inicio, 'HH:mm'), dayjs(fim, 'HH:mm'))) {
        return res.status(400).json({ error: 'Horário fora do intervalo permitido!' });
    }

    // Se tudo estiver válido, prossiga com a criação do voo
    res.status(201).json({ message: 'Voo criado com sucesso!', voo: { origem, destino, duracao, horario } });
});

router.post('/', async (req, res) => {
  const voo = new Voo(req.body);
  await voo.save();
  res.json(voo);
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
