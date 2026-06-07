import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlistItems, addToCart } = useAppContext();

  const isWishlisted = wishlistItems.some(item => item.id === product.id);

  return (
    <div className="product-card-adidas">
      <div className="product-card-image-wrapper">
        <button 
          className="product-card-wishlist-btn"
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        >
          <Heart 
            size={20} 
            strokeWidth={1.5}
            fill={isWishlisted ? 'var(--color-brand)' : 'none'} 
            color={isWishlisted ? 'var(--color-brand)' : 'var(--color-black)'} 
          />
        </button>
        <Link to={`/producto/${product.id}`} className="product-card-image-link">
          <img src={product.image} alt={product.title} className="product-card-primary-image" />
          {product.hoverImage && (
            <img src={product.hoverImage} alt={`${product.title} alternative`} className="product-card-hover-image" />
          )}
        </Link>
        <div className="product-card-overlay-actions">
          <button className="btn-primary add-to-cart-btn" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
      <Link to={`/producto/${product.id}`} className="product-card-info">
        <div className="product-card-price">{product.price}</div>
        <div className="product-card-title">{product.title}</div>
        <div className="product-card-subtitle">{product.subtitle}</div>
        <div className="product-card-attributes">
          {product.colors && <span>{product.colors}</span>}
          {product.isNew && <span>Nuevo</span>}
          {product.freeShipping && <span>Envío Gratis</span>}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
