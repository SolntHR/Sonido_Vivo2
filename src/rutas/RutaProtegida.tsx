import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Usuario } from '../data/db';

interface RutaProtegidaProps {
    rol?: Usuario['rol'];
}

export const RutaProtegida = ({ rol }: RutaProtegidaProps) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (rol && user.rol !== rol) {
        return <Navigate to="/iniciopublico" replace />;
    }

    return <Outlet />;
};
