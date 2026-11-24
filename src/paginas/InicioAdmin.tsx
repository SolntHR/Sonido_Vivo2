import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { listarProductos } from "../api/productos";
import { listarUsuarios } from "../api/usuarios";
import { listarMensajes } from "../api/contactos";
import { listarNoticias } from "../api/noticias";
import type { MensajeContacto, Noticia, Producto, Usuario } from "../api/tipos";
import { useAuth } from "../context/AuthContext";

const InicioAdmin = () => {
    const { user } = useAuth();
    // Datos reales del backend: GET /productos y GET /usuarios
    const [productos, setProductos] = useState<Producto[] | null>(null);
    const [usuarios, setUsuarios] = useState<Usuario[] | null>(null);
    const [noticias, setNoticias] = useState<Noticia[] | null>(null);
    const [mensajes, setMensajes] = useState<MensajeContacto[] | null>(null);

    useEffect(() => {
        Promise.all([listarProductos(), listarUsuarios()])
            .then(([listaProductos, listaUsuarios]) => {
                setProductos(listaProductos);
                setUsuarios(listaUsuarios);
            })
            .catch(() => {
                setProductos([]);
                setUsuarios([]);
            });
        // Noticias y mensajes vienen de otros microservicios: si uno falla, el resto del panel sigue funcionando
        listarNoticias().then(setNoticias).catch(() => setNoticias([]));
        listarMensajes().then(setMensajes).catch(() => setMensajes([]));
    }, []);

    const agotados = productos ? productos.filter((p) => p.stock === 0) : [];
    const pendientes = mensajes ? mensajes.filter((m) => m.estado === "PENDIENTE").length : 0;

    // Mientras carga se muestra "…". "detalle" es una línea opcional bajo el número
    const resumen: { titulo: string; valor: number | string; to: string; boton: string; detalle?: ReactNode }[] = [
        { titulo: "Productos", valor: productos ? productos.length : "…", to: "/admin/mantenedor", boton: "Gestionar productos" },
        { titulo: "Usuarios", valor: usuarios ? usuarios.length : "…", to: "/admin/usuarios", boton: "Gestionar usuarios" },
        { titulo: "Noticias", valor: noticias ? noticias.length : "…", to: "/admin/noticias", boton: "Gestionar noticias" },
        {
            titulo: "Mensajes de contacto",
            valor: mensajes ? mensajes.length : "…",
            to: "/admin/mensajes",
            boton: "Ver mensajes",
            detalle: mensajes && (
                <span className={pendientes > 0 ? "text-danger fw-semibold" : "text-success"}>
                    {pendientes > 0 ? `${pendientes} mensaje(s) pendiente(s) de respuesta.` : "Todos los mensajes están respondidos."}
                </span>
            ),
        },
        {
            titulo: "Productos sin stock",
            valor: productos ? agotados.length : "…",
            to: "/admin/mantenedor?stock=agotados",
            boton: "Ver en el mantenedor",
            detalle: productos && (agotados.length === 0
                ? <span className="text-success">Todo el catálogo tiene stock.</span>
                : <span className="text-danger fw-semibold">
                    {agotados.slice(0, 3).map((p) => p.nombreproducto).join(", ")}
                    {agotados.length > 3 ? ` y ${agotados.length - 3} más.` : "."}
                  </span>),
        },
    ];

    return (
        <div className="container my-5">
            <h1 className="fw-bold">Panel de Control</h1>
            <p className="text-secondary mb-4">Bienvenido{user ? `, ${user.nombre}` : ""}. Desde aquí administras la tienda.</p>

            <div className="row g-4">
                {resumen.map((r) => (
                    <div className="col-12 col-md-6 col-lg-4" key={r.titulo}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-start d-flex flex-column">
                                <h6 className="text-uppercase text-secondary">{r.titulo}</h6>
                                <p className="display-5 fw-bold mb-2">{r.valor}</p>
                                {r.detalle && <small className="mb-3">{r.detalle}</small>}
                                <div className="mt-auto">
                                    <Link to={r.to} className="btn btn-dark btn-sm">{r.boton}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InicioAdmin;
