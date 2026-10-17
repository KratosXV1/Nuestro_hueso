import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PagoFallo() {
  const { state } = useLocation();

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto text-center" style={{ maxWidth: '600px' }}>
        <i className="bi bi-x-circle-fill text-danger display-3"></i>
        <h2 className="mt-2 text-danger fw-bold">No se pudo realizar el pago</h2>
        <p className="text-muted">Ocurrió un error al autorizar la transacción con el medio de pago.</p>
        <p className="fs-5">Monto pendiente: <strong>${state?.total?.toLocaleString('es-CL') || 0} CLP</strong></p>
        <div className="d-flex justify-content-center gap-2 mt-3">
          <Link to="/checkout" className="btn btn-warning">Volver a intentar el pago</Link>
          <Link to="/" className="btn btn-outline-secondary">Ir a la Tienda</Link>
        </div>
      </div>
    </div>
  );
}