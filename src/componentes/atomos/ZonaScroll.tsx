import "../../estilos/ZonaScroll.css";

interface ZonaScrollProps {
    lado: "izq" | "der";
    onEntrar: () => void;
    onSalir: () => void;
}

function ZonaScroll({ lado, onEntrar, onSalir }: ZonaScrollProps) {
    return (
        <div
            className={`zona-scroll zona-scroll-${lado} d-none d-md-flex`}
            onMouseEnter={onEntrar}
            onMouseLeave={onSalir}
            aria-hidden="true"
        >
            <span className="flecha-indicador">{lado === "izq" ? "❮" : "❯"}</span>
        </div>
    );
}

export default ZonaScroll;
