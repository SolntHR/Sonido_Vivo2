import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Usuario } from '../api/tipos';
import { iniciarSesion } from '../api/auth';
import { cambiarPassword as cambiarPasswordApi, editarPerfil, obtenerPerfil } from '../api/usuarios';
import type { CambiosPerfil } from '../api/usuarios';
import { borrarToken, ErrorApi, guardarToken, leerToken } from '../api/cliente';

export type { CambiosPerfil };

const CLAVE_USUARIO = 'usuarioSonidoVivo';
const CLAVE_EXPIRA = 'expiraSonidoVivo';

interface AuthContextType {
    user: Usuario | null;
    login: (correo: string, password: string) => Promise<Usuario>;
    logout: () => void;
    actualizarPerfil: (cambios: CambiosPerfil) => Promise<void>;
    cambiarPassword: (actual: string, nueva: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sesión guardada en el navegador

const limpiarSesion = () => {
    borrarToken();
    localStorage.removeItem(CLAVE_USUARIO);
    localStorage.removeItem(CLAVE_EXPIRA);
};

const guardarUsuario = (usuario: Usuario) => localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));

// Recupera la sesión al recargar la página, solo si el token existe y no ha vencido
const leerSesionGuardada = (): Usuario | null => {
    const token = leerToken();
    const expira = Number(localStorage.getItem(CLAVE_EXPIRA));
    const guardado = localStorage.getItem(CLAVE_USUARIO);
    if (!token || !guardado || !expira || Date.now() >= expira) {
        limpiarSesion();
        return null;
    }
    try {
        return JSON.parse(guardado) as Usuario;
    } catch {
        limpiarSesion();
        return null;
    }
};

// Proveedor

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(leerSesionGuardada);

    // Al abrir la página: escucha el aviso de sesión vencida (401) y confirma la sesión con el backend
    useEffect(() => {
        const cerrarPorExpiracion = () => {
            limpiarSesion();
            setUser(null);
        };
        window.addEventListener('sesion-expirada', cerrarPorExpiracion);

        if (leerToken()) {
            obtenerPerfil()
                .then((perfil) => {
                    guardarUsuario(perfil);
                    setUser(perfil);
                })
                .catch((error) => {
                    // 404: la cuenta ya no existe. El 401 lo maneja el evento 'sesion-expirada'
                    if (error instanceof ErrorApi && error.status === 404) cerrarPorExpiracion();
                });
        }
        return () => window.removeEventListener('sesion-expirada', cerrarPorExpiracion);
    }, []);

    // Cierra la sesión automáticamente cuando el token vence
    useEffect(() => {
        if (!user) return;
        const restante = Number(localStorage.getItem(CLAVE_EXPIRA)) - Date.now();
        const temporizador = setTimeout(() => {
            limpiarSesion();
            setUser(null);
        }, Math.max(restante, 0));
        return () => clearTimeout(temporizador);
    }, [user]);

    const login = async (correo: string, password: string) => {
        const respuesta = await iniciarSesion(correo.trim(), password);
        guardarToken(respuesta.token);
        localStorage.setItem(CLAVE_EXPIRA, String(Date.now() + respuesta.expiraEnSegundos * 1000));
        guardarUsuario(respuesta.usuario);
        setUser(respuesta.usuario);
        return respuesta.usuario;
    };

    const logout = () => {
        limpiarSesion();
        setUser(null);
    };

    const actualizarPerfil = async (cambios: CambiosPerfil) => {
        const actualizado = await editarPerfil(cambios);
        guardarUsuario(actualizado);
        setUser(actualizado);
    };

    //Devuelve null si se cambió, o el mensaje de error del backend
    const cambiarPassword = async (actual: string, nueva: string) => {
        try {
            await cambiarPasswordApi(actual, nueva);
            return null;
        } catch (error) {
            if (error instanceof ErrorApi) return error.errores.nueva ?? error.message;
            return 'No se pudo cambiar la contraseña.';
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, actualizarPerfil, cambiarPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};