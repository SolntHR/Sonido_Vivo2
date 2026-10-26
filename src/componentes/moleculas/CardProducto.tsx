import BotonProducto from "../atomos/BotonProducto";
import BotonAgregar from "../atomos/BotonAgregar";

interface CardProps{
    codigo: string;
    categoria: string;
    nombreproducto: string;
    marca: string;
    modelo: string;
    stock: number;
    precio: number;
    descripcion: string;
    imagen: string;
    onAgregarCarrito: () => void;
}

function CardProducto({codigo,nombreproducto, marca, precio, imagen, onAgregarCarrito }: CardProps){
    return(
        <div className='card' style={{ width: '21rem' }}>

            <img
            src={imagen}
            className="card-img-top"
            alt={nombreproducto}
            style={{height:"200px", objectFit: "contain"}}
            />

            {/* Organizamos el contenido de la Card de forma vertical*/}
            <div className="card-body d-flex flex-column">
                
                <h5 className="card-title">
                    {nombreproducto}
                </h5>

                <p className="card-text">
                    {marca}
                </p>
                
                <p className="card-text">
                    ${precio}
                </p>
                
                {/* Empuja el boton hacia abajo para mantener todos los botones alineados*/}
                <div className="mt-auto">
                    <BotonProducto codigo={codigo}/>
                    <BotonAgregar onClick={onAgregarCarrito} />
                </div>
                
            </div>

        </div>
    );
}

export default CardProducto