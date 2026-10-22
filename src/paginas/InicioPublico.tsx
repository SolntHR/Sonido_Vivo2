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
        </>
    );
}

export default InicioPublico;
