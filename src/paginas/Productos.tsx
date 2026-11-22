import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardProducto from "../componentes/moleculas/CardProducto";
import { listarProductos } from "../api/productos";
import { listarCategorias } from "../api/categorias";
import type { Categoria, Producto } from "../api/tipos";
import { filtrarProductos } from "../data/filtros";
import { useCart } from "../context/useCart";

function Productos(){
    const { agregarAlCarrito } = useCart();
    const [params] = useSearchParams();
    const categoriaURL = params.get("categoria");
    // Datos que vienen del backend (GET /productos y GET /categorias)
    const [listaProductos, setListaProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Consulta el backend al abrir la página
    useEffect(() => {
        Promise.all([listarProductos(), listarCategorias()])
            .then(([productos, cats]) => {
                setListaProductos(productos);
                setCategorias(cats);
            })
            .catch((e: Error) => setError(e.message))
            .finally(() => setCargando(false));
    }, []);
    const [busqueda, setBusqueda] = useState("");
    const [seleccion, setSeleccion] = useState<{ url: string | null; categorias: string[] | null }>({ url: categoriaURL, categorias: null });
    const seleccionCategorias = seleccion.url === categoriaURL ? seleccion.categorias : null;
    const categoriasFiltro = seleccionCategorias ?? (categoriaURL ? [categoriaURL] : []);
    const handleCheckboxChange = (categoria: string) => {
        const nuevas = categoriasFiltro.includes(categoria)
            ? categoriasFiltro.filter(c => c !== categoria)
            : [...categoriasFiltro, categoria];
        setSeleccion({ url: categoriaURL, categorias: nuevas });
    };
    const limpiarFiltros = () => {
        setSeleccion({ url: categoriaURL, categorias: [] });
        setBusqueda("");
    };
    const productosFiltrados = filtrarProductos(listaProductos, { categorias: categoriasFiltro, texto: busqueda });
    const hayFiltros = categoriasFiltro.length > 0 || busqueda.trim() !== "";

    return(
         <div className="container mt-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <h1 className="mb-0">{categoriasFiltro.length === 1 ? categoriasFiltro[0] : "Catálogo"}</h1>
                <input
                    type="search"
                    className="form-control"
                    style={{ maxWidth: "24rem" }}
                    placeholder="Buscar por nombre, marca o modelo..."
                    aria-label="Buscar productos"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            <div className="card shadow-sm mb-4 bg-dark border-gold">
                <div className="card-body py-3">
                    <div className="d-flex flex-wrap gap-3 align-items-center">
                        <span className="fw-semibold text-light me-2">Filtrar por categoría:</span>
                        {categorias.map(cat => (
                            <div className="form-check" key={cat.nombre}>
                                <input
                                    className="form-check-input checkbox-oscuro"
                                    type="checkbox"
                                    id={`check-${cat.nombre}`}
                                    checked={categoriasFiltro.includes(cat.nombre)}
                                    onChange={() => handleCheckboxChange(cat.nombre)}
                                />
                                <label
                                    className="form-check-label text-light small ms-1"
                                    htmlFor={`check-${cat.nombre}`}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {cat.nombre}
                                </label>
                            </div>
                        ))}
                        {hayFiltros && (
                            <button type="button" className="btn btn-sm btn-outline-gold ms-md-auto" onClick={limpiarFiltros}>
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {cargando && <p className="text-secondary">Cargando productos...</p>}
            {error && <div className="alert alert-danger">No se pudo cargar el catálogo: {error}</div>}

            {!cargando && !error && (
            <p className="text-secondary small" aria-live="polite">
                {productosFiltrados.length} producto(s) encontrado(s)
            </p>
            )}

            {cargando || error ? null : productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
                    {productosFiltrados.map((producto) => (
                        <div className="col d-flex justify-content-center" key={producto.codigo}>
                            <CardProducto
                                codigo={producto.codigo}
                                nombreproducto={producto.nombreproducto || `${producto.marca} ${producto.modelo}`}
                                marca={producto.marca}
                                stock={producto.stock}
                                precio={producto.precio}
                                imagen={producto.imagen || ""}
                                onAgregarCarrito={() => agregarAlCarrito(producto)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning text-center mt-5">
                    <h4 className="alert-heading">No hay productos</h4>
                    <p className="mb-0">No se encontraron productos con los filtros seleccionados.</p>
                </div>
            )}
        </div>
    );
}

export default Productos;
