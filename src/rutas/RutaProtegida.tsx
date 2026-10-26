import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Usuario } from '../data/db';

interface RutaProtegidaProps {
    // Si se indica, solo los usuarios con ese rol pueden entrar
    rol?: Usuario['rol'];
}

export const RutaProtegida = ({ rol }: RutaProtegidaProps) => {
    const { user } = useAuth();

    // Si no hay usuario logueado, redirigimos al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si hay un rol requerido y el usuario no lo tiene, lo devolvemos al inicio
    if (rol && user.rol !== rol) {
        return <Navigate to="/iniciopublico" replace />;
    }

    return <Outlet />;
};
