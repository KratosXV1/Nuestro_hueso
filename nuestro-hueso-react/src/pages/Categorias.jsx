import React, { useState, useEffect } from 'react';
import { dataService } from '../data/dataService';

export default function Categorias({ onAgregar }) {
  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  useEffect(() => {
    setProductos(dataService.getProductos());
  }, []);

  const categorias = ['Todas', 'Perros', 'Gatos'];
  const filtrados = categoriaSel === 'Todas' ? productos : productos.filter(p => p.categoria === categoriaSel);

  const obtenerDetalleExtra = (nombre) => {
    const n = nombre.toLowerCase();
    if (n.includes('comida') || n.includes('perro') || n.includes('gato')) {
      return "Ideal para consentir a tu regalón todos los días. ¡Le va a encantar el sabor y le cae súper bien a su pancita!";
    } else if (n.includes('arena')) {
      return "Súper absorbente y libre de polvo molestoso. Te ayuda a mantener todo limpio y sin malos olores en la casa.";
    } else if (n.includes('snack') || n.includes('premio')) {
      return "El snack perfecto para premiar sus buenas acciones o simplemente porque se lo merece. ¡Se volverá loco cuando suene el paquete!";
    } else {
      return "Un producto 100 recomendado por las mascotas de la casa. Diseñado para darles comodidad y pura felicidad.";
    }
  };

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
              <img 
                src={p.imagen} 
                alt={p.nombre} 
                style={{ height: '170px', objectFit: 'contain', cursor: 'pointer' }} 
                onClick={() => setProductoSeleccionado(p)}
                title="Haz clic para ver vista previa"
              />
              <h5 
                className="mt-2 fw-bold" 
                style={{ cursor: 'pointer' }}
                onClick={() => setProductoSeleccionado(p)}
              >
                {p.nombre}
              </h5>
              <p className="text-muted small">{p.descripcion}</p>
              <div className="fw-bold text-success mb-2">${p.precio.toLocaleString('es-CL')} CLP</div>
              
              <div className="d-flex gap-2">
                <button 
                  className="btn btn-outline-dark btn-sm w-50" 
                  onClick={() => setProductoSeleccionado(p)}
                >
                  Vista previa
                </button>
                <button 
                  className="btn text-white w-50 btn-sm" 
                  style={{ backgroundColor: '#d97a7a' }} 
                  onClick={() => onAgregar(p)}
                >
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">{productoSeleccionado.nombre}</h5>
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
                    "{obtenerDetalleExtra(productoSeleccionado.nombre)}"
                  </p>
                </div>

                <p className="text-secondary small">Categoría: <strong>{productoSeleccionado.categoria}</strong></p>
                <h4 className="fw-bold text-success">${productoSeleccionado.precio.toLocaleString('es-CL')} CLP</h4>
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
                  className="btn text-white btn-sm px-4" 
                  style={{ backgroundColor: '#d97a7a' }}
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