import { Link, useParams } from "react-router-dom";
import { obtenerProducto } from "../data/db";
import CardDetalle from '../componentes/moleculas/CardDetalle';
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useCart } from "../context/useCart";

function DetalleProducto() {
    const { agregarAlCarrito } = useCart();
    const { codigo } = useParams<{ codigo: string }>();

    const producto = codigo ? obtenerProducto(codigo) : undefined;

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
        <ol className="breadcrumb">
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
