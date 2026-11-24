import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BotonDorado from "../componentes/atomos/BotonDorado";
import { bloquesContenido, obtenerNoticia } from "../api/noticias";
import { ErrorApi } from "../api/cliente";
import type { Noticia } from "../api/tipos";

function NoticiaDetalle() {
    const { id } = useParams();
    // Resultado de GET /noticias/{id}, asociado al id que se pidió
    const [resultado, setResultado] = useState<{ id?: string; noticia?: Noticia; error?: string }>({});

    useEffect(() => {
        if (!id) return;
        obtenerNoticia(Number(id))
            .then((noticia) => setResultado({ id, noticia }))
            .catch((error) => setResultado({
                id,
                error: error instanceof ErrorApi && error.status !== 404
                    ? "No se pudo cargar la noticia: el servicio no está disponible."
                    : "Noticia no encontrada",
            }));
    }, [id]);

    if (resultado.id !== id) {
        return <p className="container my-5 text-center text-secondary">Cargando noticia...</p>;
    }

    const noticia = resultado.noticia;
    if (!noticia) {
        return (
            <div className="container my-5 text-center">
                <h2 className="text-gold">{resultado.error}</h2>
                <Link to="/noticias" className="btn btn-outline-gold mt-3">Volver a Noticias</Link>
            </div>
        );
    }

    const fechaFormateada = new Date(noticia.fecha + "T00:00:00").toLocaleDateString("es-CL", {
        day: "numeric", month: "long", year: "numeric"
    });

    return (
        <div className="container my-5" style={{ maxWidth: "900px" }}>
            <nav aria-label="breadcrumb" className="mb-4 small">
                <Link to="/noticias" className="text-secondary text-decoration-none">Noticias</Link>
                <span className="text-secondary mx-2">/</span>
                <span className="text-gold" aria-current="page">{noticia.titulo}</span>
            </nav>

            <h1 className="display-5 fw-bold text-white mb-3">{noticia.titulo}</h1>
            <p className="text-secondary mb-4">
                <span className="text-light fw-medium">{noticia.categoria}</span> | Publicado el {fechaFormateada}
            </p>

            {noticia.imagen && (
                <div className="mb-5 text-center">
                    <img
                        src={noticia.imagen}
                        alt={noticia.titulo}
                        className="img-fluid rounded border border-gold border-2"
                        style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
                    />
                </div>
            )}

            <div className="fs-5 lh-lg text-light mb-5" style={{ textAlign: "justify" }}>
                <p className="mb-4 fw-medium">{noticia.resumen}</p>
                {bloquesContenido(noticia.contenido).map((bloque, index) =>
                    bloque.tipo === "subtitulo"
                        ? <h3 key={index} className="fw-bold mt-4 mb-3 text-light">{bloque.texto}</h3>
                        : <p key={index} className="mb-4">{bloque.texto}</p>
                )}
            </div>

            <div className="card bg-black border-gold border-2 text-center py-5 px-4 mb-4">
                <h4 className="text-gold fw-bold mb-3">¿Te inspiraste?</h4>
                <p className="text-light mb-4">Revisa nuestro catálogo para encontrar el equipamiento ideal para tu sonido.</p>
                <div>
                    <BotonDorado to="/productos">Ir al Catálogo</BotonDorado>
                </div>
            </div>
        </div>
    );
}

export default NoticiaDetalle;
