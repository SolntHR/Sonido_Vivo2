import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../data/AuthContext';

export const RutaProtegida = () => {
    const { user } = useAuth();

  // Si no hay usuario logueado, redirigimos al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario, renderizamos la vista hija (el Admin)
    return <Outlet />;
};
