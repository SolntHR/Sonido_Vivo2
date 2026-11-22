import { api } from './cliente';
import type { Usuario } from './tipos';

// Campos que el usuario puede cambiar en su propio perfil
export type CambiosPerfil = Partial<Pick<Usuario, 'nombre' | 'telefono' | 'region' | 'comuna' | 'foto'>>;

/*
 * En un PATCH, un campo con "" se borra en el backend.
 * Los campos enviados como undefined -por ejemplo, quitar la foto- se convierten en "" para que se borren.
 */
const paraPatch = (cambios: object) =>
    Object.fromEntries(Object.entries(cambios).map(([campo, valor]) => [campo, valor ?? '']));

// Perfil propio

export const obtenerPerfil = () => api<Usuario>('/usuarios/perfil');

export const editarPerfil = (cambios: CambiosPerfil) =>
    api<Usuario>('/usuarios/perfil', 'PATCH', paraPatch(cambios));

export const cambiarPassword = (actual: string, nueva: string) =>
    api<void>('/usuarios/perfil/password', 'PATCH', { actual, nueva });

export interface DatosUsuarioAdmin {
    rut: string;
    nombre: string;
    correo: string;
    rol: Usuario['rol'];
    password?: string;
}

export const listarUsuarios = () => api<Usuario[]>('/usuarios');

export const crearUsuario = (datos: DatosUsuarioAdmin) =>
    api<Usuario>('/usuarios', 'POST', datos);

export const editarUsuario = (id: number, cambios: Partial<DatosUsuarioAdmin>) =>
    api<Usuario>(`/usuarios/${id}`, 'PATCH', cambios);

export const eliminarUsuario = (id: number) =>
    api<void>(`/usuarios/${id}`, 'DELETE');