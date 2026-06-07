import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const CategoryGrid = () => {
  return (
    <section className="category-grid-section">
      <div className="container">
        <div className="cat-grid-wrapper">
          <Link to="/catalogo?categoria=Hombre" className="cat-grid-item cat-grid-tall">
            <img 
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1587&auto=format&fit=crop" 
              alt="Hombre" 
            />
            <div className="cat-grid-overlay">
              <h2 className="cat-grid-title">HOMBRE</h2>
              <span className="cat-grid-btn">Ver Colección</span>
            </div>
          </Link>
          
          <div className="cat-grid-column">
            <Link to="/catalogo?categoria=Mujer" className="cat-grid-item">
              <img 
                src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1587&auto=format&fit=crop" 
                alt="Mujer" 
              />
              <div className="cat-grid-overlay">
                <h2 className="cat-grid-title">MUJER</h2>
                <span className="cat-grid-btn">Ver Colección</span>
              </div>
            </Link>
            
            <Link to="/catalogo?coleccion=SALE" className="cat-grid-item">
              <img 
                src="https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=1587&auto=format&fit=crop" 
                alt="Sale" 
              />
              <div className="cat-grid-overlay">
                <h2 className="cat-grid-title">PACKS EN SALE</h2>
                <span className="cat-grid-btn">Ver Ofertas</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
