import BotonDorado from "../componentes/atomos/BotonDorado";

const valores = [
    { titulo: "Pasión por la música", texto: "Somos músicos atendiendo a músicos. Sabemos lo que buscas porque también lo buscamos." },
    { titulo: "Calidad garantizada", texto: "Trabajamos con marcas reconocidas y revisamos cada instrumento antes de que llegue a tus manos." },
    { titulo: "Asesoría real", texto: "Te ayudamos a elegir según tu nivel, estilo y presupuesto, sin letra chica." },
];

function Quienes() {
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <span className="text-gold fw-bold text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>
                    Nuestra historia
                </span>
                <h1 className="display-5 fw-bold">Quienes somos</h1>
                <p className="lead mx-auto" style={{ maxWidth: "720px" }}>
                    Sonido Vivo es una tienda de instrumentos musicales y equipos de audio pensada para que
                    cada músico, desde el que recién empieza hasta el profesional, encuentre su sonido.
                </p>
            </div>

            <div className="row g-4 mb-5">
                {valores.map((v) => (
                    <div className="col-12 col-md-4" key={v.titulo}>
                        <div className="card h-100 p-4 text-start">
                            <h4 className="text-gold">{v.titulo}</h4>
                            <p className="mb-0">{v.texto}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center">
                <BotonDorado to="/productos" grande>Ver catálogo</BotonDorado>
            </div>
        </div>
    );
}

export default Quienes;
