import React, { useState, useEffect } from 'react';
import './FlightForm.css';

const FlightForm = ({ flight, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        flightNumber: '',
        origin: '',
        destination: '',
        departureDate: '',
        capacity: '',
        price: '',
        status: 'scheduled'
    });

    useEffect(() => {
        if (flight) {
            setFormData({
                ...flight,
                departureDate: new Date(flight.departureDate)
                    .toISOString()
                    .slice(0, 16)
            });
        }
    }, [flight]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            capacity: Number(formData.capacity),
            price: Number(formData.price)
        });
    };

    return (
        <form className="flight-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="flightNumber">Número do Voo</label>
                <input
                    type="text"
                    id="flightNumber"
                    name="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="origin">Origem</label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="destination">Destino</label>
                    <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="departureDate">Data de Partida</label>
                    <input
                        type="datetime-local"
                        id="departureDate"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="scheduled">Agendado</option>
                        <option value="delayed">Atrasado</option>
                        <option value="cancelled">Cancelado</option>
                        <option value="completed">Concluído</option>
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="capacity">Capacidade</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn-submit">
                    {flight ? 'Atualizar' : 'Criar'} Voo
                </button>
            </div>
        </form>
    );
};

export default FlightForm;
