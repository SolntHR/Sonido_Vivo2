import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../data/AuthContext';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-light w-100">
        {/* Navbar de Admin extraído de tu index_admin.html */}
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div className="container-fluid px-4">
                <Link className="navbar-brand text-warning fw-bold" to="/admin">Admin Sonido Vivo</Link>
                <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                    <Link className="nav-link" to="/admin/mantenedor">Mantenedor Productos</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/admin/usuarios">Mantenedor Usuarios</Link>
                    </li>
                    <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm ms-3">Cerrar Sesión</button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </header>

        <main className="flex-grow-1 w-100">
            <Outlet /> {/* Aquí se carga InicioAdmin, AdminUsuarios, etc. */}
        </main>
        </div>
    );
};

export default AdminLayout;