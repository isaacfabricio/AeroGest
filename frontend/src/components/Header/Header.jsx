import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="header-nav">
                <div className="header-logo">
                    ✈️ Sistema de Voos
                </div>
                <ul className="header-menu">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/flights">Voos</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
