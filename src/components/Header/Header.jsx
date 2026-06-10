import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Header.css';
import './HeaderBadges.css';

const Header = () => {
  const { openCart, openWishlist, openUserModal, openMobileMenu, cartItems, wishlistItems } = useAppContext();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim() !== '') {
      navigate(`/catalogo?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue(''); // Clear after search
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim() !== '') {
      navigate(`/catalogo?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue(''); // Clear after search
    }
  };

  return (
    <div className={`header-wrapper ${isVisible ? '' : 'header-hidden'}`}>
      <div className="top-bar">
        <div className="marquee-content">
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
          <span>COMPRA MÍNIMA 6 PRENDAS Surtidas | ENVÍO GRATIS A PARTIR DE $100.000</span>
        </div>
      </div>
      
      <header className="main-header">
        <div className="header-left">
          <Link to="/" className="logo">
            MOZAIKO <span>DENIM</span>
          </Link>
        </div>
        
        <nav className="header-center">
          <div className="nav-item">
            <Link to="/catalogo" className="nav-link" style={{color: '#E0004D'}}>Novedades</Link>
          </div>
          <div className="nav-item has-mega-menu">
            <Link to="/catalogo?categoria=Hombre" className="nav-link">Hombre</Link>
            <div className="mega-menu">
              <div className="mega-menu-content container">
                <div className="mega-menu-column">
                  <h4>Destacados</h4>
                  <Link to="/catalogo?categoria=Hombre">Ver Todo Hombre</Link>
                  <Link to="/catalogo?categoria=Hombre&coleccion=SALE" style={{color: '#ff6b00'}}>Packs en SALE</Link>
                  <Link to="/catalogo?categoria=Hombre&coleccion=Nuevos">Lo Más Nuevo</Link>
                  <Link to="/catalogo?categoria=Hombre&coleccion=Mas+Vendidos">Los Más Vendidos</Link>
                  <Link to="/catalogo?categoria=Hombre&coleccion=Denim+Black">Colección Denim Black</Link>
                  <Link to="/catalogo?categoria=Hombre&coleccion=Esenciales">Esenciales</Link>
                </div>
                <div className="mega-menu-column">
                  <h4>Calces de Jeans</h4>
                  <Link to="/catalogo?categoria=Hombre&calce=Slim+Fit">Slim Fit</Link>
                  <Link to="/catalogo?categoria=Hombre&calce=Clasico+Recto">Clásico Recto</Link>
                  <Link to="/catalogo?categoria=Hombre&calce=Cargo">Cargo</Link>
                  <Link to="/catalogo?categoria=Hombre&calce=Skinny">Skinny</Link>
                  <Link to="/catalogo?categoria=Hombre&calce=Relaxed+Fit">Relaxed Fit</Link>
                  <Link to="/catalogo?categoria=Hombre&tipo=Jeans">Ver Todos los Calces</Link>
                </div>
                <div className="mega-menu-column">
                  <h4>Tipo de Prenda</h4>
                  <Link to="/catalogo?categoria=Hombre&tipo=Jeans">Jeans Largos</Link>
                  <Link to="/catalogo?categoria=Hombre&tipo=Shorts">Bermudas y Shorts</Link>
                  <Link to="/catalogo?categoria=Hombre&tipo=Chaquetas">Chaquetas Denim</Link>
                  <Link to="/catalogo?categoria=Hombre&tipo=Chalecos">Chalecos</Link>
                  <Link to="/catalogo?categoria=Hombre&tipo=Camisas">Camisas Denim</Link>
                  <Link to="/catalogo?categoria=Hombre">Ver Toda la Ropa</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item has-mega-menu">
            <Link to="/catalogo?categoria=Mujer" className="nav-link">Mujer</Link>
            <div className="mega-menu">
              <div className="mega-menu-content container">
                <div className="mega-menu-column">
                  <h4>Destacados</h4>
                  <Link to="/catalogo?categoria=Mujer">Ver Todo Mujer</Link>
                  <Link to="/catalogo?categoria=Mujer&coleccion=SALE" style={{color: '#ff6b00'}}>Packs en SALE</Link>
                  <Link to="/catalogo?categoria=Mujer&coleccion=Nuevos">Lo Más Nuevo</Link>
                  <Link to="/catalogo?categoria=Mujer&coleccion=Mas+Vendidos">Los Más Vendidos</Link>
                  <Link to="/catalogo?categoria=Mujer&coleccion=Vintage">Colección Vintage</Link>
                </div>
                <div className="mega-menu-column">
                  <h4>Calces de Jeans</h4>
                  <Link to="/catalogo?categoria=Mujer&calce=Mom+Fit">Mom Fit</Link>
                  <Link to="/catalogo?categoria=Mujer&calce=Wide+Leg">Wide Leg</Link>
                  <Link to="/catalogo?categoria=Mujer&calce=Skinny">Skinny</Link>
                  <Link to="/catalogo?categoria=Mujer&calce=Slouchy">Slouchy</Link>
                  <Link to="/catalogo?categoria=Mujer&calce=Cargo">Cargo</Link>
                  <Link to="/catalogo?categoria=Mujer&tipo=Jeans">Ver Todos los Calces</Link>
                </div>
                <div className="mega-menu-column">
                  <h4>Tipo de Prenda</h4>
                  <Link to="/catalogo?categoria=Mujer&tipo=Jeans">Jeans Largos</Link>
                  <Link to="/catalogo?categoria=Mujer&tipo=Shorts">Shorts</Link>
                  <Link to="/catalogo?categoria=Mujer&tipo=Faldas">Faldas Midi y Mini</Link>
                  <Link to="/catalogo?categoria=Mujer&tipo=Chaquetas">Chaquetas</Link>
                  <Link to="/catalogo?categoria=Mujer&tipo=Tops">Tops Denim</Link>
                  <Link to="/catalogo?categoria=Mujer">Ver Toda la Ropa</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-item">
            <Link to="/catalogo?categoria=Unisex" className="nav-link">Unisex</Link>
          </div>
          <div className="nav-item">
            <Link to="/catalogo?coleccion=Pack" className="nav-link">Packs Mayoristas</Link>
          </div>
          <div className="nav-item">
            <Link to="/catalogo?coleccion=SALE" className="nav-link" style={{color: '#ff6b00', fontWeight: '700'}}>SALE</Link>
          </div>
        </nav>
        
        <div className="header-right">
          <div className="search-container">
            <button onClick={handleSearchClick} style={{border: 'none', background: 'none', cursor: 'pointer', padding: 0, display: 'flex'}} className="search-icon-btn">
              <Search size={20} className="search-icon" />
            </button>
            <input 
              type="text" 
              placeholder="Buscar" 
              className="search-input" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
          
          <div className="icon-group desktop-icons">
            <button className="icon-btn user-btn" onClick={openUserModal}><User size={24} /></button>
            <button className="icon-btn heart-btn" onClick={openWishlist}>
              <Heart size={24} />
              {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
            </button>
            <button className="icon-btn bag-btn" onClick={openCart}>
              <ShoppingBag size={24} />
              {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
            </button>
          </div>

          <button className="menu-btn" onClick={openMobileMenu}>
            <Menu size={24} />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
