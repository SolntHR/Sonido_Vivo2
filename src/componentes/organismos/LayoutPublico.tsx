import { Outlet } from 'react-router-dom';
import Navbar  from './Navbar';
import PanelCarrito from './PanelCarrito';

const PublicLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 bg-patron-infinito">
        <Navbar />
        <PanelCarrito />

        <main className="flex-grow-1">
            <Outlet />
        </main>

        <footer className="bg-black text-white text-center py-4 mt-auto border-top border-gold border-2">
            <div className="container">
            <p className="mb-1 text-gold">&copy; 2026 Sonido Vivo. Colección Exclusiva.</p>
            </div>
        </footer>
        </div>
    );
};

export default PublicLayout;