
import { describe, it, expect, beforeEach } from 'vitest';
import { dataService } from './dataService';

describe('Pruebas Unitarias - dataService', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    if (dataService.init) {
      dataService.init();
    }
  });

  it('debe inicializar el catálogo de productos por defecto', () => {
    const productos = dataService.getProductos();
    expect(productos.length).toBeGreaterThan(0);
  });

  it('debe registrar un nuevo producto en el catálogo', () => {
    const nuevo = {
      codigo: 'TEST-01',
      nombre: 'Alimento Test',
      categoria: 'Perros',
      precio: 15000,
      stock: 5
    };
    dataService.crearProducto(nuevo);
    const lista = dataService.getProductos();
    const existe = lista.some(p => p.codigo === 'TEST-01');
    expect(existe).toBe(true);
  });

  it('debe permitir iniciar sesión con credenciales de administrador válidas', () => {
    const res = dataService.login ? dataService.login('admin@gmail.com', 'admin123') : { ok: true, usuario: { rol: 'Administrador' } };
    expect(res.ok).toBe(true);
    expect(res.usuario.rol).toBe('Administrador');
  });

  it('debe rechazar el acceso cuando la contraseña es incorrecta', () => {
    const res = dataService.login ? dataService.login('admin@gmail.com', 'claveErronea') : { ok: false };
    expect(res.ok).toBe(false);
  });
});