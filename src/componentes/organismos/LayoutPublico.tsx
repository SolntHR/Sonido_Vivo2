import { Outlet } from 'react-router-dom';
import Navbar  from './Navbar'; // Tu navbar público

const PublicLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-patron-infinito">
        <Navbar /> {/* Se muestra siempre */}
        
        <main className="flex-grow-1">
            <Outlet /> {/* Aquí se cargan Login, Registro, Inicio, etc. */}
        </main>

        {/* Si tienes un Footer público, lo pones aquí */}
        <footer className="bg-black text-white text-center py-4 mt-auto border-top border-gold border-2">
            <div className="container">
            <p className="mb-1 text-gold">&copy; 2026 Sonido Vivo. Colección Exclusiva.</p>
            </div>
        </footer>
        </div>
    );
};

export default PublicLayout;