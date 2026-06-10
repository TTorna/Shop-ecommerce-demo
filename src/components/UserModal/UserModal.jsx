import React, { useState } from 'react';
import { X } from 'lucide-react';
import './UserModal.css';

const UserModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}><X size={24} /></button>
        
        <div className="modal-header">
          <h2 className="text-h2">{isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}</h2>
        </div>
        
        <form className="modal-form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          {!isLogin && (
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Tu nombre" required />
            </div>
          )}
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="tu@email.com" required />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="********" required />
          </div>
          
          <button type="submit" className="btn-primary w-full" style={{ marginTop: '16px' }}>
            {isLogin ? 'INGRESAR' : 'REGISTRARSE'}
          </button>
        </form>
        
        <div className="modal-footer">
          {isLogin ? (
            <p>¿No tienes cuenta? <button onClick={() => setIsLogin(false)} className="text-link">Regístrate aquí</button></p>
          ) : (
            <p>¿Ya tienes cuenta? <button onClick={() => setIsLogin(true)} className="text-link">Inicia sesión</button></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;
