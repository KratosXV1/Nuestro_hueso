import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../data/dataService';

export default function Home({ onAgregar }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(dataService.getProductos());
  }, []);

  return (
    <div className="container py-4">
      <div className="p-4 mb-4 rounded-3 text-center shadow-sm" style={{ backgroundColor: '#efcccc' }}>
        <h1 className="display-6 fw-bold text-dark">Bienvenidos a Nuestro Hueso</h1>
        <p className="fs-5 text-muted">¡Pasa, aquí no mordemos! Los mejores productos para tus mascotas.</p>
        <Link to="/categorias" className="btn text-white px-4" style={{ backgroundColor: '#d97a7a' }}>Explorar Categorías</Link>
      </div>

      <h2 className="mb-4 fw-bold">Catálogo de Productos</h2>
      <div className="row g-4">
        {productos.map(p => (
          <div className="col-12 col-md-6 col-lg-3" key={p.id}>
            <div className="card h-100 shadow-sm border-0 p-2">
              <img src={p.imagen} className="card-img-top p-2" alt={p.nombre} style={{ height: '170px', objectFit: 'contain' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fs-6 fw-bold">{p.nombre}</h5>
                <p className="text-muted small flex-grow-1">{p.descripcion}</p>
                <div className="fw-bold fs-5 text-success mb-2">${p.precio.toLocaleString('es-CL')} CLP</div>
                <button onClick={() => onAgregar(p)} className="btn text-white btn-sm w-100" style={{ backgroundColor: '#d97a7a' }}>
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}