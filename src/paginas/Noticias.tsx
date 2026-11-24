import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarNoticias } from "../api/noticias";
import type { Noticia } from "../api/tipos";

const IMAGEN_POR_DEFECTO = "/img/logosonidovivo.png";

const formatearFechaNoticia = (fecha: string) =>
    new Date(fecha + "T00:00:00").toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });

function Noticias() {
    // GET /noticias (público): el backend las entrega de la más reciente a la más antigua
    const [noticias, setNoticias] = useState<Noticia[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listarNoticias()
            .then(setNoticias)
            .catch(() => setError("No se pudieron cargar las noticias: el servicio no está disponible en este momento."))
            .finally(() => setCargando(false));
    }, []);

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <span className="text-gold fw-bold text-uppercase text-tracking">
                    Lo último en Sonido Vivo
                </span>
                <h1 className="display-5 fw-bold">Noticias</h1>
            </div>

            {cargando ? (
                <p className="text-center text-secondary">Cargando noticias...</p>
            ) : error ? (
                <div className="alert alert-danger text-center">{error}</div>
            ) : noticias.length === 0 ? (
                <p className="text-center text-secondary">Aún no hay noticias publicadas. ¡Vuelve pronto!</p>
            ) : (
                <div className="row g-4">
                    {noticias.map((n) => (
                        <div className="col-12 col-md-6 col-lg-4" key={n.id}>
                            <article className="card h-100 bg-dark border-secondary text-start card-hover d-flex flex-column position-relative">
                                <img src={n.imagen || IMAGEN_POR_DEFECTO} alt={n.titulo} className="card-img-top img-noticia"/>
                                <div className="card-body d-flex flex-column">
                                    <small className="text-gold text-uppercase fw-bold">
                                        {n.categoria} · {formatearFechaNoticia(n.fecha)}
                                    </small>
                                    <h5 className="card-title mt-2">
                                        <Link to={`/noticias/${n.id}`} className="text-white text-decoration-none">
                                            {n.titulo}
                                        </Link>
                                    </h5>
                                    <p className="card-text mb-4 text-secondary flex-grow-1">{n.resumen}</p>
                                    <div className="mt-auto">
                                        <Link to={`/noticias/${n.id}`} className="btn btn-outline-gold w-100">
                                            Leer noticia
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Noticias;
