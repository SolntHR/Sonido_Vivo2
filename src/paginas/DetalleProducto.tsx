import { useParams } from "react-router-dom";
import { productos } from "../data/Coleccion";
import BotonVolver from "../componentes/atomos/BotonVolver";

function DetalleProducto() {
    // Obtenemos el código que viene en la URL (ej: /producto/GA001)
    const { codigo } = useParams();

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
        <div className="container mt-4">
            <h1>Detalle del producto</h1>

            {/* Aplicamos fallback por si la imagen viene en null en tu colección */}
            <img
                src={producto.imagen || '/placeholder.png'} 
                alt={producto.nombreproducto}
                style={{ width: '300px', objectFit: 'contain' }} 
            />

            <h2 className="mt-3">{producto.nombreproducto}</h2>
            <h5 className="text-muted">{producto.marca} | Modelo: {producto.modelo}</h5>
            
            <p className="mt-3">{producto.descripcion}</p>
            <p className="fw-bold fs-4">${producto.precio}</p>
            <p className={producto.stock > 0 ? "text-success" : "text-danger"}>
                Stock disponible: {producto.stock}
            </p>

            <div className="mt-4">
                <BotonVolver />
            </div>
        </div>
    );
}

export default DetalleProducto;