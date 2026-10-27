import BotonDorado from "../componentes/atomos/BotonDorado";

const valores = [
    { titulo: "Pasión por la música", texto: "Somos músicos atendiendo a músicos. Sabemos lo que buscas porque también lo buscamos." },
    { titulo: "Calidad garantizada", texto: "Trabajamos con marcas reconocidas y revisamos cada instrumento antes de que llegue a tus manos." },
    { titulo: "Asesoría real", texto: "Te ayudamos a elegir según tu nivel, estilo y presupuesto, sin letra chica." },
];

const equipo = [
    { nombre: "Solange Hernández", cargo: "Ingeniería en Software", descripcion: "Lógica de negocio, catálogo, carrito y módulos de administración." },
    { nombre: "Matías Mazzo", cargo: "Ingeniería en Software", descripcion: "Diseño visual, interfaz luxury y experiencia de usuario." },
];

function Quienes() {
    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <span className="text-gold fw-bold text-uppercase text-tracking">
                    Nuestra historia
                </span>
                <h1 className="display-5 fw-bold">Quienes somos</h1>
            </div>

            <div className="row align-items-center mb-5">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <h2 className="fw-bold mb-4 text-gold text-uppercase">Sobre Sonido Vivo</h2>
                    <p className="lead text-light mb-4">
                        Fundada con la misión de proveer equipos de nivel superior, somos el punto de encuentro exclusivo 
                        para músicos que buscan excelencia y el diseño más selecto en Chile.
                    </p>
                    <p className="text-secondary fs-5" style={{ lineHeight: "1.8" }}> 
                        Nos dedicamos a la venta y distribución de instrumentos musicales, equipos de estudio y accesorios especializados. 
                        Buscamos ser el principal aliado en tu proceso creativo, ofreciendo un catálogo variado que responda a las 
                        necesidades técnicas y artísticas de cada cliente.
                    </p>
                </div>
                
                <div className="col-lg-6 text-center">
                    <img 
                        src="/img/logosonidovivo.png" 
                        alt="Tienda Sonido Vivo" 
                        className="img-fluid rounded shadow border border-gold border-2 img-logo-grande" 
                    />
                </div>
            </div>

            <hr className="my-5 border-gold border-2 opacity-50" />

            <div className="text-center mb-5">
                <h3 className="fw-bold text-uppercase text-light">Nuestros Valores</h3>
            </div>
            
            <div className="row g-4 mb-5">
                {valores.map((v) => (
                    <div className="col-12 col-md-4" key={v.titulo}>
                        <div className="card card-quienes h-100 p-4 text-start bg-dark border-secondary shadow-sm">
                            <h4 className="text-gold fw-bold">{v.titulo}</h4>
                            <p className="mb-0 text-light">{v.texto}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mb-4 mt-5">
                <h3 className="fw-bold text-gold text-uppercase">Equipo Desarrollador</h3>
            </div>
            
            <div className="row justify-content-center g-4 mb-5">
                {equipo.map((persona) => (
                    <div className="col-12 col-md-6 col-lg-5" key={persona.nombre}>
                        <div className="card card-quienes h-100 mx-auto bg-dark border-secondary text-center p-4 shadow-sm">
                            <h4 className="text-white fw-bold mb-1">{persona.nombre}</h4>
                            <h6 className="text-gold mb-3">{persona.cargo}</h6>
                            <p className="text-secondary mb-0">{persona.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-5 pt-4">
                <BotonDorado to="/productos" grande>Ver catálogo</BotonDorado>
            </div>
        </div>
    );
}

export default Quienes;
