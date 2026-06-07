import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import './WishlistSidebar.css';

const WishlistSidebar = ({ isOpen, onClose, wishlistItems, removeFromWishlist }) => {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>LISTA DE DESEOS ({wishlistItems.length})</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="sidebar-content">
          {wishlistItems.length === 0 ? (
            <div className="empty-state">Tu lista de deseos está vacía.</div>
          ) : (
            <div className="cart-items">
              {wishlistItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <Link
                    to={`/producto/${item.id}`}
                    className="wishlist-item-link"
                    onClick={onClose}
                  >
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.title}</h4>
                      <div className="cart-item-price">{item.price}</div>
                    </div>
                  </Link>
                  <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
