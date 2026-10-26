import type { Producto } from '../../data/db';
import BotonVolver from "../atomos/BotonVolver";
import BotonAgregar from "../atomos/BotonAgregar";

interface Props {
    producto: Producto;
    onAgregarCarrito: (producto: Producto) => void;
}

function CardDetalle({producto, onAgregarCarrito}: Props){
    // color para el stock
    const stockColor = producto.stock > 0 ? 'bg-success' : 'bg-danger';
    const stockTexto = producto.stock > 0 ? `Stock: ${producto.stock} unidades` : 'Agotado';
    

    return(
         <div className="card bg-dark border border-warning rounded-3 overflow-hidden shadow-lg">
      <div className="row g-0">
        
        {/* Columna Izquierda: Imagen */}
        <div className="col-md-5 d-flex justify-content-center align-items-center p-4 p-md-5">
          <img 
            src={producto.imagen || '/img/default.png'} 
            alt={producto.nombreproducto} 
            className="img-fluid" 
            style={{ objectFit: 'contain', maxHeight: '400px' }} 
          />
        </div>

        {/* Columna Derecha: Información */}
        <div className="col-md-7 p-4 p-md-5 d-flex flex-column">
          
          <h2 className="text-white fw-bold mb-2">{producto.nombreproducto}</h2>
          
          <h5 className="text-warning mb-4" style={{ color: '#d4af37' }}>
            {producto.marca} | Modelo: {producto.modelo}
          </h5>
          
          <h3 className="text-warning fw-bold mb-4" style={{ color: '#d4af37' }}>
            ${producto.precio.toLocaleString('es-CL')}
          </h3>
          
          <p className="text-secondary mb-4">
            {producto.descripcion}
          </p>

          {/* Badges de Stock y Código */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className={`badge ${stockColor} fs-6 px-3 py-2`}>
              {stockTexto}
            </span>
            <small className="text-muted">Código: {producto.codigo}</small>
          </div>

          {/* Separador */}
          <hr className="border-secondary my-4" />

          <BotonAgregar 
                        onClick={() => onAgregarCarrito(producto)}
                        deshabilitado={producto.stock <= 0}
                        texto={producto.stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
                    />

          <BotonVolver />
          
        </div>
      </div>
    </div>


    );
}

export default CardDetalle;