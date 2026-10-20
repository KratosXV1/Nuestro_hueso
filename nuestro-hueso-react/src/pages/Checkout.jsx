import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../data/dataService';

export default function Checkout({ carrito, onFinalizar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos'
  });

  const [simularError, setSimularError] = useState(false);

  useEffect(() => {
    let activo = null;

    if (dataService.getUsuarioActivo) {
      activo = dataService.getUsuarioActivo();
    } else {
      const guardado = sessionStorage.getItem('usuarioActivo') || sessionStorage.getItem('adminActivo');
      if (guardado) activo = JSON.parse(guardado);
    }

    if (activo) {
      cargarDatosUsuario(activo);
    }
  }, []);

  const cargarDatosUsuario = (user) => {
    setUsuario(user);
    setForm(prev => ({
      ...prev,
      nombre: user.nombre || prev.nombre,
      apellidos: user.apellidos || prev.apellidos,
      correo: user.correo || prev.correo,
      calle: user.direccion || prev.calle,
      region: user.region || prev.region,
      comuna: user.comuna || prev.comuna
    }));
    setMostrarLogin(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorLogin('');

    let res = null;
    if (dataService.loginCliente) {
      res = dataService.loginCliente(loginCorreo, loginPassword);
    } else {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const encontrado = usuarios.find(
        u => u.correo.toLowerCase() === loginCorreo.trim().toLowerCase() && 
             (u.clave === loginPassword || u.password === loginPassword)
      );
      if (encontrado) {
        sessionStorage.setItem('usuarioActivo', JSON.stringify(encontrado));
        res = { ok: true, usuario: encontrado };
      } else {
        res = { ok: false, error: 'Correo o contraseña incorrectos.' };
      }
    }

    if (res && res.ok) {
      cargarDatosUsuario(res.usuario);
      setLoginCorreo('');
      setLoginPassword('');
    } else {
      setErrorLogin(res?.error || 'Credenciales inválidas.');
    }
  };

  const handleLogout = () => {
    if (dataService.logoutCliente) dataService.logoutCliente();
    sessionStorage.removeItem('usuarioActivo');
    sessionStorage.removeItem('adminActivo');
    setUsuario(null);
    setForm({
      nombre: '',
      apellidos: '',
      correo: '',
      calle: '',
      depto: '',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos'
    });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (simularError) {
      navigate('/pago-fallo', { state: { total } });
    } else {
      const orden = dataService.crearOrden({ cliente: form, items: carrito, total });
      onFinalizar();
      navigate('/pago-exito', { state: { orden } });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Paso de Pago y Despacho</h2>

      <div className="card border-0 shadow-sm mb-4" style={{ backgroundColor: '#efcccc' }}>
        <div className="card-body d-flex flex-wrap justify-content-between align-items-center py-2 px-3">
          {usuario ? (
            <div>
              <span>👤 Sesión iniciada: <strong>{usuario.nombre} {usuario.apellidos || ''}</strong> ({usuario.correo})</span>
              <button type="button" onClick={handleLogout} className="btn btn-sm btn-outline-danger ms-3">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="w-100 d-flex justify-content-between align-items-center">
              <span>¿Tienes cuenta en Nuestro Hueso? Inicia sesión para autocompletar tus datos.</span>
              <button
                type="button"
                onClick={() => setMostrarLogin(!mostrarLogin)}
                className="btn btn-sm text-white"
                style={{ backgroundColor: '#d97a7a' }}
              >
                {mostrarLogin ? 'Ocultar login' : 'Iniciar sesión'}
              </button>
            </div>
          )}
        </div>

        {!usuario && mostrarLogin && (
          <div className="border-top px-3 py-3 bg-white rounded-bottom">
            <form onSubmit={handleLoginSubmit} className="row g-2 align-items-center">
              {errorLogin && (
                <div className="col-12 alert alert-danger py-1 px-2 small mb-1">
                  {errorLogin}
                </div>
              )}
              <div className="col-md-5">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  placeholder="Correo (ej: admin@gmail.com)"
                  value={loginCorreo}
                  onChange={(e) => setLoginCorreo(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-5">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="Contraseña"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-2">
                <button type="submit" className="btn btn-sm btn-dark w-100">
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-7">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-bold mb-3">Información del Cliente</h5>
            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre *</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos *</label>
                <input
                  type="text"
                  name="apellidos"
                  className="form-control"
                  value={form.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico *</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>

            <h5 className="fw-bold mt-4 mb-3">Dirección de Entrega</h5>
            <div className="row g-2 mb-3">
              <div className="col-md-8">
                <label className="form-label">Calle y Número *</label>
                <input
                  type="text"
                  name="calle"
                  className="form-control"
                  value={form.calle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Depto (opcional)</label>
                <input
                  type="text"
                  name="depto"
                  className="form-control"
                  value={form.depto}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <label className="form-label">Región</label>
                <select name="region" className="form-select" value={form.region} onChange={handleChange}>
                  <option value="Región Metropolitana de Santiago">Región Metropolitana de Santiago</option>
                  <option value="Región de Valparaíso">Región de Valparaíso</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Comuna</label>
                <select name="comuna" className="form-select" value={form.comuna} onChange={handleChange}>
                  <option value="Cerrillos">Cerrillos</option>
                  <option value="Santiago">Santiago</option>
                  <option value="Maipú">Maipú</option>
                  <option value="Providencia">Providencia</option>
                </select>
              </div>
            </div>

            <div className="form-check my-3 p-2 bg-light rounded">
              <input
                className="form-check-input ms-1 me-2"
                type="checkbox"
                id="checkError"
                checked={simularError}
                onChange={(e) => setSimularError(e.target.checked)}
              />
              <label className="form-check-label text-danger fw-semibold" htmlFor="checkError">
                Simular fallo en el pago (Para probar vista de rechazo)
              </label>
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100">
              Pagar ahora ${total.toLocaleString('es-CL')} CLP
            </button>
          </form>
        </div>

        <div className="col-12 col-md-5">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h5 className="fw-bold mb-3">Resumen del Pedido</h5>
            <ul className="list-group mb-3">
              {carrito.map(i => (
                <li key={i.id} className="list-group-item d-flex justify-content-between small">
                  <span>{i.nombre} (x{i.cantidad})</span>
                  <span>${(i.precio * i.cantidad).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            <div className="fw-bold text-end fs-5 text-success">
              Total: ${total.toLocaleString('es-CL')} CLP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}