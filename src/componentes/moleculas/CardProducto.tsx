import BotonProducto from "../atomos/BotonProducto";
import BotonAgregar from "../atomos/BotonAgregar";

interface CardProps{
    codigo: string;
    nombreproducto: string;
    marca: string;
    precio: number;
    stock: number;
    imagen: string;
    onAgregarCarrito: () => void;
}

const IMAGEN_POR_DEFECTO = "/img/logosonidovivo.png";

function CardProducto({codigo, nombreproducto, marca, precio, stock, imagen, onAgregarCarrito }: CardProps){
    const agotado = stock <= 0;

    return(
        <div className='card h-100 w-100' style={{ maxWidth: '21rem' }}>

            <img
            src={imagen || IMAGEN_POR_DEFECTO}
            className="card-img-top"
            alt={nombreproducto}
            style={{height:"200px", objectFit: "contain"}}
            onError={(e) => {
                if (!e.currentTarget.src.endsWith(IMAGEN_POR_DEFECTO)) e.currentTarget.src = IMAGEN_POR_DEFECTO;
            }}
            />

            <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                    {nombreproducto}
                </h5>

                <p className="card-text">
                    {marca}
                </p>

                <p className="card-text fw-bold">
                    ${precio.toLocaleString('es-CL')}
                </p>

                <div className="mt-auto d-flex flex-wrap gap-2">
                    <BotonProducto codigo={codigo}/>
                    <BotonAgregar
                        onClick={onAgregarCarrito}
                        deshabilitado={agotado}
                        texto={agotado ? "Sin Stock" : "Añadir al Carrito"}
                    />
                </div>

            </div>

        </div>
    );
}

export default CardProducto
