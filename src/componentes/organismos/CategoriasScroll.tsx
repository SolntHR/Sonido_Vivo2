import { useRef, useEffect } from "react";
import TarjetaCategoria from "../moleculas/TarjetaCategoria";
import ZonaScroll from "../atomos/ZonaScroll";
import { categorias } from "../../data/categorias";
import "../../estilos/CategoriasScroll.css";

function CategoriasScroll() {
    const contenedor = useRef<HTMLDivElement>(null);
    const frame = useRef<number | null>(null);

    // Desplaza el carrusel de forma continua mientras el mouse está sobre la zona.
    const iniciar = (direccion: 1 | -1) => {
        const paso = () => {
            contenedor.current?.scrollBy({ left: direccion * 8 });
            frame.current = requestAnimationFrame(paso);
        };
        detener();
        frame.current = requestAnimationFrame(paso);
    };

    const detener = () => {
        if (frame.current !== null) {
            cancelAnimationFrame(frame.current);
            frame.current = null;
        }
    };

    useEffect(() => detener, []);

    return (
        <div className="position-relative">
            <ZonaScroll lado="izq" onEntrar={() => iniciar(-1)} onSalir={detener} />

            <div ref={contenedor} className="d-flex flex-nowrap gap-4 pb-4 ocultar-scrollbar contenedor-categorias">
                <TarjetaCategoria
                    titulo="Todos los productos"
                    descripcion="Explora el catálogo completo"
                    imagen="/img/todos.webp"
                    to="/productos"
                />
                {categorias.map((c) => (
                    <TarjetaCategoria
                        key={c.nombre}
                        titulo={c.nombre}
                        descripcion={c.descripcion}
                        imagen={c.imagen}
                        to={`/productos?categoria=${encodeURIComponent(c.nombre)}`}
                    />
                ))}
            </div>

            <ZonaScroll lado="der" onEntrar={() => iniciar(1)} onSalir={detener} />
        </div>
    );
}

export default CategoriasScroll;
