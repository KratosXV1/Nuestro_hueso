import React, { useState } from 'react';
import { dataService } from '../data/dataService';

export default function LoginModal({ onLoginExitoso, onCancelar }) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errorCorreo, setErrorCorreo] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');

  const dominiosValidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

  const handleCorreoChange = (e) => {
    const val = e.target.value;
    setCorreo(val);
    if (!val.trim()) {
      setErrorCorreo("El correo es obligatorio.");
    } else if (!dominiosValidos.some(d => val.toLowerCase().endsWith(d))) {
      setErrorCorreo("Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    } else {
      setErrorCorreo("");
    }
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (!val) {
      setErrorPassword("La contraseña es obligatoria.");
    } else if (val.length < 4 || val.length > 10) {
      setErrorPassword("Debe tener entre 4 y 10 caracteres.");
    } else {
      setErrorPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorGeneral('');

    if (!correo.trim() || !password || errorCorreo || errorPassword) {
      setErrorGeneral("Por favor completa los campos correctamente.");
      return;
    }

    const res = dataService.loginCliente(correo, password);
    if (res.ok) {
      onLoginExitoso(res.usuario);
    } else {
      setErrorGeneral(res.error);
    }
  };

  return (
    <div className="login-modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff', borderRadius: '16px', padding: '30px',
        maxWidth: '450px', width: '90%', border: '2px solid #b85c5c',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ fontFamily: 'cursive', textAlign: 'center', color: '#d97a7a', marginBottom: '15px' }}>
          Iniciar Sesión
        </h3>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#555', marginBottom: '20px' }}>
          Inicia sesión para autocompletar tus datos de despacho y finalizar tu compra.
        </p>

        {errorGeneral && (
          <div className="alert alert-danger py-2 px-3 small text-center mb-3">
            {errorGeneral}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ backgroundColor: '#efcccc', padding: '20px', borderRadius: '12px' }}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
              Correo Electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={handleCorreoChange}
              placeholder="usuario@gmail.com"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #333' }}
              required
            />
            {errorCorreo && <small style={{ color: '#b30000', fontWeight: 'bold', display: 'block' }}>{errorCorreo}</small>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="••••••••"
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #333' }}
              required
            />
            {errorPassword && <small style={{ color: '#b30000', fontWeight: 'bold', display: 'block' }}>{errorPassword}</small>}
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button type="submit" className="boton" style={{ backgroundColor: '#0508a8', color: '#fff', padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
              Ingresar
            </button>
            {onCancelar && (
              <button type="button" onClick={onCancelar} style={{ backgroundColor: '#fff', color: '#333', padding: '8px 18px', borderRadius: '20px', border: '1px solid #666', cursor: 'pointer' }}>
                Continuar como invitado
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}