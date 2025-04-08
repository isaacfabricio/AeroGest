import React from 'react';
import './FlightTable.css';

const FlightTable = ({ flights, onEdit, onDelete }) => {
    return (
        <div className="flight-table-container">
            <table className="flight-table">
                <thead>
                    <tr>
                        <th>Número do Voo</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Data de Partida</th>
                        <th>Assentos Disponíveis</th>
                        <th>Preço</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight) => (
                        <tr key={flight._id}>
                            <td>{flight.flightNumber}</td>
                            <td>{flight.origin}</td>
                            <td>{flight.destination}</td>
                            <td>{new Date(flight.departureDate).toLocaleString()}</td>
                            <td>{flight.availableSeats}/{flight.capacity}</td>
                            <td>R$ {flight.price.toFixed(2)}</td>
                            <td>
                                <span className={`status-badge status-${flight.status}`}>
                                    {flight.status}
                                </span>
                            </td>
                            <td className="actions">
                                <button
                                    className="btn-edit"
                                    onClick={() => onEdit(flight)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn-delete"
                                    onClick={() => onDelete(flight._id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FlightTable;
