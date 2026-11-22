import { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCarrito from '../componentes/moleculas/ItemCarrito';
import MapaTienda from '../componentes/moleculas/MapaTienda';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/AuthContext';
import { regionesData } from '../data/regiones';
import { TIENDA } from '../data/tienda';

type MetodoEntrega = 'despacho' | 'retiro';

interface DatosDespacho {
    region: string;
    comuna: string;
    direccion: string;
}

function CarritoFinal() {
    const { carrito, total, cantidadTotal } = useCart();
    const { user } = useAuth();

    const [metodo, setMetodo] = useState<MetodoEntrega>('despacho');
    const [despacho, setDespacho] = useState<DatosDespacho>(() => ({
        region: user?.region ?? '',
        comuna: user?.comuna ?? '',
        direccion: '',
    }));
    const [errores, setErrores] = useState<Partial<Record<keyof DatosDespacho, string>>>({});
    const [confirmado, setConfirmado] = useState(false);

    const comunasDisponibles = regionesData.find(r => r.region === despacho.region)?.comunas ?? [];

    const cambiarMetodo = (nuevo: MetodoEntrega) => {
        setMetodo(nuevo);
        setErrores({});
        setConfirmado(false);
    };

    const cambiar = (campo: keyof DatosDespacho, valor: string) => {
        setDespacho(d => ({
            ...d,
            [campo]: valor,
            ...(campo === 'region' ? { comuna: '' } : {}),
        }));
        setErrores(e => ({ ...e, [campo]: undefined }));
        setConfirmado(false);
    };

    const confirmarEntrega = () => {
        if (metodo === 'despacho') {
            const nuevos: Partial<Record<keyof DatosDespacho, string>> = {};
            if (!despacho.region) nuevos.region = 'Debe seleccionar una región.';
            if (!despacho.comuna) nuevos.comuna = 'Debe seleccionar una comuna.';
            const direccion = despacho.direccion.trim();
            if (!direccion) nuevos.direccion = 'Debe ingresar la dirección de despacho.';
            else if (direccion.length < 5 || direccion.length > 120) nuevos.direccion = 'La dirección debe tener entre 5 y 120 caracteres.';
            if (Object.keys(nuevos).length > 0) {
                setErrores(nuevos);
                return;
            }
        }
        setConfirmado(true);
    };

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
                <div className="row g-4">
                    {/* Productos y total */}
                    <div className="col-12 col-lg-7">
                        <div className="card p-3 p-md-4 h-100">
                            <ul className="list-group mb-4">
                                {carrito.map(item => (
                                    <ItemCarrito key={item.codigo} item={item} />
                                ))}
                            </ul>

                            <div className="d-flex justify-content-between align-items-center border-top border-gold pt-3">
                                <span className="fw-bold fs-5">Total ({cantidadTotal} producto{cantidadTotal === 1 ? '' : 's'}):</span>
                                <span className="text-gold fw-bold fs-4">
                                    ${total.toLocaleString('es-CL')}
                                </span>
                            </div>

                            <Link to="/productos" className="btn btn-outline-gold mt-4 align-self-start">
                                Seguir comprando
                            </Link>
                        </div>
                    </div>

                    {/* Método de entrega */}
                    <div className="col-12 col-lg-5">
                        <div className="card p-3 p-md-4 h-100 text-start">
                            <h4 className="text-gold mb-3">Método de entrega</h4>

                            <div className="form-check mb-2">
                                <input className="form-check-input" type="radio" name="metodoEntrega" id="entrega-despacho"
                                    checked={metodo === 'despacho'} onChange={() => cambiarMetodo('despacho')} />
                                <label className="form-check-label" htmlFor="entrega-despacho">Despacho a domicilio</label>
                            </div>
                            <div className="form-check mb-3">
                                <input className="form-check-input" type="radio" name="metodoEntrega" id="entrega-retiro"
                                    checked={metodo === 'retiro'} onChange={() => cambiarMetodo('retiro')} />
                                <label className="form-check-label" htmlFor="entrega-retiro">Retiro en tienda</label>
                            </div>

                            {metodo === 'despacho' ? (
                                <div aria-label="Datos de despacho">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="despacho-region">Región</label>
                                        <select id="despacho-region" className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                                            value={despacho.region} onChange={e => cambiar('region', e.target.value)}>
                                            <option value="">Seleccione una región</option>
                                            {regionesData.map(r => <option key={r.region} value={r.region}>{r.region}</option>)}
                                        </select>
                                        {errores.region && <div className="invalid-feedback d-block" role="alert">{errores.region}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="despacho-comuna">Comuna</label>
                                        <select id="despacho-comuna" className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                                            value={despacho.comuna} onChange={e => cambiar('comuna', e.target.value)} disabled={!despacho.region}>
                                            <option value="">Seleccione una comuna</option>
                                            {comunasDisponibles.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                        {errores.comuna && <div className="invalid-feedback d-block" role="alert">{errores.comuna}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="despacho-direccion">Dirección</label>
                                        <input id="despacho-direccion" type="text" className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                                            placeholder="Calle, número, depto." value={despacho.direccion}
                                            onChange={e => cambiar('direccion', e.target.value)} />
                                        {errores.direccion && <div className="invalid-feedback d-block" role="alert">{errores.direccion}</div>}
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-3">
                                    <p className="mb-2">
                                        Retira tu compra en <strong>{TIENDA.direccion}, {TIENDA.comuna}</strong>.
                                        <br />
                                        <small>{TIENDA.horario}</small>
                                    </p>
                                    <MapaTienda alto={220} />
                                </div>
                            )}

                            <button type="button" className="btn btn-gold w-100 mt-2" onClick={confirmarEntrega}>
                                Confirmar método de entrega
                            </button>

                            {confirmado && (
                                <div className="alert alert-success mt-3 mb-0" role="status">
                                    <strong>Entrega seleccionada:</strong>{' '}
                                    {metodo === 'despacho'
                                        ? `despacho a ${despacho.direccion.trim()}, ${despacho.comuna}, ${despacho.region}.`
                                        : `retiro en tienda (${TIENDA.direccion}, ${TIENDA.comuna}).`}
                                    <br />
                                    <small>El pago en línea no forma parte de esta versión: el proceso de compra finaliza en este resumen.</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CarritoFinal;
