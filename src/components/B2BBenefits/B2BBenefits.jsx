import React from 'react';
import { Package, Truck, Headset, Star } from 'lucide-react';
import './B2BBenefits.css';

const B2BBenefits = () => {
  const benefits = [
    {
      icon: <Package size={32} />,
      title: 'Compra Mínima Flexible',
      description: 'Armá tu pedido por curvas cerradas o seleccioná talles sueltos desde 6 unidades.'
    },
    {
      icon: <Truck size={32} />,
      title: 'Envíos Express',
      description: 'Despachamos tu mercadería en el día a todo el país mediante transporte.'
    },
    {
      icon: <Headset size={32} />,
      title: 'Atención a Locales',
      description: 'Asesoramiento personalizado vía WhatsApp para ayudarte a elegir tu surtido.'
    },
    {
      icon: <Star size={32} />,
      title: 'Calidad Premium',
      description: 'Confección y denim de primera línea para garantizar la venta en tu local.'
    }
  ];

  return (
    <section className="b2b-benefits-section" id="beneficios-b2b">
      <div className="container">
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-desc">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default B2BBenefits;
