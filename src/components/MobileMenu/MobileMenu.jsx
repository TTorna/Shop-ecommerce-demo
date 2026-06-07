import React from 'react';
import { X, User, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, openLogin, openWishlist, openCart }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`mobile-menu-panel ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo" style={{ fontSize: '24px' }} onClick={onClose}>MOZAIKO <span>DENIM</span></Link>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <nav className="mobile-nav">
          <Link to="/catalogo" className="mobile-nav-link" onClick={onClose}>Hombre</Link>
          <Link to="/catalogo" className="mobile-nav-link" onClick={onClose}>Mujer</Link>
          <Link to="/catalogo" className="mobile-nav-link highlight" onClick={onClose}>Sale</Link>
          <Link to="/catalogo" className="mobile-nav-link" onClick={onClose}>Packs Mayoristas</Link>
        </nav>
        
        <div className="mobile-menu-footer">
          <button className="mobile-action-btn" onClick={() => { onClose(); openLogin(); }}>
            <User size={20} /> Mi Cuenta
          </button>
          <button className="mobile-action-btn" onClick={() => { onClose(); openWishlist(); }}>
            <Heart size={20} /> Lista de Deseos
          </button>
          <button className="mobile-action-btn" onClick={() => { onClose(); openCart(); }}>
            <ShoppingBag size={20} /> Carrito
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
