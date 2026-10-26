interface Props {
  cantidad: number;
}

function BotonCarrito({ cantidad }: Props) {
  return (
    <button 
      className="btn btn-outline-warning ms-lg-3 my-2 my-lg-0" 
      type="button" 
      data-bs-toggle="offcanvas" 
      data-bs-target="#panelCarrito"
    >
      Carrito ({cantidad})
    </button>
  );
}

export default BotonCarrito;