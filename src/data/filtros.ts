import type { Producto, Usuario } from './db';

export const normalizarTexto = (texto: string): string =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export interface FiltroProductos {
    categorias?: string[];
    texto?: string;
}

export const filtrarProductos = (productos: Producto[], { categorias = [], texto = '' }: FiltroProductos): Producto[] => {
    const busqueda = normalizarTexto(texto);
    return productos.filter(p => {
        if (categorias.length > 0 && !categorias.includes(p.categoria)) return false;
        if (!busqueda) return true;
        const campos = [p.nombreproducto ?? '', p.marca, p.modelo, p.codigo];
        return campos.some(c => normalizarTexto(c).includes(busqueda));
    });
};

export const filtrarUsuarios = (usuarios: Usuario[], texto: string): Usuario[] => {
    const busqueda = normalizarTexto(texto);
    if (!busqueda) return usuarios;
    const rutBuscado = busqueda.replace(/[.\-\s]/g, '');
    return usuarios.filter(u =>
        normalizarTexto(u.nombre).includes(busqueda) ||
        normalizarTexto(u.correo).includes(busqueda) ||
        (rutBuscado !== '' && u.rut.replace(/[.\-\s]/g, '').toLowerCase().includes(rutBuscado))
    );
};
