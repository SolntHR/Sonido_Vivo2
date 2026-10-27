import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getUsuarios, guardarUsuarios, leerJSON } from '../data/db';
import type { Usuario } from '../data/db';

export type CambiosPerfil = Partial<Pick<Usuario, 'nombre' | 'telefono' | 'region' | 'comuna' | 'foto'>>;

interface AuthContextType {
    user: Usuario | null;
    login: (correo: string, password: string) => Usuario | null;
    logout: () => void;
    actualizarPerfil: (cambios: CambiosPerfil) => void;
    cambiarPassword: (actual: string, nueva: string) => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(() => {
        const guardado = leerJSON<Usuario>('currentUser');
        if (!guardado?.rut) return null;
        return getUsuarios().find(u => u.rut === guardado.rut && u.activo !== false) ?? null;
    });

    const login = (correo: string, password: string) => {
        const usuarios = getUsuarios();
        const correoNormalizado = correo.trim().toLowerCase();
        const found = usuarios.find(u =>
            u.correo.toLowerCase() === correoNormalizado && u.password === password && u.activo !== false
        );
        if (!found) return null;
        setUser(found);
        localStorage.setItem('currentUser', JSON.stringify(found));
        return found;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const guardarUsuarioActual = (actualizado: Usuario) => {
        guardarUsuarios(getUsuarios().map(u => (u.rut === actualizado.rut ? actualizado : u)));
        localStorage.setItem('currentUser', JSON.stringify(actualizado));
        setUser(actualizado);
    };

    const actualizarPerfil = (cambios: CambiosPerfil) => {
        if (!user) return;
        guardarUsuarioActual({ ...user, ...cambios });
    };

    const cambiarPassword = (actual: string, nueva: string) => {
        if (!user) return "No hay una sesión activa.";
        if (user.password !== actual) return "La contraseña actual no es correcta.";
        guardarUsuarioActual({ ...user, password: nueva });
        return null;
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
