// Todas las llamadas al backend pasan por aquí

const URL_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8090';
const CLAVE_TOKEN = 'tokenSonidoVivo';

// Token de sesión

export const guardarToken = (token: string) => localStorage.setItem(CLAVE_TOKEN, token);
export const leerToken = () => localStorage.getItem(CLAVE_TOKEN);
export const borrarToken = () => localStorage.removeItem(CLAVE_TOKEN);

// Errores como los de errorReponse de java

export class ErrorApi extends Error {
    status: number;
    errores: Record<string, string>;

    constructor(status: number, mensaje: string, errores: Record<string, string> = {}) {
        super(mensaje);
        this.status = status;
        this.errores = errores;
    }
}

// Mensaje para las respuestas sin body (401 y 403 de Spring Security)
const mensajePorEstado = (status: number): string => {
    if (status === 401) return 'Debe iniciar sesión para realizar esta acción.';
    if (status === 403) return 'No tiene permisos para realizar esta acción.';
    if (status === 503) return 'El servicio no está disponible en este momento.';
    return 'Ocurrió un error inesperado.';
};

// Convierte los null del backend en undefined
const sinNulos = (_clave: string, valor: unknown) => (valor === null ? undefined : valor);

// Función para peticiones genérica

type Metodo = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export async function api<T>(ruta: string, metodo: Metodo = 'GET', cuerpo?: unknown): Promise<T> {
    const cabeceras: Record<string, string> = {};
    if (cuerpo !== undefined) cabeceras['Content-Type'] = 'application/json';

    const token = leerToken();
    if (token) cabeceras['Authorization'] = `Bearer ${token}`;

    let respuesta: Response;
    try {
        respuesta = await fetch(`${URL_BASE}${ruta}`, {
            method: metodo,
            headers: cabeceras,
            body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
        });
    } catch {
        throw new ErrorApi(0, 'No se pudo conectar con el servidor. Verifique que el backend esté encendido.');
    }

    // Token vencido o inválido: se cierra la sesión en toda la aplicación
    if (respuesta.status === 401 && token) {
        borrarToken();
        window.dispatchEvent(new Event('sesion-expirada'));
    }

    if (respuesta.status === 204) return undefined as T;

    const texto = await respuesta.text();
    let datos: { mensaje?: string; errores?: Record<string, string> } | null;
    try {
        datos = texto ? JSON.parse(texto, sinNulos) : null;
    } catch {
        datos = null;
    }

    if (!respuesta.ok) {
        throw new ErrorApi(respuesta.status, datos?.mensaje ?? mensajePorEstado(respuesta.status), datos?.errores ?? {});
    }
    return datos as T;
}