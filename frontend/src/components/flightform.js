// filepath: frontend/src/components/FlightForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightForm = ({ onSuccess }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/flights`, {
        flightNumber,
        departure,
        arrival,
        date,
      });
      onSuccess(); // Atualiza a lista de voos
      toast.success('Voo criado com sucesso!');
    } catch (error) {
      toast.error('Erro ao criar voo!');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Número do Voo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Número do Voo"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Partida</label>
          <input
            type="text"
            className="form-control"
            placeholder="Partida"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Chegada</label>
          <input
            type="text"
            className="form-control"
            placeholder="Chegada"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Data</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Criar Voo</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default FlightForm;