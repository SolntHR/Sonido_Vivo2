import { productos as productosIniciales } from './Coleccion';

export interface Usuario {
    rut: string;
    nombre: string;
    correo: string;
    password?: string;
    rol: 'Cliente' | 'Administrador';
    activo: boolean;
    // Datos de perfil
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

// Datos iniciales por defecto
const usuariosDefault: Usuario[] = [
    { rut: "11111111-1", nombre: "Admin Test", correo: "admin@sonidovivo.cl", password: "12345678", rol: "Administrador", activo: true },
    { rut: "12345678-5", nombre: "Cliente Test", correo: "cliente@sonidovivo.cl", password: "12345678", rol: "Cliente", activo: true, region: "Región Metropolitana", comuna: "Santiago" }
];

// === CRUD USUARIOS ===
export const getUsuarios = (): Usuario[] => {
    const data = localStorage.getItem('usuarios');
    if (!data) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosDefault));
        return usuariosDefault;
    }
    const guardados: Usuario[] = JSON.parse(data);
    // Si falta algún usuario por defecto (ej: se agregó uno nuevo a usuariosDefault
    // después de que el navegador ya tenía datos guardados), lo agregamos.
    const faltantes = usuariosDefault.filter(d => !guardados.some(u => u.correo === d.correo));
    if (faltantes.length > 0) {
        const actualizados = [...guardados, ...faltantes];
        localStorage.setItem('usuarios', JSON.stringify(actualizados));
        return actualizados;
    }
    return guardados;
};

export const guardarUsuarios = (usuarios: Usuario[]) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

// === CRUD PRODUCTOS ===
export const getProductos = (): Producto[] => {
    const data = localStorage.getItem('productos');
    if (!data) {
        // Si no hay datos en localStorage, guardamos los 50 productos de Coleccion.ts
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        return productosIniciales;
    }
    return JSON.parse(data);
};

export const guardarProductos = (productos: Producto[]) => {
    localStorage.setItem('productos', JSON.stringify(productos));
};