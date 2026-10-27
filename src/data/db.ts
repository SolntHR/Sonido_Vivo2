import { productos as productosIniciales } from './Coleccion';

export interface Usuario {
    rut: string;
    nombre: string;
    correo: string;
    password?: string;
    rol: 'Cliente' | 'Administrador';
    activo: boolean;
    region?: string;
    comuna?: string;
    telefono?: string;
    foto?: string;
}

export interface Producto {
    codigo: string;
    categoria: string;
    nombreproducto?: string;
    marca: string;
    modelo: string;
    precio: number;
    stock: number;
    descripcion: string;
    imagen?: string;
}

const usuariosDefault: Usuario[] = [
    { rut: "11111111-1", nombre: "Admin Test", correo: "admin@sonidovivo.cl", password: "12345678", rol: "Administrador", activo: true },
    { rut: "12345678-5", nombre: "Cliente Test", correo: "cliente@sonidovivo.cl", password: "12345678", rol: "Cliente", activo: true, region: "Región Metropolitana", comuna: "Santiago" }
];

export const leerJSON = <T>(clave: string): T | null => {
    const data = localStorage.getItem(clave);
    if (!data) return null;
    try {
        return JSON.parse(data) as T;
    } catch {
        localStorage.removeItem(clave);
        return null;
    }
};

export const getUsuarios = (): Usuario[] => {
    const guardados = leerJSON<Usuario[]>('usuarios');
    if (!Array.isArray(guardados)) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosDefault));
        return [...usuariosDefault];
    }
    if (!guardados.some(u => u.rol === 'Administrador')) {
        const admin = usuariosDefault[0];
        const sinDuplicados = guardados.filter(u => u.rut !== admin.rut && u.correo !== admin.correo);
        const actualizados = [...sinDuplicados, admin];
        localStorage.setItem('usuarios', JSON.stringify(actualizados));
        return actualizados;
    }
    return guardados;
};

export const guardarUsuarios = (usuarios: Usuario[]) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

const limpiarRut = (rut: string) => rut.replace(/[.\-\s]/g, '').toUpperCase();
const mismoCorreo = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export const obtenerUsuario = (rut: string): Usuario | undefined =>
    getUsuarios().find(u => limpiarRut(u.rut) === limpiarRut(rut));

export const crearUsuario = (nuevo: Usuario): Usuario[] => {
    const usuarios = getUsuarios();
    if (usuarios.some(u => limpiarRut(u.rut) === limpiarRut(nuevo.rut))) {
        throw new Error('Este RUT ya está registrado.');
    }
    if (usuarios.some(u => mismoCorreo(u.correo, nuevo.correo))) {
        throw new Error('Este correo ya está registrado.');
    }
    const lista = [...usuarios, nuevo];
    guardarUsuarios(lista);
    return lista;
};

export const actualizarUsuario = (rutOriginal: string, cambios: Partial<Usuario>): Usuario[] => {
    const usuarios = getUsuarios();
    const actual = usuarios.find(u => limpiarRut(u.rut) === limpiarRut(rutOriginal));
    if (!actual) throw new Error('El usuario que intentas editar no existe.');
    const actualizado = { ...actual, ...cambios };
    const otros = usuarios.filter(u => u !== actual);
    if (otros.some(u => limpiarRut(u.rut) === limpiarRut(actualizado.rut))) {
        throw new Error('Este RUT ya está registrado.');
    }
    if (otros.some(u => mismoCorreo(u.correo, actualizado.correo))) {
        throw new Error('Este correo ya está registrado.');
    }
    const lista = usuarios.map(u => (u === actual ? actualizado : u));
    guardarUsuarios(lista);
    return lista;
};

export const eliminarUsuario = (rut: string): Usuario[] => {
    const usuarios = getUsuarios();
    const lista = usuarios.filter(u => limpiarRut(u.rut) !== limpiarRut(rut));
    if (lista.length === usuarios.length) throw new Error('El usuario que intentas eliminar no existe.');
    guardarUsuarios(lista);
    return lista;
};

export const getProductos = (): Producto[] => {
    const guardados = leerJSON<Producto[]>('productos');
    if (!Array.isArray(guardados)) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        return [...productosIniciales];
    }
    return guardados;
};

export const guardarProductos = (productos: Producto[]) => {
    localStorage.setItem('productos', JSON.stringify(productos));
};

const mismoCodigo = (a: string, b: string) => a.trim().toUpperCase() === b.trim().toUpperCase();

export const obtenerProducto = (codigo: string): Producto | undefined =>
    getProductos().find(p => mismoCodigo(p.codigo, codigo));

export const crearProducto = (nuevo: Producto): Producto[] => {
    const productos = getProductos();
    if (productos.some(p => mismoCodigo(p.codigo, nuevo.codigo))) {
        throw new Error('Este código ya existe.');
    }
    const lista = [...productos, nuevo];
    guardarProductos(lista);
    return lista;
};

export const actualizarProducto = (codigoOriginal: string, cambios: Partial<Producto>): Producto[] => {
    const productos = getProductos();
    const actual = productos.find(p => mismoCodigo(p.codigo, codigoOriginal));
    if (!actual) throw new Error('El producto que intentas editar no existe.');
    const actualizado = { ...actual, ...cambios };
    if (productos.some(p => p !== actual && mismoCodigo(p.codigo, actualizado.codigo))) {
        throw new Error('Este código ya existe.');
    }
    const lista = productos.map(p => (p === actual ? actualizado : p));
    guardarProductos(lista);
    return lista;
};

export const eliminarProducto = (codigo: string): Producto[] => {
    const productos = getProductos();
    const lista = productos.filter(p => !mismoCodigo(p.codigo, codigo));
    if (lista.length === productos.length) throw new Error('El producto que intentas eliminar no existe.');
    guardarProductos(lista);
    return lista;
};
