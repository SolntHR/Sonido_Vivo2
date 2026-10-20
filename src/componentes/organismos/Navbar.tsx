import { Link } from "react-router-dom";

function Navbar(){

    return(
        <nav className="navbar navbar-expand bg-dark">

            <div className="container">
                
                <span className="navbar-brand text-white">
                    Tienda Sonido Vivo
                </span>

                <div className="navbar-nav">


                    <Link className="nav-link text-white" to="/iniciopublico"> 
                        Inicio
                    </Link>

                    <Link className="nav-link text-white" to="/productos">
                        Productos
                    </Link>

                    <Link className="nav-link text-white" to="/quienes">
                        Quienes somos
                    </Link>

                    <Link className="nav-link text-white" to="/contacto">
                        Contacto
                    </Link>

                    <Link className="nav-link text-white" to="/login">
                        Login
                    </Link>

                </div>
            </div>
        </nav>
    )

}

export default Navbar;