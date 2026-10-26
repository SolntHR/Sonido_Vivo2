import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../atomos/Avatar";
import { useAuth } from "../../context/AuthContext";
import "../../estilos/MenuUsuario.css";

// Burbuja con la foto del usuario en el navbar; al hacer clic abre su menú.
function MenuUsuario() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [abierto, setAbierto] = useState(false);
    const contenedor = useRef<HTMLDivElement>(null);

    // Cierra el menú al hacer clic fuera de él
    useEffect(() => {
        const alClickFuera = (e: MouseEvent) => {
            if (contenedor.current && !contenedor.current.contains(e.target as Node)) {
                setAbierto(false);
            }
        };
        document.addEventListener("mousedown", alClickFuera);
        return () => document.removeEventListener("mousedown", alClickFuera);
    }, []);

    if (!user) return null;

    const cerrarSesion = () => {
        setAbierto(false);
        logout();
        navigate("/login");
    };

    return (
        <div className="menu-usuario" ref={contenedor}>
            <button
                type="button"
                className="menu-usuario-boton"
                onClick={() => setAbierto(!abierto)}
                aria-expanded={abierto}
                aria-label="Menú de usuario"
            >
                <Avatar nombre={user.nombre} foto={user.foto} tamano={44} />
            </button>

            {abierto && (
                <div className="menu-usuario-panel">
                    <div className="menu-usuario-cabecera">
                        <strong className="d-block text-truncate">{user.nombre}</strong>
                        <small className="text-truncate d-block">{user.correo}</small>
                    </div>
                    <Link to="/perfil" onClick={() => setAbierto(false)}>Mi perfil</Link>
                    {user.rol === "Administrador" && (
                        <Link to="/admin" onClick={() => setAbierto(false)}>Panel de administración</Link>
                    )}
                    <button type="button" onClick={cerrarSesion}>Cerrar sesión</button>
                </div>
            )}
        </div>
    );
}

export default MenuUsuario;
