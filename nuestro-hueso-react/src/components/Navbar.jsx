import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cantCarrito }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style={{ backgroundColor: '#d97a7a' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">🐶 NUESTRO HUESO</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/categorias">Categorías</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/ofertas">Ofertas</Link></li>
          </ul>
          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" className="btn btn-success btn-sm px-3">
              <i className="bi bi-cart-fill me-1"></i> Carrito ({cantCarrito})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}