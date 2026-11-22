import { api } from './cliente';

// Carrito guardado en el backend (microservicio carrito). Todas las rutas requieren token.

/** Un producto del carrito, como lo responde ItemCarritoResponse */
export interface ItemCarritoApi {
    codigo: string;
    idProducto: number;
    nombreproducto: string;
    marca?: string;
    modelo?: string;
    precio: number;
    imagen?: string;
    cantidad: number;
    subtotal: number;
}

/** El carrito completo, como lo responde CarritoResponse */
export interface CarritoApi {
    items: ItemCarritoApi[];
    cantidadTotal: number;
    total: number;
}

const ruta = (codigo: string) => `/carrito/items/${encodeURIComponent(codigo)}`;

export const obtenerCarrito = () => api<CarritoApi>('/carrito');

/** Si el producto ya está en el carrito, el backend suma la cantidad */
export const agregarItem = (codigo: string, cantidad = 1) =>
    api<CarritoApi>('/carrito/items', 'POST', { codigo, cantidad });

export const actualizarCantidad = (codigo: string, cantidad: number) =>
    api<CarritoApi>(ruta(codigo), 'PATCH', { cantidad });

export const quitarItem = (codigo: string) => api<CarritoApi>(ruta(codigo), 'DELETE');

export const vaciarCarrito = () => api<void>('/carrito', 'DELETE');
