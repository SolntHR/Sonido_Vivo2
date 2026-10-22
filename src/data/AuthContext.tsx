import { createContext, useContext, useState } from 'react';
// Usamos "import type" para ReactNode
import type { ReactNode } from 'react';
import { getUsuarios } from './db';
// Usamos "import type" para Usuario
import type { Usuario } from './db';


interface AuthContextType {
    user: Usuario | null;
    login: (correo: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Usuario | null>(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
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

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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