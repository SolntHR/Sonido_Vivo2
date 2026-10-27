import type { CartItem } from '../../context/CartContext';
import { useCart } from '../../context/useCart';

interface Props {
    item: CartItem;
}

function ItemCarrito({ item }: Props) {
    const { eliminarDelCarrito } = useCart();
    const subtotal = item.precio * item.cantidad;

    return (
        <li className="list-group-item list-group-item-luxury d-flex justify-content-between align-items-center lh-sm bg-transparent border-secondary">
            <div className="d-flex align-items-center gap-3">
                <img
                    src={item.imagen || '/img/logosonidovivo.png'}
                    alt={item.nombreproducto ?? item.codigo}
                    className="rounded border border-secondary"
                    style={{ width: 64, height: 64, objectFit: 'contain' }}
                />
                <div>
                    <h6 className="my-0 text-light">{item.nombreproducto ?? item.codigo}</h6>
                    <small className="text-secondary">{item.cantidad} x ${item.precio.toLocaleString('es-CL')}</small>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <span className="me-3 fw-bold text-gold">${subtotal.toLocaleString('es-CL')}</span>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarDelCarrito(item.codigo)}
                    title="Eliminar producto"
                    aria-label={`Eliminar ${item.nombreproducto ?? item.codigo} del carrito`}
                >
                    X
                </button>
            </div>
        </li>
    );
}

export default ItemCarrito;