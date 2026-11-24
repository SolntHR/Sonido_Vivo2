import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductoPorCodigo } from "../api/productos";
import type { Producto } from "../api/tipos";
import CardDetalle from '../componentes/moleculas/CardDetalle';
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useCart } from "../context/useCart";

function DetalleProducto() {
    const { agregarAlCarrito } = useCart();
    const { codigo } = useParams<{ codigo: string }>();

    // Resultado de la consulta, asociado al código que se pidió
    const [resultado, setResultado] = useState<{ codigo?: string; producto?: Producto }>({});

    // GET /productos/codigo/{codigo} cada vez que cambia el código de la URL
    useEffect(() => {
        if (!codigo) return;
        obtenerProductoPorCodigo(codigo)
            .then((producto) => setResultado({ codigo, producto }))
            .catch(() => setResultado({ codigo }));
    }, [codigo]);

    const cargando = Boolean(codigo) && resultado.codigo !== codigo;
    const producto = resultado.codigo === codigo ? resultado.producto : undefined;

    if (cargando) {
        return <div className="container my-5 text-center text-secondary">Cargando producto...</div>;
    }

    if (!producto) {
        return (
            <div className="container my-5 text-center">
                <h2>Producto no encontrado</h2>
                <p className="text-secondary">No existe un producto con el código "{codigo}".</p>
                <BotonVolver />
            </div>
        );
    }

    return (
        <div className="container my-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb bg-transparent p-0 mb-0">
          <li className="breadcrumb-item">
            <Link to="/productos" className="text-warning text-decoration-none">Catálogo</Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/productos?categoria=${encodeURIComponent(producto.categoria)}`}
              className="text-warning text-decoration-none"
            >
              {producto.categoria}
            </Link>
          </li>
          <li className="breadcrumb-item active text-white" aria-current="page">
            {producto.nombreproducto ?? producto.codigo}
          </li>
        </ol>
      </nav>

      <CardDetalle producto={producto} onAgregarCarrito={agregarAlCarrito} />

        </div>
    );
}
export default DetalleProducto;