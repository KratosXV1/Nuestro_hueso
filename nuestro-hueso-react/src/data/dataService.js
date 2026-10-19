const PRODUCTOS_INICIALES = [
  { id: 1, nombre: "Arena Sanitaria Gato 5kg", categoria: "Gatos", precio: 8990, stock: 15, oferta: false, descripcion: "Arena aglomerante de alta absorción y control de olores.", imagen: "/img/arena.png" },
  { id: 2, nombre: "Alimento Perro Adulto 15kg", categoria: "Perros", precio: 34990, stock: 8, oferta: true, precioOferta: 29990, descripcion: "Nutrición balanceada con proteínas seleccionadas.", imagen: "/img/comida_perro.png" },
  { id: 3, nombre: "Snack Dental Canino", categoria: "Perros", precio: 4500, stock: 25, oferta: false, descripcion: "Snack diario para la higiene bucal de tu perro.", imagen: "/img/snack.png" },
  { id: 4, nombre: "Alimento Gato Esterilizado 3kg", categoria: "Gatos", precio: 18990, stock: 12, oferta: true, precioOferta: 15990, descripcion: "Control de peso y salud urinaria para gatos.", imagen: "/img/comida_gato.png" }
];

const USUARIOS_INICIALES = [
  { run: "111111111", nombre: "Administrador", apellidos: "Sistema", correo: "admin@gmail.com", clave: "admin123", rol: "Administrador", region: "Región Metropolitana de Santiago", comuna: "Santiago" },
  { run: "201234567", nombre: "Cliente", apellidos: "Prueba", correo: "cliente@gmail.com", clave: "pass123", rol: "Cliente", region: "Región Metropolitana de Santiago", comuna: "Cerrillos" }
];

export const dataService = {
  init() {
    if (!localStorage.getItem('productos')) {
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_INICIALES));
    }
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify(USUARIOS_INICIALES));
    }
    if (!localStorage.getItem('carrito')) {
      localStorage.setItem('carrito', JSON.stringify([]));
    }
    if (!localStorage.getItem('ordenes')) {
      localStorage.setItem('ordenes', JSON.stringify([]));
    }
  },

  getProductos() {
    this.init();
    return JSON.parse(localStorage.getItem('productos'));
  },

  getProductoPorId(id) {
    return this.getProductos().find(p => p.id === parseInt(id));
  },

  crearProducto(prod) {
    const lista = this.getProductos();
    const nuevo = { ...prod, id: Date.now() };
    lista.push(nuevo);
    localStorage.setItem('productos', JSON.stringify(lista));
    return nuevo;
  },

  actualizarProducto(id, datos) {
    const lista = this.getProductos();
    const idx = lista.findIndex(p => p.id === parseInt(id));
    if (idx !== -1) {
      lista[idx] = { ...lista[idx], ...datos };
      localStorage.setItem('productos', JSON.stringify(lista));
      return lista[idx];
    }
    return null;
  },

  eliminarProducto(id) {
    let lista = this.getProductos().filter(p => p.id !== parseInt(id));
    localStorage.setItem('productos', JSON.stringify(lista));
    return true;
  },

  // CARRITO
  getCarrito() {
    this.init();
    return JSON.parse(localStorage.getItem('carrito'));
  },

  guardarCarrito(items) {
    localStorage.setItem('carrito', JSON.stringify(items));
  },

  vaciarCarrito() {
    localStorage.setItem('carrito', JSON.stringify([]));
  },

  // CHECKOUT Y ÓRDENES
  getOrdenes() {
    this.init();
    return JSON.parse(localStorage.getItem('ordenes'));
  },

  crearOrden(orden) {
    const ordenes = this.getOrdenes();
    const nueva = {
      ...orden,
      id: Date.now(),
      nroOrden: `2026${Math.floor(1000 + Math.random() * 9000)}`,
      fecha: new Date().toLocaleDateString('es-CL')
    };
    ordenes.push(nueva);
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
    return nueva;
  }
};