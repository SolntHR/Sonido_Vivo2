import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CardProducto from "../componentes/moleculas/CardProducto";
//import { productos } from "../data/Coleccion";
import { categorias } from "../data/categorias"; 
import { getProductos } from "../data/db";
import { useCart } from "../context/CartContext";

function Productos(){
    const { agregarAlCarrito } = useCart();
    const [params] = useSearchParams();
    // obtenemos productos
    const [listaProductos] = useState(() => getProductos());
    // manejar las categorias en los checkboxes
    const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
    // ve si en la url hay un parametro de categoria
    useEffect(() => {
        const categoriaURL = params.get("categoria");
        if (categoriaURL) {
            setCategoriasFiltro([categoriaURL]);
        }
    }, [params]);
    // agregar o quitar categoria
    const handleCheckboxChange = (categoria: string) => {
        setCategoriasFiltro(prev => 
            prev.includes(categoria) 
                ? prev.filter(c => c !== categoria) // Si ya estaba, lo quitamos
                : [...prev, categoria]              // Si no estaba, lo agregamos
        );
    };
    // filtrar segun las categorias seleccionadas
    const productosFiltrados = listaProductos.filter(p => {
        if (categoriasFiltro.length === 0) return true; // Si no hay filtros, muestra todo
        return categoriasFiltro.includes(p.categoria);  // Si hay, muestra solo los que coinciden
    });

    return(
         <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>{categoriasFiltro.length === 1 ? categoriasFiltro[0] : "Catálogo"}</h1>
            </div>

            {/* === BARRA DE FILTROS === */}
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
                    </div>
                </div>
            </div>

            {/* === GRILLA DE PRODUCTOS === */}
            {productosFiltrados.length > 0 ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                    {productosFiltrados.map((producto) => (
                        <div className="col d-flex gap-3" key={producto.codigo}>
                            <CardProducto
                                codigo={producto.codigo}
                                categoria={producto.categoria}
                                nombreproducto={producto.nombreproducto || "Sin nombre"}
                                marca={producto.marca}
                                modelo={producto.modelo}
                                stock={producto.stock}
                                precio={producto.precio}
                                descripcion={producto.descripcion}
                                imagen={producto.imagen || ""}
                                onAgregarCarrito={() => agregarAlCarrito(producto)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning text-center mt-5">
                    <h4 className="alert-heading">No hay productos</h4>
                    <p className="mb-0">No se encontraron productos en las categorías seleccionadas.</p>
                </div>
            )}
        </div>
    );
}

export default Productos;