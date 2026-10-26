interface Props {
    onClick: () => void;
    texto?: string;
    deshabilitado?: boolean;
}

function BotonAgregar({ onClick, texto = "Añadir al Carrito", deshabilitado = false }: Props) {
    return (
        <button 
            type="button"
            className="btn btn-warning fw-bold" 
            onClick={onClick}
            disabled={deshabilitado}
        >
            {texto}
        </button>
    );
}

export default BotonAgregar;