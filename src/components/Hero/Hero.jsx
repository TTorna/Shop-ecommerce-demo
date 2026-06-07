import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-container">
      <img 
        src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=2574&auto=format&fit=crop" 
        alt="Mozaiko Denim Collection" 
        className="hero-image"
      />
      <div className="hero-overlay">
        <div className="hero-content container">
          <h1 className="hero-title">TU SOCIO EN DENIM<br />VENTA MAYORISTA</h1>
          <p className="hero-subtitle">Calidad premium para locales y revendedores. Armá tu pedido hoy mismo con envíos a todo el país.</p>
          <div className="hero-actions">
            <Link to="/catalogo" className="btn-primary hero-btn-main">VER COLECCIÓN</Link>
            <a href="#beneficios-b2b" className="btn-outline-white hero-btn-secondary">CÓMO COMPRAR</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
