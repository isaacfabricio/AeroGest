import React, { useState, useEffect } from 'react';
import { flightService } from '../../services/api';
import FlightTable from '../../components/FlightTable/FlightTable';
import FlightForm from '../../components/FlightForm/FlightForm';
import './Flights.css';

const Flights = () => {
    const [flights, setFlights] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carrega a lista de voos
    const loadFlights = async () => {
        try {
            setLoading(true);
            const data = await flightService.getAllFlights();
            setFlights(data);
            setError(null);
        } catch (err) {
            setError('Erro ao carregar voos. Por favor, tente novamente.');
            console.error('Erro ao carregar voos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFlights();
    }, []);

    // Manipula a criação de um novo voo
    const handleCreate = async (flightData) => {
        try {
            await flightService.createFlight(flightData);
            await loadFlights();
            setShowForm(false);
            alert('Voo criado com sucesso!');
        } catch (err) {
            alert('Erro ao criar voo: ' + err.message);
        }
    };

    // Manipula a atualização de um voo
    const handleUpdate = async (flightData) => {
        try {
            await flightService.updateFlight(selectedFlight._id, flightData);
            await loadFlights();
            setShowForm(false);
            setSelectedFlight(null);
            alert('Voo atualizado com sucesso!');
        } catch (err) {
            alert('Erro ao atualizar voo: ' + err.message);
        }
    };

    // Manipula a exclusão de um voo
    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este voo?')) {
            try {
                await flightService.deleteFlight(id);
                await loadFlights();
                alert('Voo excluído com sucesso!');
            } catch (err) {
                alert('Erro ao excluir voo: ' + err.message);
            }
        }
    };

    // Abre o formulário para edição
    const handleEdit = (flight) => {
        setSelectedFlight(flight);
        setShowForm(true);
    };

    return (
        <div className="flights-page">
            <div className="flights-header">
                <h1>Gerenciamento de Voos</h1>
                <button
                    className="btn-add"
                    onClick={() => {
                        setSelectedFlight(null);
                        setShowForm(true);
                    }}
                >
                    Adicionar Voo
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Carregando...</div>
            ) : showForm ? (
                <FlightForm
                    flight={selectedFlight}
                    onSubmit={selectedFlight ? handleUpdate : handleCreate}
                    onCancel={() => {
                        setShowForm(false);
                        setSelectedFlight(null);
                    }}
                />
            ) : (
                <FlightTable
                    flights={flights}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Flights;
