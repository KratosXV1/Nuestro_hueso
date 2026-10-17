import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PagoExito() {
  const { state } = useLocation();
  const orden = state?.orden;

  if (!orden) return <div className="container py-5 text-center"><Link to="/" className="btn btn-danger">Volver</Link></div>;

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto text-center" style={{ maxWidth: '650px' }}>
        <i className="bi bi-check-circle-fill text-success display-3"></i>
        <h2 className="mt-2 text-success fw-bold">¡Compra Realizada con Éxito!</h2>
        <p className="text-muted">N° de Orden: #{orden.nroOrden} · Fecha: {orden.fecha}</p>
        <hr />
        <div className="text-start">
          <p><strong>Cliente:</strong> {orden.cliente.nombre} {orden.cliente.apellidos}</p>
          <p><strong>Correo:</strong> {orden.cliente.correo}</p>
          <p><strong>Dirección:</strong> {orden.cliente.calle}, {orden.cliente.comuna}, {orden.cliente.region}</p>
          <p className="fs-5"><strong>Total Pagado:</strong> <span className="text-success fw-bold">${orden.total.toLocaleString('es-CL')} CLP</span></p>
        </div>
        <Link to="/" className="btn text-white mt-3" style={{ backgroundColor: '#d97a7a' }}>Volver a la Tienda</Link>
      </div>
    </div>
  );
}