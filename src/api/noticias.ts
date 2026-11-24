import { api } from './cliente';

/** DTO devuelto por el microservicio noticias. */
export interface Noticia {
    id: number;
    categoria: string;
    titulo: string;
    fecha: string;
    resumen: string;
    contenido: string;
    imagen?: string;
}

export const listarNoticias = () => api<Noticia[]>('/noticias');

export const obtenerNoticia = (id: number | string) =>
    api<Noticia>(`/noticias/${encodeURIComponent(String(id))}`);
