import { api } from './cliente';

export interface DatosContacto {
    nombre: string;
    correo: string;
    mensaje: string;
}

export interface ContactoCreado {
    id: number;
    nombre: string;
    correo: string;
    mensaje: string;
    estado: string;
    fechaCreacion: string;
    respuesta?: string;
    fechaRespuesta?: string;
}

export const enviarMensajeContacto = (datos: DatosContacto) =>
    api<ContactoCreado>('/contactos', 'POST', datos);
