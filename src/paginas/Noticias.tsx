import { noticias } from "../data/noticias";

function Noticias() {
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <span className="text-gold fw-bold text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>
                    Lo último en Sonido Vivo
                </span>
                <h1 className="display-5 fw-bold">Noticias</h1>
            </div>

            {noticias.length === 0 ? (
                <p className="text-center text-secondary">Aún no hay noticias publicadas. ¡Vuelve pronto!</p>
            ) : (
                <div className="row g-4">
                    {noticias.map((n) => (
                        <div className="col-12 col-md-6 col-lg-4" key={n.id}>
                            <article className="card h-100 overflow-hidden text-start">
                                <img src={n.imagen} alt={n.titulo} style={{ height: "200px", objectFit: "cover" }} />
                                <div className="card-body">
                                    <small className="text-gold text-uppercase">
                                        {new Date(n.fecha + "T00:00:00").toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
                                    </small>
                                    <h5 className="card-title mt-2">{n.titulo}</h5>
                                    <p className="card-text mb-0">{n.resumen}</p>
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
