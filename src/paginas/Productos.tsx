import CardProducto from "../componentes/moleculas/CardProducto";
import { productos } from "../data/coleccion";

function Productos(){
    return(
        <div className="container mt-4">
            <h1>Catalogo</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                {productos.map((producto) => (
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
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Productos;