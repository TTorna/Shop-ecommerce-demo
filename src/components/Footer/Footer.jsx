import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ openUserModal }) => {
  return (
    <footer className="footer-wrapper">
      <div className="newsletter-section">
        <h2 className="text-h2 newsletter-title">ÚNETE Y CONSIGUE 10% DE DESCUENTO EN TU PRIMERA COMPRA MAYORISTA</h2>
        <button className="btn-primary newsletter-btn" onClick={openUserModal}>REGÍSTRATE GRATIS</button>
      </div>
      
      <div className="main-footer">
        <div className="footer-grid">
          <div className="footer-column">
            <h3>PRODUCTOS</h3>
            <ul className="footer-links">
              <li><Link to="/catalogo">Jeans Hombre</Link></li>
              <li><Link to="/catalogo">Jeans Mujer</Link></li>
              <li><Link to="/catalogo">Chaquetas</Link></li>
              <li><Link to="/catalogo">Shorts</Link></li>
              <li><Link to="/catalogo">Sale</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>MAYORISTAS</h3>
            <ul className="footer-links">
              <li><Link to="/">¿Cómo Comprar?</Link></li>
              <li><Link to="/">Preguntas Frecuentes</Link></li>
              <li><Link to="/">Envíos y Entregas</Link></li>
              <li><Link to="/">Métodos de Pago</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>ACERCA DE MOZAIKO</h3>
            <ul className="footer-links">
              <li><Link to="/">Nuestra Historia</Link></li>
              <li><Link to="/">Calidad Denim</Link></li>
              <li><Link to="/">Sustentabilidad</Link></li>
              <li><Link to="/">Trabaja con Nosotros</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>SÍGUENOS</h3>
            <ul className="footer-links">
              <li><a href="https://www.instagram.com/mozaiko.denim/?hl=es" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><Link to="/">Facebook</Link></li>
              <li><Link to="/">TikTok</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bottom-footer">
        <ul className="bottom-footer-links">
          <li><Link to="/">Configuración de las cookies</Link></li>
          <li><Link to="/">Nuestros Datos</Link></li>
          <li><Link to="/">Términos y Condiciones</Link></li>
          <li><Link to="/">Política de Privacidad</Link></li>
        </ul>
        <p>© 2026 Mozaiko Denim. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
