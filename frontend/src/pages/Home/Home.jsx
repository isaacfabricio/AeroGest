import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Sistema de Gerenciamento de Voos</h1>
                <p>Gerencie seus voos de forma simples e eficiente</p>
                <a href="/flights" className="cta-button">
                    Ver Voos
                </a>
            </section>

            <section className="features">
                <h2>Recursos</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">✈️</span>
                        <h3>Gerenciamento de Voos</h3>
                        <p>Cadastre e gerencie voos facilmente</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🌤️</span>
                        <h3>Informações do Clima</h3>
                        <p>Acompanhe as condições climáticas do destino</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🎫</span>
                        <h3>Reservas</h3>
                        <p>Sistema de reserva de assentos integrado</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">📊</span>
                        <h3>Relatórios</h3>
                        <p>Acompanhe estatísticas e relatórios</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
