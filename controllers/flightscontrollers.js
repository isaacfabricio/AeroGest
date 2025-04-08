// filepath: backend/controllers/FlightsController.js
import { getFlights as getFlightsService, createFlight, updateFlight, deleteFlight } from '../services/FlightsService';

export const getFlightsController = async (req, res) => {
  try {
    const flights = await getFlightsService();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar voos' });
  }
};

export const createFlightController = async (req, res) => {
  try {
    const flight = await createFlight(req.body);
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar voo' });
  }
};

export const updateFlightController = async (req, res) => {
  try {
    const flight = await updateFlight(req.params.id, req.body);
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar voo' });
  }
};

export const deleteFlightController = async (req, res) => {
  try {
    await deleteFlight(req.params.id);
    res.json({ message: 'Voo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar voo' });
  }
};
