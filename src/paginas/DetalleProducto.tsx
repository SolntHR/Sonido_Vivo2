import { Link, useParams } from "react-router-dom";
import { productos } from "../data/Coleccion";
import CardDetalle from '../componentes/moleculas/CardDetalle';
import BotonVolver from "../componentes/atomos/BotonVolver";
import { useCart } from "../context/useCart";

function DetalleProducto() {
    const { agregarAlCarrito } = useCart();
    // Obtenemos el código que viene en la URL (ej: /producto/GA001)
    const { codigo } = useParams<{ codigo: string }>();

    // Buscamos el producto comparando el string del código
    const producto = productos.find(p => p.codigo === codigo);

    // Manejo de error de UI: Si alguien escribe una URL inválida como /producto/123
    if (!producto) {
        return (
            <div className="container mt-4 text-center">
                <h2>Producto no encontrado</h2>
                <BotonVolver />
            </div>
        );
    }

    // Si lo encuentra, renderiza la vista
    return (
        <div className="container my-5">
            {/* BREADCRUMBS (Ruta de navegación) */}
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
            {producto.nombreproducto}
          </li>
        </ol>
      </nav>

      {/* COMPONENTE DE LA TARJETA DE DETALLE */}
      <CardDetalle producto={producto} onAgregarCarrito={agregarAlCarrito} />

        </div>
    );
}
export default DetalleProducto;