import React, { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';

export default function Ofertas({ onAgregar }) {
  const [productosOferta, setProductosOferta] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    const todos = dataService.getProductos();
    const enOferta = todos.filter(p => p.precio <= 6000); 
    setProductosOferta(enOferta);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 text-danger">🔥 ¡Super Ofertas!</h2>
      <p className="text-muted mb-4">Aprovecha estos precios imperdibles para regalonear a tu mascota.</p>

      {productosOferta.length === 0 ? (
        <div className="alert alert-warning">No hay ofertas disponibles por el momento.</div>
      ) : (
        <div className="row g-4">
          {productosOferta.map(p => (
            <div className="col-12 col-md-4" key={p.id}>
              <div className="card h-100 shadow-sm p-3 border-danger">
                <span className="badge bg-danger position-absolute top-0 end-0 m-3">¡OFERTA!</span>
                <img 
                  src={p.imagen} 
                  alt={p.nombre} 
                  style={{ height: '170px', objectFit: 'contain', cursor: 'pointer' }} 
                  onClick={() => setProductoSeleccionado(p)}
                />
                <h5 
                  className="mt-2 fw-bold" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setProductoSeleccionado(p)}
                >
                  {p.nombre}
                </h5>
                <p className="text-muted small">{p.descripcion}</p>
                <div className="fw-bold text-danger mb-2">
                  ${p.precio.toLocaleString('es-CL')} CLP 
                  <span className="text-decoration-line-through text-muted small ms-2">
                    ${(p.precio * 1.25).toLocaleString('es-CL')}
                  </span>
                </div>
                
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-dark btn-sm w-50" 
                    onClick={() => setProductoSeleccionado(p)}
                  >
                    Vista previa
                  </button>
                  <button 
                    className="btn text-white w-50 btn-sm bg-danger" 
                    onClick={() => onAgregar(p)}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {productoSeleccionado && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-danger"> {productoSeleccionado.nombre}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setProductoSeleccionado(null)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <img 
                  src={productoSeleccionado.imagen} 
                  alt={productoSeleccionado.nombre} 
                  style={{ height: '200px', objectFit: 'contain' }} 
                  className="mb-3"
                />
                <p className="text-muted">{productoSeleccionado.descripcion}</p>
                
                <div className="p-3 bg-light rounded text-start mb-3">
                  <p className="text-secondary small mb-0 fst-italic">
                    "¡Precio rebajado por tiempo limitado!"
                  </p>
                </div>

                <h4 className="fw-bold text-danger">${productoSeleccionado.precio.toLocaleString('es-CL')} CLP</h4>
              </div>
              <div className="modal-footer border-0 justify-content-between">
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => setProductoSeleccionado(null)}
                >
                  Cerrar
                </button>
                <button 
                  type="button" 
                  className="btn text-white btn-sm px-4 bg-danger"
                  onClick={() => {
                    onAgregar(productoSeleccionado);
                    setProductoSeleccionado(null);
                  }}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}