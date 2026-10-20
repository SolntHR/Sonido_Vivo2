import BotonProducto from "../atomos/BotonProducto";

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
}

function CardProducto({codigo,nombreproducto, marca, precio,imagen}: CardProps){
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
                </div>
                
            </div>

        </div>
    );
}

export default CardProducto