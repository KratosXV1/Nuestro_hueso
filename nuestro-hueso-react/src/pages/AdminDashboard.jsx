import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../data/dataService';

export default function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => setProductos(dataService.getProductos());

  const handleCrear = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio) return;
    dataService.crearProducto({
      nombre: nuevoNombre,
      precio: parseInt(nuevoPrecio),
      categoria: 'General',
      stock: 10,
      descripcion: 'Producto administrado',
      imagen: '/img/bienvenida.png'
    });
    setNuevoNombre('');
    setNuevoPrecio('');
    cargarProductos();
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Deseas eliminar este producto del inventario?")) {
      dataService.eliminarProducto(id);
      cargarProductos();
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Panel de Administración</h2>
        <Link to="/" className="btn btn-outline-secondary">Volver a la Tienda</Link>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-white bg-primary p-3 shadow-sm">
            <h5>Compras Realizadas</h5>
            <h3 className="fw-bold">1,234</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-white bg-success p-3 shadow-sm">
            <h5>Productos Activos</h5>
            <h3 className="fw-bold">{productos.length}</h3>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-white bg-warning p-3 shadow-sm">
            <h5>Usuarios Registrados</h5>
            <h3 className="fw-bold">890</h3>
          </div>
        </div>
      </div>

      <div className="card p-3 shadow-sm mb-4">
        <h5 className="fw-bold">Añadir Nuevo Producto al Inventario</h5>
        <form onSubmit={handleCrear} className="row g-2 mt-1">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="Nombre del producto" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <input type="number" className="form-control" placeholder="Precio (CLP)" value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} required />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">+ Guardar</button>
          </div>
        </form>
      </div>

      <div className="card p-3 shadow-sm">
        <h5 className="fw-bold mb-3">Inventario Actual</h5>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(p.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}