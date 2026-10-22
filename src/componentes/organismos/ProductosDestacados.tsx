import CardProducto from "../moleculas/CardProducto";
import BotonDorado from "../atomos/BotonDorado";
import { getProductos } from "../../data/db";

function ProductosDestacados() {
    // Un producto por categoría, para que la vitrina sea variada (máximo 4).
    const vistas = new Set<string>();
    const destacados = getProductos()
        .filter((p) => {
            if (vistas.has(p.categoria)) return false;
            vistas.add(p.categoria);
            return true;
        })
        .slice(0, 4);

    return (
        <main className="container my-5 py-5">
            <h2 className="text-center mb-5 text-gold text-uppercase">Productos Destacados</h2>

            <div className="row justify-content-center g-4">
                {destacados.map((p) => (
                    <div className="col-12 col-md-6 col-xl-3 d-flex justify-content-center" key={p.codigo}>
                        <CardProducto
                            codigo={p.codigo}
                            categoria={p.categoria}
                            nombreproducto={p.nombreproducto ?? `${p.marca} ${p.modelo}`}
                            marca={p.marca}
                            modelo={p.modelo}
                            stock={p.stock}
                            precio={p.precio}
                            descripcion={p.descripcion}
                            imagen={p.imagen ?? ""}
                        />
                    </div>
                ))}
            </div>

            <div className="text-center mt-5">
                <BotonDorado to="/productos" grande>Explorar Colección Completa</BotonDorado>
            </div>
        </main>
    );
}

export default ProductosDestacados;
