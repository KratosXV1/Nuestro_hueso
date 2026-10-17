import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import PagoExito from './pages/PagoExito';
import PagoFallo from './pages/PagoFallo';
import AdminDashboard from './pages/AdminDashboard';
import { dataService } from './data/dataService';

export default function App() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    dataService.init();
    setCarrito(dataService.getCarrito());
  }, []);

  const sincronizar = (nuevo) => {
    setCarrito(nuevo);
    dataService.guardarCarrito(nuevo);
  };

  const handleAgregar = (p) => {
    const copia = [...carrito];
    const idx = copia.findIndex(item => item.id === p.id);
    if (idx !== -1) {
      copia[idx].cantidad += 1;
    } else {
      copia.push({ ...p, cantidad: 1 });
    }
    sincronizar(copia);
  };

  const handleModificarCantidad = (id, delta) => {
    const copia = carrito.map(item => {
      if (item.id === id) {
        const nueva = item.cantidad + delta;
        return nueva > 0 ? { ...item, cantidad: nueva } : null;
      }
      return item;
    }).filter(Boolean);
    sincronizar(copia);
  };

  const handleEliminar = (id) => sincronizar(carrito.filter(item => item.id !== id));
  
  const handleVaciar = () => {
    dataService.vaciarCarrito();
    setCarrito([]);
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Router>
      <Navbar cantCarrito={totalItems} />
      <main className="min-vh-100">
        <Routes>
          <Route path="/" element={<Home onAgregar={handleAgregar} />} />
          <Route path="/categorias" element={<Categorias onAgregar={handleAgregar} />} />
          <Route path="/ofertas" element={<Categorias onAgregar={handleAgregar} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} onModificarCantidad={handleModificarCantidad} onEliminar={handleEliminar} onVaciar={handleVaciar} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} onFinalizar={handleVaciar} />} />
          <Route path="/pago-exito" element={<PagoExito />} />
          <Route path="/pago-fallo" element={<PagoFallo />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <footer className="text-center py-3 text-white mt-5" style={{ backgroundColor: '#d97a7a' }}>
        <p className="mb-0">Nuestro Hueso © 2026 · Duoc UC</p>
      </footer>
    </Router>
  );
}