import { Link } from "react-router-dom";
import "./TarjetaCategoria.css";

interface TarjetaCategoriaProps {
    titulo: string;
    descripcion: string;
    imagen: string;
    to: string;
}

function TarjetaCategoria({ titulo, descripcion, imagen, to }: TarjetaCategoriaProps) {
    return (
        <Link
            to={to}
            className="card text-white text-decoration-none border-0 shadow-sm flex-shrink-0 tarjeta-categoria"
        >
            <img src={imagen} alt={titulo} className="img-fondo" />
            <div className="capa-gradiente"></div>
            <div className="card-body d-flex flex-column justify-content-end p-4 contenido-texto text-start">
                <h3 className="card-title fw-bold text-white text-uppercase fs-3">{titulo}</h3>
                <p className="card-text fs-5 text-light mb-0">
                    {descripcion} <span className="float-end fs-4">→</span>
                </p>
            </div>
        </Link>
    );
}

export default TarjetaCategoria;
