export interface Noticia {
    id: number;
    titulo: string;
    fecha: string;
    resumen: string;
    imagen: string;
    autor: string;
    contenido: string[];
}

export const noticias: Noticia[] = [
    {
        id: 1,
        titulo: "Nueva colección de guitarras eléctricas",
        fecha: "2026-10-15",
        resumen: "Llegan nuevos modelos sólidos, hollow y semi-hollow a nuestro catálogo, con stock limitado.",
        imagen: "/img/guitarras/guitarra_e.avif",
        autor: "Equipo Sonido Vivo",
        contenido: [
            "Estamos muy emocionados de anunciar la llegada de nuestra nueva colección de guitarras eléctricas. Hemos seleccionado cuidadosamente modelos que cubren desde el principiante hasta el músico profesional.",
            "Entre las novedades encontrarás guitarras de cuerpo sólido ideales para rock y metal, así como modelos hollow y semi-hollow perfectos para jazz y blues.",
            "Te invitamos a visitar nuestro catálogo para descubrir los nuevos modelos y las especificaciones técnicas de cada uno."
        ]
    },
    {
        id: 2,
        titulo: "Todo para tu home studio",
        fecha: "2026-10-08",
        resumen: "Interfaces de audio, monitores y micrófonos de condensador para empezar a grabar en casa.",
        imagen: "/img/estudio/audiocatalogoHD.jpg",
        autor: "Equipo Sonido Vivo",
        contenido: [
            "Empezar en el mundo de la producción musical puede ser abrumador por la cantidad de opciones disponibles. Sin embargo, no necesitas gastar una fortuna para obtener resultados profesionales.",
            "La interfaz de audio es el corazón de tu estudio. Recomendamos interfaces de 2 entradas y 2 salidas para empezar.",
            "Aunque los audífonos son excelentes para grabar, unos buenos monitores de estudio te darán una respuesta plana para mezclar."
        ]
    },
    {
        id: 3,
        titulo: "Pedales de efectos: lo más buscado",
        fecha: "2026-09-30",
        resumen: "Distorsión, delay y reverb: repasamos los pedales que más se llevan nuestros clientes.",
        imagen: "/img/pedales/pedales.avif",
        autor: "Equipo Sonido Vivo",
        contenido: [
            "El mundo de los pedales de efectos es infinito. En esta nota repasamos cuáles son los imprescindibles según nuestros clientes.",
            "El overdrive y la distorsión siguen liderando las ventas, siendo el primer pedal que muchos guitarristas compran.",
            "Los pedales de delay y reverb son esenciales para darle ambiente a tu sonido, tanto en estudio como en vivo."
        ]
    },
];
