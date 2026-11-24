import { api } from './cliente';
import type { EstadoMensaje, MensajeContacto } from './tipos';

// Microservicio contacto (ruta /contactos en el Gateway)

export interface DatosMensaje {
    nombre: string;
    correo: string;
    mensaje: string;
}

/** Público. Si hay sesión, el backend usa el correo de la cuenta (viaja en el token) */
export const enviarMensaje = (datos: DatosMensaje) =>
    api<MensajeContacto>('/contactos', 'POST', datos);

/** Mensajes del usuario con sesión, con su estado y la respuesta de la tienda */
export const obtenerMisMensajes = () => api<MensajeContacto[]>('/contactos/mios');

// Solo Administrador

export const listarMensajes = () => api<MensajeContacto[]>('/contactos');

export const responderMensaje = (id: number, respuesta: string) =>
    api<MensajeContacto>(`/contactos/${id}/respuesta`, 'PATCH', { respuesta });

export const cambiarEstadoMensaje = (id: number, estado: EstadoMensaje) =>
    api<MensajeContacto>(`/contactos/${id}`, 'PATCH', { estado });

export const eliminarMensaje = (id: number) => api<void>(`/contactos/${id}`, 'DELETE');
