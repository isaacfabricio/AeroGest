import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Sistema de Gerenciamento de Voos. Todos os direitos reservados.</p>
                <div className="footer-links">
                    <a href="/about">Sobre</a>
                    <a href="/contact">Contato</a>
                    <a href="/privacy">Privacidade</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
