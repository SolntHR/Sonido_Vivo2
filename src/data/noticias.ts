export interface Noticia {
    id: number;
    titulo: string;
    fecha: string;
    resumen: string;
    imagen: string;
}

// Noticias de ejemplo: reemplazar por las reales cuando estén listas.
export const noticias: Noticia[] = [
    {
        id: 1,
        titulo: "Nueva colección de guitarras eléctricas",
        fecha: "2026-10-15",
        resumen: "Llegan nuevos modelos sólidos, hollow y semi-hollow a nuestro catálogo, con stock limitado.",
        imagen: "/img/guitarras/guitarra_e.avif",
    },
    {
        id: 2,
        titulo: "Todo para tu home studio",
        fecha: "2026-10-08",
        resumen: "Interfaces de audio, monitores y micrófonos de condensador para empezar a grabar en casa.",
        imagen: "/img/estudio/audiocatalogoHD.jpg",
    },
    {
        id: 3,
        titulo: "Pedales de efectos: lo más buscado",
        fecha: "2026-09-30",
        resumen: "Distorsión, delay y reverb: repasamos los pedales que más se llevan nuestros clientes.",
        imagen: "/img/pedales/pedales.avif",
    },
];
