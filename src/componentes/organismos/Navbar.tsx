import { useState } from "react";
import { Link } from "react-router-dom";

const enlaces = [
    { to: "/iniciopublico", texto: "Inicio" },
    { to: "/productos", texto: "Productos" },
    { to: "/noticias", texto: "Noticias" },
    { to: "/quienes", texto: "Quienes somos" },
    { to: "/contacto", texto: "Contacto" },
    { to: "/login", texto: "Iniciar Sesión" },
];

function Navbar() {
    const [abierto, setAbierto] = useState(false);
    const cerrar = () => setAbierto(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top shadow border-bottom border-gold">
            <div className="container-fluid">
                <Link className="navbar-brand p-0" to="/iniciopublico" onClick={cerrar}>
                    <img
                        src="/img/logosonidovivo.png"
                        alt="Sonido Vivo"
                        width="100"
                        height="70"
                        style={{ objectFit: "contain" }}
                    />
                </Link>

                <button
                    className="navbar-toggler border-gold"
                    type="button"
                    aria-label="Abrir menú"
                    aria-expanded={abierto}
                    onClick={() => setAbierto(!abierto)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${abierto ? "show" : ""}`}>
                    <ul className="navbar-nav ms-auto align-items-center">
                        {enlaces.map((e) => (
                            <li className="nav-item" key={e.to}>
                                <Link className="nav-link fs-5 px-3 fw-medium" to={e.to} onClick={cerrar}>
                                    {e.texto}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
