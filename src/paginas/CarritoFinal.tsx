import { Link } from 'react-router-dom';
import ItemCarrito from '../componentes/moleculas/ItemCarrito';
import { useCart } from '../context/useCart';

function CarritoFinal() {
    const { carrito, total } = useCart();

    return (
        <section className="container my-5">
            <h1 className="text-gold mb-4">Resumen de tu carrito</h1>

            {carrito.length === 0 ? (
                <div className="card p-4 text-center">
                    <p className="mb-3">Tu carrito está vacío.</p>
                    <Link to="/productos" className="btn btn-gold align-self-center">
                        Explorar productos
                    </Link>
                </div>
            ) : (
                <div className="card p-3 p-md-4">
                    <ul className="list-group mb-4">
                        {carrito.map(item => (
                            <ItemCarrito key={item.codigo} item={item} />
                        ))}
                    </ul>

                    <div className="d-flex justify-content-between align-items-center border-top border-gold pt-3">
                        <span className="fw-bold fs-5">Total:</span>
                        <span className="text-gold fw-bold fs-4">
                            ${total.toLocaleString('es-CL')}
                        </span>
                    </div>

                    <Link to="/productos" className="btn btn-outline-gold mt-4 align-self-start">
                        Seguir comprando
                    </Link>
                </div>
            )}
        </section>
    );
}

export default CarritoFinal;
