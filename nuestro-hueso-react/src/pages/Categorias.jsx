import React, { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';

export default function Categorias({ onAgregar }) {
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    setProductos(dataService.getProductos());
  }, []);

  const categorias = ['Todas', 'Perros', 'Gatos'];
  const filtrados = categoriaSel === 'Todas' ? productos : productos.filter(p => p.categoria === categoriaSel);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Categorías</h2>
      <div className="d-flex gap-2 mb-4">
        {categorias.map(cat => (
          <button
            key={cat}
            className={`btn ${categoriaSel === cat ? 'btn-danger' : 'btn-outline-secondary'}`}
            style={categoriaSel === cat ? { backgroundColor: '#d97a7a', borderColor: '#d97a7a' } : {}}
            onClick={() => setCategoriaSel(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtrados.map(p => (
          <div className="col-12 col-md-4" key={p.id}>
            <div className="card h-100 shadow-sm p-3">
              <img src={p.imagen} alt={p.nombre} style={{ height: '170px', objectFit: 'contain' }} />
              <h5 className="mt-2 fw-bold">{p.nombre}</h5>
              <p className="text-muted small">{p.descripcion}</p>
              <div className="fw-bold text-success mb-2">${p.precio.toLocaleString('es-CL')} CLP</div>
              <button className="btn text-white w-100" style={{ backgroundColor: '#d97a7a' }} onClick={() => onAgregar(p)}>
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}