import { useState } from "react";
import { Link } from "react-router-dom";
import MenuUsuario from "./MenuUsuario";
import { useAuth } from "../../context/AuthContext";
import BotonCarrito from '../atomos/BotonCarrito';
import { useCart } from "../../context/useCart";

const enlaces = [
    { to: "/iniciopublico", texto: "Inicio" },
    { to: "/productos", texto: "Productos" },
    { to: "/noticias", texto: "Noticias" },
    { to: "/quienes", texto: "Quienes somos" },
    { to: "/contacto", texto: "Contacto" },
];

function Navbar() {
    const [abierto, setAbierto] = useState(false);
    const { user } = useAuth();
    const cerrar = () => setAbierto(false);
    const { cantidadTotal, abrirCarrito } = useCart();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top shadow border-bottom border-gold">
            <div className="container-fluid">
                <Link className="navbar-brand p-0 me-auto" to="/iniciopublico" onClick={cerrar}>
                    <img
                        src="/img/logosonidovivo.png"
                        alt="Sonido Vivo"
                        width="100"
                        height="70"
                        style={{ objectFit: "contain" }}
                    />
                </Link>
                <div className="d-flex align-items-center gap-3 order-lg-last">

                    <button
                    className="navbar-toggler border-gold"
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={abierto}
                    onClick={() => setAbierto(!abierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                    <BotonCarrito cantidad={cantidadTotal} onClick={abrirCarrito} />
            
                </div>

                <div className={`collapse navbar-collapse order-lg-1 ${abierto ? "show" : ""}`}>
                    <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
                        {enlaces.map((e) => (
                            <li className="nav-item" key={e.to}>
                                <Link className="nav-link fs-5 px-3 fw-medium" to={e.to} onClick={cerrar}>
                                    {e.texto}
                                </Link>
                            </li>
                        ))}
                        <li className="nav-item ms-lg-2 me-lg-4">
                            {user ? (
                                <MenuUsuario />
                            ) : (
                                <Link className="nav-link fs-5 px-3 fw-medium" to="/login" onClick={cerrar}>
                                    Iniciar Sesión
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
