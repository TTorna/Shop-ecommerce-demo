import React from 'react';
import { MessageCircle, UserPlus } from 'lucide-react';
import './WholesaleBanner.css';

const WholesaleBanner = () => {
  return (
    <section className="wholesale-banner-section">
      <div className="container">
        <div className="wb-content">
          <h2 className="wb-title">¿AÚN NO SOS CLIENTE MAYORISTA?</h2>
          <p className="wb-desc">Accedé a precios exclusivos, stock asegurado y atención personalizada para potenciar tu local.</p>
          <div className="wb-actions">
            <button className="btn-secondary wb-btn" onClick={() => document.querySelector('.user-btn').click()}>
              <UserPlus size={20} /> REGISTRARSE
            </button>
            <a href="https://wa.me/123456789" target="_blank" rel="noreferrer" className="btn-outline-white wb-btn wb-whatsapp">
              <MessageCircle size={20} /> CONTACTO WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleBanner;
