import { api } from './cliente';
import type { Producto } from './tipos';

// Catálogo (público, sin token)

export const listarProductos = () => api<Producto[]>('/productos');

export const obtenerProductoPorCodigo = (codigo: string) =>
    api<Producto>(`/productos/codigo/${encodeURIComponent(codigo)}`);

/** Datos que envía el formulario del mantenedor. La categoría va por nombre */
export interface DatosProducto {
    codigo: string;
    nombreproducto: string;
    categoria: string;
    marca: string;
    modelo: string;
    precio: number;
    stock: number;
    descripcion: string;
    imagen: string;
}

export const crearProducto = (datos: DatosProducto) =>
    api<Producto>('/productos', 'POST', datos);

/** PATCH: se envían los campos del formulario; un texto vacío ("") borra la descripción o la imagen */
export const editarProducto = (id: number, cambios: Partial<DatosProducto>) =>
    api<Producto>(`/productos/${id}`, 'PATCH', cambios);

export const eliminarProducto = (id: number) =>
    api<void>(`/productos/${id}`, 'DELETE');