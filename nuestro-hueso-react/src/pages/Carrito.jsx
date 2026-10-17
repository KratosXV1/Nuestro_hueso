import React from 'react';
import { Link } from 'react-router-dom';

export default function Carrito({ carrito, onModificarCantidad, onEliminar, onVaciar }) {
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h3>Tu carrito está vacío 🐶</h3>
        <p className="text-muted">Añade productos desde el catálogo para continuar con tu compra.</p>
        <Link to="/" className="btn text-white" style={{ backgroundColor: '#d97a7a' }}>Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Carrito de Compras</h2>
      <div className="table-responsive shadow-sm rounded">
        <table className="table align-middle bg-white mb-0">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th style={{ width: '140px' }}>Cantidad</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img src={item.imagen} alt={item.nombre} width="45" height="45" style={{ objectFit: 'contain' }} />
                    <span className="fw-semibold">{item.nombre}</span>
                  </div>
                </td>
                <td>${item.precio.toLocaleString('es-CL')}</td>
                <td>
                  <div className="input-group input-group-sm">
                    <button className="btn btn-outline-secondary" onClick={() => onModificarCantidad(item.id, -1)}>-</button>
                    <span className="input-group-text px-3">{item.cantidad}</span>
                    <button className="btn btn-outline-secondary" onClick={() => onModificarCantidad(item.id, 1)}>+</button>
                  </div>
                </td>
                <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded shadow-sm">
        <button className="btn btn-outline-danger" onClick={onVaciar}>Vaciar Carrito</button>
        <div className="text-end">
          <h4>Total: <span className="text-success fw-bold">${total.toLocaleString('es-CL')} CLP</span></h4>
          <Link to="/checkout" className="btn btn-success btn-lg mt-2">Continuar al Checkout</Link>
        </div>
      </div>
    </div>
  );
}