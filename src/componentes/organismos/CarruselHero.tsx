import { useEffect, useState } from "react";
import "../../estilos/CarruselHero.css";

const slides = [
    { src: "/img/banner1.png", alt: "Tienda" },
    { src: "/img/Guitarras.png", alt: "Guitarras" },
    { src: "/img/intrumentosvarios.png", alt: "Percusión" },
];

function CarruselHero() {
    const [actual, setActual] = useState(0);

    // Cambia de slide cada 5 segundos; se reinicia al cambiar manualmente.
    useEffect(() => {
        const id = setInterval(() => setActual((a) => (a + 1) % slides.length), 5000);
        return () => clearInterval(id);
    }, [actual]);

    const anterior = () => setActual((a) => (a - 1 + slides.length) % slides.length);
    const siguiente = () => setActual((a) => (a + 1) % slides.length);

    return (
        <header className="position-relative border-bottom border-gold border-2 hero-carrusel">
            <div className="hero-titulo text-center w-100">
                <h1 className="titulo-principal text-gold mb-0">SONIDO VIVO</h1>
            </div>

            <div className="hero-slides">
                {slides.map((s, i) => (
                    <img
                        key={s.src}
                        src={s.src}
                        alt={s.alt}
                        className={`hero-slide ${i === actual ? "activo" : ""}`}
                    />
                ))}
            </div>

            <button type="button" className="hero-control hero-prev" onClick={anterior} aria-label="Anterior">❮</button>
            <button type="button" className="hero-control hero-next" onClick={siguiente} aria-label="Siguiente">❯</button>

            <div className="hero-indicadores">
                {slides.map((s, i) => (
                    <button
                        key={s.src}
                        type="button"
                        className={i === actual ? "activo" : ""}
                        onClick={() => setActual(i)}
                        aria-label={`Ir al slide ${i + 1}`}
                    />
                ))}
            </div>
        </header>
    );
}

export default CarruselHero;
