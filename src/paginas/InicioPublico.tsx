import MapaTienda from "../componentes/moleculas/MapaTienda";
import CarruselHero from "../componentes/organismos/CarruselHero";
import CategoriasScroll from "../componentes/organismos/CategoriasScroll";
import ProductosDestacados from "../componentes/organismos/ProductosDestacados";

function InicioPublico() {
    return (
        <>
            <CarruselHero />

            <section className="container my-5 py-5">
                <div className="row mb-4 align-items-end text-start">
                    <div className="col-md-8">
                        <span className="text-gold fw-bold text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>
                            Compra por categoría
                        </span>
                        <h2 className="display-5 fw-bold mb-0 text-light">Encuentra lo que necesitas para tocar</h2>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                        <p className="mb-0 small text-secondary">
                            Explora instrumentos, audio y accesorios organizados para llegar rápidamente al producto que estás buscando.
                        </p>
                    </div>
                </div>

                <CategoriasScroll />
            </section>

            <ProductosDestacados />

            <section className="container mb-5 pb-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="card p-4 text-start">
                            <h4 className="text-gold mb-3">Dónde estamos</h4>
                            <p>Visítanos en nuestra tienda física. También es nuestro punto de retiro de pedidos.</p>
                            <MapaTienda alto={320} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default InicioPublico;
