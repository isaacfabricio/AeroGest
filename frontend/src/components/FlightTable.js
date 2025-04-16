// filepath: frontend/src/components/FlightTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightTable = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/flights`);
        setFlights(response.data);
      } catch (error) {
        alert('Erro ao carregar voos!');
      }
    };
    fetchFlights();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Número do Voo</th>
          <th>Partida</th>
          <th>Chegada</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <tr key={flight._id}>
            <td>{flight.flightNumber}</td>
            <td>{flight.departure}</td>
            <td>{flight.arrival}</td>
            <td>{new Date(flight.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;