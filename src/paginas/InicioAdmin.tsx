import { Link } from "react-router-dom";
import { getProductos, getUsuarios } from "../data/db";
import { useAuth } from "../data/AuthContext";

const InicioAdmin = () => {
    const { user } = useAuth();
    const productos = getProductos();
    const usuarios = getUsuarios();
    const sinStock = productos.filter((p) => p.stock === 0).length;

    const resumen = [
        { titulo: "Productos", valor: productos.length, to: "/admin/mantenedor", boton: "Gestionar productos" },
        { titulo: "Usuarios", valor: usuarios.length, to: "/admin/usuarios", boton: "Gestionar usuarios" },
    ];

    return (
        <div className="container my-5">
            <h1 className="fw-bold">Panel de Control</h1>
            <p className="text-secondary mb-4">Bienvenido{user ? `, ${user.nombre}` : ""}. Desde aquí administras la tienda.</p>

            <div className="row g-4">
                {resumen.map((r) => (
                    <div className="col-12 col-md-6 col-lg-4" key={r.titulo}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-start">
                                <h6 className="text-uppercase text-secondary">{r.titulo}</h6>
                                <p className="display-5 fw-bold mb-3">{r.valor}</p>
                                <Link to={r.to} className="btn btn-dark btn-sm">{r.boton}</Link>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body text-start">
                            <h6 className="text-uppercase text-secondary">Productos sin stock</h6>
                            <p className={`display-5 fw-bold mb-3 ${sinStock > 0 ? "text-danger" : "text-success"}`}>{sinStock}</p>
                            <small className="text-secondary">{sinStock > 0 ? "Revisa el mantenedor para reponer." : "Todo el catálogo tiene stock."}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioAdmin;
