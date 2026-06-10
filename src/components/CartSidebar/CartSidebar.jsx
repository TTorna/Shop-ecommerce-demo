import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateCartQuantity } = useAppContext();

  const total = cartItems.reduce((sum, item) => {
    const priceStr = item.price.replace('$', '').replace('.', '');
    const quantity = item.quantity || 1;
    return sum + (parseInt(priceStr) * quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>TU CARRITO ({totalItems})</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="sidebar-content">
          {cartItems.length === 0 ? (
            <div className="empty-state">Tu carrito está vacío.</div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size || 'default'}`} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    {item.size && <span style={{ fontSize: '12px', color: 'var(--color-gray-300)' }}>Talla: {item.size}</span>}
                    <div className="cart-item-price">{item.price}</div>
                    
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateCartQuantity(item.id, item.size, (item.quantity || 1) - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="quantity-value">{item.quantity || 1}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => updateCartQuantity(item.id, item.size, (item.quantity || 1) + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id, item.size)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="sidebar-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full" onClick={onClose} style={{ textDecoration: 'none' }}>
              FINALIZAR COMPRA
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
