import { useSearchParams } from "react-router-dom";
import CardProducto from "../componentes/moleculas/CardProducto";
import { productos } from "../data/Coleccion";
import { useCart } from "../context/CartContext";

function Productos(){
    const { agregarAlCarrito } = useCart();
    // /productos?categoria=Baterías filtra por categoría (viene de las tarjetas del inicio)
    const [params] = useSearchParams();
    const categoria = params.get("categoria");
    const lista = categoria
        ? productos.filter((p) => p.categoria === categoria)
        : productos;

    return(
        <div className="container mt-4">
            <h1>{categoria ?? "Catalogo"}</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                {lista.map((producto) => (
                    <div className="col d-flex gap-3" key={producto.codigo}>
                        <CardProducto
                            codigo={producto.codigo}
                            categoria={producto.categoria}
                            nombreproducto={producto.nombreproducto}
                            marca={producto.marca}
                            modelo={producto.modelo}
                            stock={producto.stock}
                            precio={producto.precio}
                            descripcion={producto.descripcion}
                            imagen={producto.imagen}
                            onAgregarCarrito={() => agregarAlCarrito(producto)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Productos;