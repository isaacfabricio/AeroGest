import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
});

export const flightService = {
    // Busca todos os voos
    getAllFlights: async () => {
        const response = await api.get('/flights');
        return response.data;
    },

    // Busca um voo pelo ID
    getFlightById: async (id) => {
        const response = await api.get(`/flights/${id}`);
        return response.data;
    },

    // Cria um novo voo
    createFlight: async (flightData) => {
        const response = await api.post('/flights', flightData);
        return response.data;
    },

    // Atualiza um voo existente
    updateFlight: async (id, flightData) => {
        const response = await api.put(`/flights/${id}`, flightData);
        return response.data;
    },

    // Remove um voo
    deleteFlight: async (id) => {
        const response = await api.delete(`/flights/${id}`);
        return response.data;
    },

    // Reserva assentos em um voo
    reserveSeats: async (id, quantity) => {
        const response = await api.post(`/flights/${id}/reserve`, { quantity });
        return response.data;
    }
};

export default api;
