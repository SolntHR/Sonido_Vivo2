export interface Categoria {
    nombre: string;
    descripcion: string;
    imagen: string;
}

export const categorias: Categoria[] = [
    { nombre: "Guitarras Eléctricas", descripcion: "Modelos sólidos, hollow y semi-hollow", imagen: "/img/guitarras/guitarra_e.avif" },
    { nombre: "Guitarras Acústicas", descripcion: "Clásicas, electroacústicas y folk", imagen: "/img/guitarras/guitarracatalogoHD.jpg" },
    { nombre: "Bajos Eléctricos", descripcion: "4, 5 y 6 cuerdas", imagen: "/img/bajos/bajos.jpg" },
    { nombre: "Baterías", descripcion: "Acústicas, electrónicas y percusión", imagen: "/img/baterias/drumscatalogoHD.jpg" },
    { nombre: "Teclados y Pianos", descripcion: "Sintetizadores, controladores y pianos", imagen: "/img/teclados/pianocatalogoHD.jpg" },
    { nombre: "Amplificadores", descripcion: "Cabezales, combos y gabinetes", imagen: "/img/amplificadores/amplificadores.jpg" },
    { nombre: "Micrófonos", descripcion: "Dinámicos, condensador y cintas", imagen: "/img/microfonos/microfonos.jpg" },
    { nombre: "Pedales de Efectos", descripcion: "Distorsión, modulación y multiefectos", imagen: "/img/pedales/pedales.avif" },
    { nombre: "Accesorios", descripcion: "Cables, cuerdas, uñetas y fundas", imagen: "/img/accesorios/accesorios.avif" },
    { nombre: "Estudio y Grabación", descripcion: "Interfaces, monitores y software", imagen: "/img/estudio/audiocatalogoHD.jpg" },
];
