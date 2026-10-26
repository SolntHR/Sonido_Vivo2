interface Props {
  cantidad: number;
  onClick: () => void;
}

function BotonCarrito({ cantidad , onClick}: Props) {
  return (
    <button 
            type="button" 
            className="btn btn-outline-gold position-relative" 
            onClick={onClick}
            aria-label="Abrir carrito"
        >
            Carrito
            {cantidad > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidad}
                </span>
            )}
        </button>
  );
}

export default BotonCarrito;