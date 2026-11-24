// Tipos de datos que entrega el backend (mismos nombres que los DTO de Spring Boot)

export type Rol = 'Cliente' | 'Administrador';

export interface Usuario {
    id: number;
    rut: string;
    nombre: string;
    correo: string;
    rol: Rol;
    activo: boolean;
    region?: string;
    comuna?: string;
    telefono?: string;
    foto?: string;
    fechaCreacion?: string;
}

export interface Producto {
    id: number;
    codigo: string;
    nombreproducto: string;
    categoria: string;
    idCategoria: number;
    marca: string;
    modelo: string;
    precio: number;
    stock: number;
    descripcion?: string;
    imagen?: string;
}

export interface Categoria {
    id: number;
    nombre: string;
    descripcion?: string;
    imagen?: string;
    cantidadProductos: number;
}

export interface LoginResponse {
    token: string;
    tipo: string;
    expiraEnSegundos: number;
    usuario: Usuario;
}

export type EstadoMensaje = 'PENDIENTE' | 'ATENDIDO';

/** Mensaje del formulario de Contacto (ContactoResponse del microservicio contacto) */
export interface MensajeContacto {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
    estado: EstadoMensaje;
    fechaCreacion: string;
    respuesta?: string;
    fechaRespuesta?: string;
}

/** Noticia del blog (NoticiaResponse del microservicio noticias) */
export interface Noticia {
    id: number;
    categoria: string;
    titulo: string;
    fecha: string;
    resumen: string;
    contenido: string;
    imagen?: string;
}
