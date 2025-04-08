import React, { useState } from 'react';
import SeatMap from '../SeatMap/SeatMap';
import './ReservationForm.css';

const ReservationForm = ({ flight, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        passengerName: '',
        passengerEmail: '',
        passengerDocument: '',
        seatNumber: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpa o erro do campo quando o usuário começa a digitar
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSeatSelect = (seatNumber) => {
        setFormData(prev => ({
            ...prev,
            seatNumber
        }));
        if (errors.seatNumber) {
            setErrors(prev => ({
                ...prev,
                seatNumber: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.passengerName.trim()) {
            newErrors.passengerName = 'Nome é obrigatório';
        }

        if (!formData.passengerEmail.trim()) {
            newErrors.passengerEmail = 'E-mail é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.passengerEmail)) {
            newErrors.passengerEmail = 'E-mail inválido';
        }

        if (!formData.passengerDocument.trim()) {
            newErrors.passengerDocument = 'Documento é obrigatório';
        }

        if (!formData.seatNumber) {
            newErrors.seatNumber = 'Selecione um assento';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="reservation-form">
            <h2>Nova Reserva</h2>
            <div className="flight-info">
                <p><strong>Voo:</strong> {flight.flightNumber}</p>
                <p><strong>Origem:</strong> {flight.origin}</p>
                <p><strong>Destino:</strong> {flight.destination}</p>
                <p><strong>Data:</strong> {new Date(flight.departureDate).toLocaleString()}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="passengerName">Nome Completo</label>
                    <input
                        type="text"
                        id="passengerName"
                        name="passengerName"
                        value={formData.passengerName}
                        onChange={handleInputChange}
                        className={errors.passengerName ? 'error' : ''}
                    />
                    {errors.passengerName && <span className="error-message">{errors.passengerName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="passengerEmail">E-mail</label>
                    <input
                        type="email"
                        id="passengerEmail"
                        name="passengerEmail"
                        value={formData.passengerEmail}
                        onChange={handleInputChange}
                        className={errors.passengerEmail ? 'error' : ''}
                    />
                    {errors.passengerEmail && <span className="error-message">{errors.passengerEmail}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="passengerDocument">Documento (CPF/RG)</label>
                    <input
                        type="text"
                        id="passengerDocument"
                        name="passengerDocument"
                        value={formData.passengerDocument}
                        onChange={handleInputChange}
                        className={errors.passengerDocument ? 'error' : ''}
                    />
                    {errors.passengerDocument && <span className="error-message">{errors.passengerDocument}</span>}
                </div>

                <div className="form-group">
                    <label>Selecione seu Assento</label>
                    <SeatMap
                        totalSeats={flight.totalSeats}
                        reservedSeats={flight.reservedSeats}
                        selectedSeat={formData.seatNumber}
                        onSeatSelect={handleSeatSelect}
                    />
                    {errors.seatNumber && <span className="error-message">{errors.seatNumber}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn-submit">
                        Confirmar Reserva
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReservationForm;
