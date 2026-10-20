import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../data/dataService';

export default function Checkout({ carrito, onFinalizar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const [usuario, setUsuario] = useState(null);
  const [mostrarAuth, setMostrarAuth] = useState(false);
  const [modoAuth, setModoAuth] = useState('login');

  const [loginCorreo, setLoginCorreo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regForm, setRegForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    calle: '',
    depto: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos'
  });

  const [errorAuth, setErrorAuth] = useState('');

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
      calle: user.direccion || user.calle || prev.calle,
      region: user.region || prev.region,
      comuna: user.comuna || prev.comuna
    }));
    setMostrarAuth(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorAuth('');

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
      setErrorAuth(res?.error || 'Credenciales inválidas.');
    }
  };

  const handleRegistroSubmit = (e) => {
    e.preventDefault();
    setErrorAuth('');

    const c = regForm.correo.trim().toLowerCase();
    const p = regForm.password;

    if (!c.endsWith('@duoc.cl') && !c.endsWith('@profesor.duoc.cl') && !c.endsWith('@gmail.com')) {
      setErrorAuth('Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com.');
      return;
    }

    if (p.length < 4 || p.length > 10) {
      setErrorAuth('La contraseña debe tener entre 4 y 10 caracteres.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.some(u => u.correo.toLowerCase() === c);

    if (existe) {
      setErrorAuth('Ya existe un usuario con este correo.');
      return;
    }

    const nuevo = {
      run: `1${Math.floor(1000000 + Math.random() * 9000000)}K`,
      nombre: regForm.nombre.trim(),
      apellidos: regForm.apellidos.trim(),
      correo: c,
      password: p,
      clave: p,
      direccion: regForm.calle.trim(),
      region: regForm.region,
      comuna: regForm.comuna,
      rol: 'Cliente'
    };

    usuarios.push(nuevo);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    sessionStorage.setItem('usuarioActivo', JSON.stringify(nuevo));

    cargarDatosUsuario(nuevo);
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
  const handleRegChange = (e) => setRegForm({ ...regForm, [e.target.name]: e.target.value });

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
            <div className="w-100 d-flex justify-content-between align-items-center">
              <span>👤 Sesión iniciada: <strong>{usuario.nombre} {usuario.apellidos || ''}</strong> ({usuario.correo})</span>
              <button type="button" onClick={handleLogout} className="btn btn-sm btn-outline-danger">
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="w-100 d-flex flex-wrap justify-content-between align-items-center gap-2">
              <span>¿Tienes cuenta o deseas registrarte para autocompletar tus datos?</span>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => { setMostrarAuth(true); setModoAuth('login'); }}
                  className="btn btn-sm text-white"
                  style={{ backgroundColor: '#d97a7a' }}
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={() => { setMostrarAuth(true); setModoAuth('registro'); }}
                  className="btn btn-sm btn-outline-dark"
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}
        </div>

        {!usuario && mostrarAuth && (
          <div className="border-top px-4 py-3 bg-white rounded-bottom">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn btn-sm ${modoAuth === 'login' ? 'btn-danger' : 'btn-outline-danger'}`}
                  style={modoAuth === 'login' ? { backgroundColor: '#d97a7a', borderColor: '#d97a7a' } : {}}
                  onClick={() => { setModoAuth('login'); setErrorAuth(''); }}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${modoAuth === 'registro' ? 'btn-danger' : 'btn-outline-danger'}`}
                  style={modoAuth === 'registro' ? { backgroundColor: '#d97a7a', borderColor: '#d97a7a' } : {}}
                  onClick={() => { setModoAuth('registro'); setErrorAuth(''); }}
                >
                  Crear Cuenta Nueva
                </button>
              </div>
              <button type="button" className="btn-close" onClick={() => setMostrarAuth(false)}></button>
            </div>

            {errorAuth && (
              <div className="alert alert-danger py-1 px-2 small mb-2">
                {errorAuth}
              </div>
            )}

            {modoAuth === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="row g-2 align-items-center">
                <div className="col-md-5">
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    placeholder="Correo (@gmail.com o @duoc.cl)"
                    value={loginCorreo}
                    onChange={(e) => setLoginCorreo(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-5">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="Contraseña (4-10 caracteres)"
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
            ) : (
              <form onSubmit={handleRegistroSubmit} className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control form-control-sm"
                    placeholder="Nombre *"
                    value={regForm.nombre}
                    onChange={handleRegChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="apellidos"
                    className="form-control form-control-sm"
                    placeholder="Apellidos *"
                    value={regForm.apellidos}
                    onChange={handleRegChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    name="correo"
                    className="form-control form-control-sm"
                    placeholder="Correo (@gmail.com o @duoc.cl) *"
                    value={regForm.correo}
                    onChange={handleRegChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-sm"
                    placeholder="Contraseña (4-10 caract.) *"
                    value={regForm.password}
                    onChange={handleRegChange}
                    required
                  />
                </div>
                <div className="col-md-8">
                  <input
                    type="text"
                    name="calle"
                    className="form-control form-control-sm"
                    placeholder="Dirección / Calle y número *"
                    value={regForm.calle}
                    onChange={handleRegChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <button type="submit" className="btn btn-sm btn-success w-100">
                    Registrar y Usar Datos
                  </button>
                </div>
              </form>
            )}
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