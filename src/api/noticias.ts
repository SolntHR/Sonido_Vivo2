import { api } from './cliente';
import type { Noticia } from './tipos';

// Microservicio noticias (ruta /noticias en el Gateway)

export const listarNoticias = () => api<Noticia[]>('/noticias');

export const obtenerNoticia = (id: number) => api<Noticia>(`/noticias/${id}`);

/** Datos del formulario de administración */
export interface DatosNoticia {
    categoria: string;
    titulo: string;
    fecha: string; // formato AAAA-MM-DD
    resumen: string;
    contenido: string;
    imagen: string;
}

export const crearNoticia = (datos: DatosNoticia) => api<Noticia>('/noticias', 'POST', datos);

/** PATCH: se envían solo los campos modificados; imagen "" quita la imagen */
export const editarNoticia = (id: number, cambios: Partial<DatosNoticia>) =>
    api<Noticia>(`/noticias/${id}`, 'PATCH', cambios);

export const eliminarNoticia = (id: number) => api<void>(`/noticias/${id}`, 'DELETE');

/** Un bloque del contenido de una noticia: un subtítulo o un párrafo */
export interface BloqueNoticia {
    tipo: 'subtitulo' | 'parrafo';
    texto: string;
}

/**
 * Convierte el contenido de una noticia en bloques para mostrarlos con React.
 * - Con etiquetas HTML (datos iniciales: <p>, <h3>): se leen con DOMParser y se toma SOLO el texto de cada
 *   etiqueta. Nunca se inserta HTML en la página, así que un <script> guardado no se ejecutaría (protección XSS).
 * - Texto normal (noticias creadas desde el panel): los párrafos se separan con líneas en blanco.
 */
export const bloquesContenido = (contenido: string): BloqueNoticia[] => {
    if (/<\/?[a-z][\s\S]*>/i.test(contenido)) {
        const doc = new DOMParser().parseFromString(contenido, 'text/html');
        return Array.from(doc.body.children)
            .map((el): BloqueNoticia => ({
                tipo: /^H[1-6]$/.test(el.tagName) ? 'subtitulo' : 'parrafo',
                texto: (el.textContent ?? '').trim(),
            }))
            .filter(b => b.texto !== '');
    }
    return contenido.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
        .map((texto): BloqueNoticia => ({ tipo: 'parrafo', texto }));
};
