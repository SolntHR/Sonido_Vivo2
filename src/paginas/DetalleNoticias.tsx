import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BotonDorado from "../componentes/atomos/BotonDorado";
import { ErrorApi } from "../api/cliente";
import { obtenerNoticia, type Noticia } from "../api/noticias";

function extraerBloques(contenido: string) {
    const documento = new DOMParser().parseFromString(contenido, "text/html");
    const elementos = Array.from(documento.body.children);
    const permitidos = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "LI", "BLOCKQUOTE"]);
    const bloques = elementos
        .filter((elemento) => permitidos.has(elemento.tagName))
        .map((elemento) => ({
            esTitulo: /^H[1-6]$/.test(elemento.tagName),
            texto: elemento.textContent?.trim() ?? "",
        }))
        .filter((bloque) => bloque.texto.length > 0);

    if (bloques.length > 0) return bloques;

    const texto = documento.body.textContent?.trim() ?? "";
    return texto ? [{ esTitulo: false, texto }] : [];
}

function NoticiaDetalle() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState<Noticia | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [noEncontrada, setNoEncontrada] = useState(false);

    useEffect(() => {
        let cancelado = false;
        const idValido = id && /^[1-9]\d*$/.test(id);

        setNoticia(null);
        setError(null);
        setNoEncontrada(false);
        setCargando(Boolean(idValido));

        if (!idValido) {
            setNoEncontrada(true);
            return () => { cancelado = true; };
        }

        obtenerNoticia(idValido)
            .then((respuesta) => {
                if (!cancelado) setNoticia(respuesta);
            })
            .catch((error: unknown) => {
                if (cancelado) return;
                if (error instanceof ErrorApi && error.status === 404) {
                    setNoEncontrada(true);
                } else {
                    setError(error instanceof Error ? error.message : "No se pudo cargar la noticia.");
                }
            })
            .finally(() => {
                if (!cancelado) setCargando(false);
            });

        return () => { cancelado = true; };
    }, [id]);

    if (cargando) {
        return <p className="container my-5 text-center text-secondary" role="status">Cargando noticia...</p>;
    }

    if (error) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-danger" role="alert">No se pudo cargar la noticia: {error}</div>
                <Link to="/noticias" className="btn btn-outline-gold mt-3">Volver a Noticias</Link>
            </div>
        );
    }

    if (noEncontrada || !noticia) {
        return (
            <div className="container my-5 text-center">
                <h2 className="text-gold">Noticia no encontrada</h2>
                <Link to="/noticias" className="btn btn-outline-gold mt-3">Volver a Noticias</Link>
            </div>
        );
    }

    const fechaFormateada = new Date(noticia.fecha + "T00:00:00").toLocaleDateString("es-CL", {
        day: "numeric", month: "long", year: "numeric"
    });
    const bloques = extraerBloques(noticia.contenido);

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

            {noticia.imagen && <div className="mb-5 text-center">
                <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="img-fluid rounded border border-gold border-2"
                    style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
                />
            </div>}

            <div className="fs-5 lh-lg text-light mb-5" style={{ textAlign: "justify" }}>
                <p className="mb-4 fw-medium">{noticia.resumen}</p>
                {bloques.map((bloque, index) => bloque.esTitulo ? (
                    <h3 key={index} className="fw-bold mt-4 mb-3 text-light">{bloque.texto}</h3>
                ) : (
                    <p key={index} className="mb-4">{bloque.texto}</p>
                ))}
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
