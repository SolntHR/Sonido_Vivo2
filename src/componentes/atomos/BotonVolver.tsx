import { Link } from "react-router-dom";


function BotonVolver(){
    
    return (

        <Link
            to={`/productos`}
            className= "btn btn-secondary"
        >
            Volver a Productos
        </Link>

    );
}

export default BotonVolver;