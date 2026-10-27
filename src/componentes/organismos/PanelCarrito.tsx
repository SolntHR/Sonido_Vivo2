import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import ItemCarrito from '../moleculas/ItemCarrito';
import '../../estilos/PanelCarrito.css';

function PanelCarrito() {
    const { isOpen, cerrarCarrito, carrito, total, aviso } = useCart();

    if (!isOpen) return null;

    return (
        <>
            <div className="offcanvas-backdrop fade show" onClick={cerrarCarrito}></div>

            <div className="offcanvas offcanvas-end offcanvas-luxury show" style={{ visibility: 'visible' }} tabIndex={-1} role="dialog" aria-label="Carrito de compras">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-gold">Tu Selección</h5>
                    <button type="button" className="btn-close btn-close-white" onClick={cerrarCarrito} aria-label="Cerrar carrito"></button>
                </div>

                <div className="offcanvas-body d-flex flex-column">
                    {aviso && <div className="alert alert-warning py-2" role="alert">{aviso}</div>}
                    {carrito.length === 0 ? (
                        <p className="text-secondary text-center mt-4">Tu carrito está vacío.</p>
                    ) : (
                        <ul className="list-group mb-3 flex-grow-1 overflow-auto">
                            {carrito.map(item => (
                                <ItemCarrito key={item.codigo} item={item} />
                            ))}
                        </ul>
                    )}

                    <div className="mt-auto border-top border-gold pt-3">
                        <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
                            <span className="text-light">Total:</span>
                            <span className="text-gold">${total.toLocaleString('es-CL')}</span>
                        </div>
                        {carrito.length === 0 ? (
                            <button
                                type="button"
                                className="btn btn-gold w-100 fw-bold text-uppercase"
                                disabled
                            >
                                Ver resumen final
                            </button>
                        ) : (
                            <Link
                                to="/carrito"
                                onClick={cerrarCarrito}
                                className="btn btn-gold w-100 fw-bold text-uppercase"
                            >
                                Ver resumen final
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PanelCarrito;