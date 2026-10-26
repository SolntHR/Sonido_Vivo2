import { useParams, Link } from "react-router-dom";
import { noticias } from "../data/noticias";
import BotonDorado from "../componentes/atomos/BotonDorado";

function NoticiaDetalle() {
    const { id } = useParams();
    const noticia = noticias.find(n => n.id === Number(id));

    if (!noticia) {
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

    return (
        <div className="container my-5" style={{ maxWidth: "900px" }}>
            {/* Breadcrumbs */}
            <div className="mb-4 small">
                <Link to="/noticias" className="text-secondary text-decoration-none">Blog</Link>
                <span className="text-secondary mx-2">/</span>
                <span className="text-gold">Guías</span>
            </div>

            {/* Cabecera de la Noticia */}
            <h1 className="display-5 fw-bold text-white mb-3">{noticia.titulo}</h1>
            <p className="text-secondary mb-4">
                Por <span className="text-light fw-medium">{noticia.autor}</span> | Publicado el {fechaFormateada}
            </p>

            {/* Imagen Principal */}
            <div className="mb-5 text-center">
                <img 
                    src={noticia.imagen} 
                    alt={noticia.titulo} 
                    className="img-fluid rounded border border-gold border-2" 
                    style={{ width: "100%", maxHeight: "450px", objectFit: "cover" }}
                />
            </div>

            {/* Cuerpo de la Noticia */}
            <div className="fs-5 lh-lg text-light mb-5" style={{ textAlign: "justify" }}>
                <p className="mb-4 fw-medium">{noticia.resumen}</p>
                {noticia.contenido.map((parrafo, index) => (
                    <p key={index} className="mb-4">{parrafo}</p>
                ))}
            </div>

            {/* Recuadro Final (Call to Action) */}
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