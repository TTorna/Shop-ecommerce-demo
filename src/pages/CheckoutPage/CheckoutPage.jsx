import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { CheckCircle } from 'lucide-react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useAppContext();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cartItems.reduce((sum, item) => {
    const priceStr = item.price.replace('$', '').replace('.', '');
    return sum + parseInt(priceStr);
  }, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      clearCart();
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="checkout-container container success-container">
        <CheckCircle size={64} color="var(--color-black)" />
        <h1 className="text-h1">¡GRACIAS POR TU COMPRA!</h1>
        <p>Tu pedido mayorista ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de envío.</p>
        <button className="btn-primary" onClick={() => navigate('/catalogo')} style={{ marginTop: '24px' }}>
          VOLVER AL CATÁLOGO
        </button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container container empty-container">
        <h2>Tu carrito está vacío</h2>
        <p>Añade productos para proceder al pago.</p>
        <button className="btn-primary" onClick={() => navigate('/catalogo')} style={{ marginTop: '24px' }}>
          IR AL CATÁLOGO
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container container">
      <h1 className="text-h1 checkout-title">FINALIZAR COMPRA</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form-section">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>1. Datos de Contacto</h3>
              <div className="form-group">
                <label>Correo Electrónico *</label>
                <input type="email" required placeholder="tu@email.com" />
              </div>
              <div className="form-group">
                <label>Teléfono *</label>
                <input type="tel" required placeholder="Tu número de teléfono" />
              </div>
            </div>

            <div className="form-section">
              <h3>2. Datos de Envío</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre *</label>
                  <input type="text" required placeholder="Nombre" />
                </div>
                <div className="form-group">
                  <label>Apellido *</label>
                  <input type="text" required placeholder="Apellido" />
                </div>
              </div>
              <div className="form-group">
                <label>Dirección *</label>
                <input type="text" required placeholder="Calle, número, piso, dpto" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ciudad *</label>
                  <input type="text" required placeholder="Ciudad" />
                </div>
                <div className="form-group">
                  <label>Código Postal *</label>
                  <input type="text" required placeholder="Código Postal" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>3. Pago (Simulado)</h3>
              <div className="form-group">
                <label>Número de Tarjeta *</label>
                <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vencimiento *</label>
                  <input type="text" required placeholder="MM/AA" maxLength="5" />
                </div>
                <div className="form-group">
                  <label>Código de Seguridad *</label>
                  <input type="text" required placeholder="123" maxLength="4" />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="checkout-summary-section">
          <div className="summary-card">
            <h3>RESUMEN DEL PEDIDO</h3>
            <div className="summary-items">
              {cartItems.map((item, idx) => (
                <div key={idx} className="summary-item">
                  <img src={item.image} alt={item.title} />
                  <div className="summary-item-info">
                    <h4>{item.title}</h4>
                    <span>{item.size ? `Talla: ${item.size}` : 'Pack Surtido'}</span>
                    <div className="summary-item-price">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-totals">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
              <div className="summary-row">
                <span>Envío Mayorista</span>
                <span>Gratis</span>
              </div>
              <div className="summary-row total-row">
                <span>TOTAL</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
            </div>
            
            <button type="submit" form="checkout-form" className="btn-primary w-full" style={{ padding: '20px', fontSize: '16px' }}>
              PAGAR ${total.toLocaleString('es-AR')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
