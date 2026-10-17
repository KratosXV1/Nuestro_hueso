import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dataService } from '../data/dataService';

export default function Checkout({ carrito, onFinalizar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const [form, setForm] = useState({
    nombre: '', apellidos: '', correo: '', calle: '', depto: '', region: 'Región Metropolitana de Santiago', comuna: 'Cerrillos'
  });
  const [simularError, setSimularError] = useState(false);

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
      <div className="row g-4">
        <div className="col-12 col-md-7">
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-bold mb-3">Información del Cliente</h5>
            <div className="row g-2 mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre *</label>
                <input type="text" name="nombre" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos *</label>
                <input type="text" name="apellidos" className="form-control" onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico *</label>
              <input type="email" name="correo" className="form-control" onChange={handleChange} required />
            </div>

            <h5 className="fw-bold mt-4 mb-3">Dirección de Entrega</h5>
            <div className="row g-2 mb-3">
              <div className="col-md-8">
                <label className="form-label">Calle y Número *</label>
                <input type="text" name="calle" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label className="form-label">Depto (opcional)</label>
                <input type="text" name="depto" className="form-control" onChange={handleChange} />
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
              <input className="form-check-input ms-1 me-2" type="checkbox" id="checkError" checked={simularError} onChange={(e) => setSimularError(e.target.checked)} />
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
            <div className="fw-bold text-end fs-5 text-success">Total: ${total.toLocaleString('es-CL')} CLP</div>
          </div>
        </div>
      </div>
    </div>
  );
}