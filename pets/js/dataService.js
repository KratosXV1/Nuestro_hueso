const PRODUCTOS_INICIALES = [
  { id: 1, nombre: "Arena Sanitaria 5kg", categoria: "Gatos", precio: 8990, stock: 15, descripcion: "Arena aglomerante de alta absorción.", imagen: "img/arena.png" },
  { id: 2, nombre: "Alimento Perro Adulto 15kg", categoria: "Perros", precio: 34990, stock: 8, descripcion: "Alimento balanceado con proteínas seleccionadas.", imagen: "img/comida_perro.png" },
  { id: 3, nombre: "Snack Dental Canino", categoria: "Perros", precio: 4500, stock: 25, descripcion: "Snack diario para la higiene bucal.", imagen: "img/snack.png" },
  { id: 4, nombre: "Alimento Gato Esterilizado 3kg", categoria: "Gatos", precio: 18990, stock: 12, descripcion: "Control de peso y salud urinaria.", imagen: "img/comida_gato.png" }
];

export const dataService = {
  init() {
    if (!localStorage.getItem('productos')) {
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_INICIALES));
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

  crearProducto(producto) {
    const lista = this.getProductos();
    const nuevo = { ...producto, id: Date.now() };
    lista.push(nuevo);
    localStorage.setItem('productos', JSON.stringify(lista));
    return nuevo;
  },

  eliminarProducto(id) {
    let lista = this.getProductos().filter(p => p.id !== parseInt(id));
    localStorage.setItem('productos', JSON.stringify(lista));
    return true;
  },

  getCarrito() {
    this.init();
    return JSON.parse(localStorage.getItem('carrito'));
  },

  guardarCarrito(items) {
    localStorage.setItem('carrito', JSON.stringify(items));
  },

  crearOrden(orden) {
    const ordenes = JSON.parse(localStorage.getItem('ordenes')) || [];
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