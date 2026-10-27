import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [abierto, setAbierto] = useState(false);
    const cerrar = () => setAbierto(false);

    const handleLogout = () => {
        cerrar();
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light w-100">
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div className="container-fluid px-4">
                <Link className="navbar-brand text-warning fw-bold" to="/admin" onClick={cerrar}>Admin Sonido Vivo</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-label="Abrir menú de administración"
                    aria-expanded={abierto}
                    onClick={() => setAbierto(!abierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                    <Link className="nav-link" to="/admin/mantenedor" onClick={cerrar}>Mantenedor Productos</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/admin/usuarios" onClick={cerrar}>Mantenedor Usuarios</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/iniciopublico" onClick={cerrar}>Ver tienda</Link>
                    </li>
                    <li className="nav-item">
                    <button type="button" onClick={handleLogout} className="btn btn-outline-danger btn-sm ms-lg-3 my-2 my-lg-0">Cerrar Sesión</button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </header>

        <main className="flex-grow-1 w-100">
            <Outlet />
        </main>
        </div>
    );
};

export default AdminLayout;