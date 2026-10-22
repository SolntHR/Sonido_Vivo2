import { createContext, useContext, useState } from 'react';
// Usamos "import type" para ReactNode
import type { ReactNode } from 'react';
import { getUsuarios, guardarUsuarios } from './db';
// Usamos "import type" para Usuario
import type { Usuario } from './db';

// Campos que el propio usuario puede modificar desde su perfil
export type CambiosPerfil = Partial<Pick<Usuario, 'nombre' | 'telefono' | 'region' | 'comuna' | 'foto'>>;

interface AuthContextType {
    user: Usuario | null;
    login: (correo: string, password: string) => boolean;
    logout: () => void;
    actualizarPerfil: (cambios: CambiosPerfil) => void;
    // Devuelve un mensaje de error, o null si se cambió correctamente
    cambiarPassword: (actual: string, nueva: string) => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (!savedUser) return null;
        const guardado: Usuario = JSON.parse(savedUser);
        // Refrescamos con la versión más reciente de la lista (por si un admin la editó o la eliminó)
        return getUsuarios().find(u => u.rut === guardado.rut) ?? null;
    });

    const login = (correo: string, password: string) => {
        const usuarios = getUsuarios();
        const found = usuarios.find(u => u.correo === correo && u.password === password);
        if (found) {
            setUser(found);
            localStorage.setItem('currentUser', JSON.stringify(found));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    // Guarda el cambio en el usuario activo y en la lista general de usuarios
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
