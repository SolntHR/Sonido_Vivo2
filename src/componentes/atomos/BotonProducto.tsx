import { Link } from "react-router-dom";

interface BotonProps{
    codigo: string;
}

function BotonProducto({codigo}: BotonProps){
    return(
        <Link
            to={`/producto/${codigo}`}
            className= "btn btn-primary"
        >
            Ver producto
        </Link>
    );
}

export default BotonProducto;