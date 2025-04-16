import axios from 'axios';

const apiKey = '13131456553ff7bedc2c82a94b142220'; // Substitua pela sua chave de API do OpenWeatherMap

export const buscarClima = async (cidade) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados do clima:', error);
        throw error;
    }
};

const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');

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

module.exports = router;