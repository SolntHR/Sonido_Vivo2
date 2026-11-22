import { api } from './cliente';
import type { LoginResponse, Usuario } from './tipos';

export interface DatosRegistro {
    rut: string;
    nombre: string;
    correo: string;
    password: string;
    region?: string;
    comuna?: string;
    telefono?: string;
}

export const iniciarSesion = (correo: string, password: string) =>
    api<LoginResponse>('/auth/login', 'POST', { correo, password });

export const registrarse = (datos: DatosRegistro) =>
    api<Usuario>('/auth/registro', 'POST', datos);