export interface Producto {
    codigo: string;
    categoria: string;
    nombreproducto: string;
    marca: string;
    modelo: string;
    stock: number;
    precio: number;
    descripcion: string;
    imagen: string;
}

export const productos: Producto[]= [
    {
        codigo: "GA001",
        categoria: "Guitarras Acústicas",
        nombreproducto: "Guitarra Acústica Folk",
        marca: "Yamaha",
        modelo: "F310",
        stock: 8,
        precio: 129990,
        descripcion: "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.",
        imagen: "/img/yamahaf310.png"
    },
    {
        codigo: "GA002",
        categoria: "Guitarras Acústicas",
        nombreproducto: "Guitarra Acústica Dreadnought",
        marca: "Fender",
        modelo: "CD-60S",
        stock: 5,
        precio: 189990,
        descripcion: "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.",
        imagen: "/img/guitarras/Fender CD-60S.jpg"
    },
    {
        codigo: "GA003",
        categoria: "Guitarras Acústicas",
        nombreproducto: "Guitarra Acústica Clásica 4/4",
        marca: "Yamaha",
        modelo: "C40",
        stock: 10,
        precio: 89990,
        descripcion: "Nailon, tapa de abeto. Ideal para estudio y flamenco.",
        imagen: "/img/guitarras/Yamaha C40.jpg"
    },
    {
        codigo: "GA004",
        categoria: "Guitarras Acústicas",
        nombreproducto: "Guitarra Electroacústica",
        marca: "Takamine",
        modelo: "GN20CE",
        stock: 3,
        precio: 349990,
        descripcion: "Pickup integrado, afinador incorporado.",
        imagen: "/img/guitarras/Guitarra Electroacústica.png"
    },
    {
        codigo: "GA005",
        categoria: "Guitarras Acústicas",
        nombreproducto: "Guitarra 3/4 Niños",
        marca: "Yamaha",
        modelo: "JR1",
        stock: 6,
        precio: 79990,
        descripcion: "Tamaño reducido para niños de 6 a 10 años.",
        imagen: "/img/guitarras/Guitarra 3-4 Niños.png"
    },
    {
        codigo: "GE001",
        categoria: "Guitarras Eléctricas",
        nombreproducto: "Guitarra Eléctrica Stratocaster",
        marca: "Squier",
        modelo: "Affinity Strat",
        stock: 5,
        precio: 249990,
        descripcion: "Cuerpo de álamo, mástil de arce, pastillas SSS.",
        imagen: "/img/guitarras/Guitarra Eléctrica Stratocaster.png"
    },
    {
        codigo: "GE002",
        categoria: "Guitarras Eléctricas",
        nombreproducto: "Guitarra Eléctrica Les Paul",
        marca: "Epiphone",
        modelo: "Les Paul Std",
        stock: 4,
        precio: 329990,
        descripcion: "Cuerpo caoba, tapa arce, pastillas humbucker.",
        imagen: "/img/guitarras/Guitarra Eléctrica Les Paul.png"
    },
    {
        codigo: "GE003",
        categoria: "Guitarras Eléctricas",
        nombreproducto: "Guitarra Eléctrica SG",
        marca: "Epiphone",
        modelo: "SG Standard",
        stock: 3,
        precio: 319990,
        descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers.",
        imagen: "/img/guitarras/Guitarra Eléctrica SG.png"
    },
    {
        codigo: "GE004",
        categoria: "Guitarras Eléctricas",
        nombreproducto: "Guitarra Eléctrica Telecaster",
        marca: "Squier",
        modelo: "Affinity Tele",
        stock: 4,
        precio: 239990,
        descripcion: "Cuerpo álamo, clavijero vintage, 2 pastillas single.",
        imagen: "/img/guitarras/Guitarra Eléctrica Telecaster.png"
    },
    {
        codigo: "GE005",
        categoria: "Guitarras Eléctricas",
        nombreproducto: "Guitarra Eléctrica Semi-hollow",
        marca: "Epiphone",
        modelo: "ES-335",
        stock: 2,
        precio: 549990,
        descripcion: "Semi-hueca, 2 humbuckers, ideal para jazz y blues.",
        imagen: "/img/guitarras/Guitarra Eléctrica Semi-hollow.png"
    },
    {
        codigo: "BA001",
        categoria: "Bajos Eléctricos",
        nombreproducto: "Bajo Eléctrico 4 Cuerdas",
        marca: "Squier",
        modelo: "Affinity PJ",
        stock: 5,
        precio: 299990,
        descripcion: "Pickup PJ, cuerpo álamo, mástil arce.",
        imagen: "/img/guitarras/Bajo Eléctrico 4 Cuerdas Squier.jpg"
    },
    {
        codigo: "BA002",
        categoria: "Bajos Eléctricos",
        nombreproducto: "Bajo Eléctrico Jazz Bass",
        marca: "Fender",
        modelo: "Player Jazz",
        stock: 2,
        precio: 699990,
        descripcion: "Alder body, 2 Alnico V Jazz single-coil.",
        imagen: "/img/guitarras/Bajo Eléctrico Jazz Bass.jpg"
    },
    {
        codigo: "BA003",
        categoria: "Bajos Eléctricos",
        nombreproducto: "Bajo Acústico 4 Cuerdas",
        marca: "Yamaha",
        modelo: "APX700II",
        stock: 2,
        precio: 429990,
        descripcion: "Electroacústico, afinador incorporado.",
        imagen: "/img/guitarras/Bajo Acústico 4 Cuerdas.png"
    },
    {
        codigo: "BT001",
        categoria: "Baterías",
        nombreproducto: "Batería Acústica 5 piezas",
        marca: "Pearl",
        modelo: "Roadshow",
        stock: 2,
        precio: 599990,
        descripcion: "Incluye stands, platillos y pedal de bombo.",
        imagen: "/img/baterias/Batería Acústica 5 piezas.png"
    },
    {
        codigo: "BT002",
        categoria: "Baterías",
        nombreproducto: "Batería Electrónica 8 pads",
        marca: "Roland",
        modelo: "TD-02KV",
        stock: 2,
        precio: 799990,
        descripcion: "Módulo TD-02, 8 pads de goma, pedal hi-hat.",
        imagen: "/img/baterias/Batería Electrónica 8 pads.png"
    },
    {
        codigo: "BT003",
        categoria: "Baterías",
        nombreproducto: "Caja Snare 14\"",
        marca: "Pearl",
        modelo: "STE1450",
        stock: 4,
        precio: 89990,
        descripcion: "Acero, 14x5\", 10 tensores.",
        imagen: "/img/baterias/Caja Snare 14.png"
    },
    {
        codigo: "BT004",
        categoria: "Baterías",
        nombreproducto: "Platillo Hi-Hat 14\"",
        marca: "Zildjian",
        modelo: "A Series",
        stock: 3,
        precio: 149990,
        descripcion: "Latón B20, sonido brillante y claro.",
        imagen: "/img/baterias/Platillo Hi-Hat 14.png"
    },
    {
        codigo: "BT005",
        categoria: "Baterías",
        nombreproducto: "Platillo Crash 16\"",
        marca: "Zildjian",
        modelo: "A Series",
        stock: 3,
        precio: 129990,
        descripcion: "Latón B20, ataque rápido.",
        imagen: "/img/baterias/Platillo Crash 16.png"
    },
    {
        codigo: "TC001",
        categoria: "Teclados y Pianos",
        nombreproducto: "Teclado Digital 61 teclas",
        marca: "Yamaha",
        modelo: "PSR-E373",
        stock: 4,
        precio: 249990,
        descripcion: "61 teclas sensibles al tacto, 622 voces.",
        imagen: "/img/teclados/Teclado Digital 61 teclas.png"
    },
    {
        codigo: "TC002",
        categoria: "Teclados y Pianos",
        nombreproducto: "Piano Digital 88 teclas",
        marca: "Yamaha",
        modelo: "P-45",
        stock: 2,
        precio: 499990,
        descripcion: "88 teclas pesadas, 10 voces, pedal sustain incluido.",
        imagen: "/img/teclados/Piano Digital 88 teclas.png"
    },
    {
        codigo: "TC003",
        categoria: "Teclados y Pianos",
        nombreproducto: "Sintetizador 49 teclas",
        marca: "Arturia",
        modelo: "MiniLab MKII",
        stock: 5,
        precio: 129990,
        descripcion: "MIDI controller, 49 mini teclas.",
        imagen: "/img/teclados/Sintetizador 49 teclas.png"
    },
    {
        codigo: "TC004",
        categoria: "Teclados y Pianos",
        nombreproducto: "Teclado MIDI 88 teclas",
        marca: "M-Audio",
        modelo: "Hammer 88",
        stock: 2,
        precio: 399990,
        descripcion: "88 teclas martillo, sin sonidos propios.",
        imagen: "/img/teclados/Teclado MIDI 88 teclas.png"
    },
    {
        codigo: "AM001",
        categoria: "Amplificadores",
        nombreproducto: "Amplificador Guitarra 15W",
        marca: "Fender",
        modelo: "Frontman 15G",
        stock: 5,
        precio: 99990,
        descripcion: "15W, distorsión incorporada, entrada auxiliar.",
        imagen: "/img/amplificadores/Amplificador Guitarra 15W.png"
    },
    {
        codigo: "AM002",
        categoria: "Amplificadores",
        nombreproducto: "Amplificador Guitarra 40W",
        marca: "Marshall",
        modelo: "MG40GFX",
        stock: 3,
        precio: 299990,
        descripcion: "40W, 4 canales, efectos digitales integrados.",
        imagen: "/img/amplificadores/Amplificador Guitarra 40W.png"
    },
    {
        codigo: "AM003",
        categoria: "Amplificadores",
        nombreproducto: "Amplificador Bajo 100W",
        marca: "Hartke",
        modelo: "HD100",
        stock: 2,
        precio: 449990,
        descripcion: "100W, tweeter integrado, ecualizador de 4 bandas.",
        imagen: "/img/amplificadores/Amplificador Bajo 100W.png"
    },
    {
        codigo: "AM004",
        categoria: "Amplificadores",
        nombreproducto: "Amplificador Acústico 40W",
        marca: "Fishman",
        modelo: "Loudbox Mini",
        stock: 2,
        precio: 499990,
        descripcion: "60W, 2 canales, reverb y chorus incorporados.",
        imagen: "/img/amplificadores/Amplificador Acústico 40W.png"
    },
    {
        codigo: "MI001",
        categoria: "Micrófonos",
        nombreproducto: "Micrófono Dinámico Cardioide",
        marca: "Shure",
        modelo: "SM58",
        stock: 8,
        precio: 149990,
        descripcion: "Estándar industria para voz en vivo.",
        imagen: "/img/microfonos/Micrófono Dinámico Cardioide.png"
    },
    {
        codigo: "MI002",
        categoria: "Micrófonos",
        nombreproducto: "Micrófono Dinámico Instrumento",
        marca: "Shure",
        modelo: "SM57",
        stock: 6,
        precio: 139990,
        descripcion: "Ideal para captura de instrumentos y amplificadores.",
        imagen: "/img/microfonos/Micrófono Dinámico Instrumento.png"
    },
    {
        codigo: "MI003",
        categoria: "Micrófonos",
        nombreproducto: "Micrófono Condensador",
        marca: "Audio-Tech.",
        modelo: "AT2020",
        stock: 4,
        precio: 199990,
        descripcion: "Cardioide, XLR, ideal para grabación en estudio.",
        imagen: "/img/microfonos/Micrófono Condensador.png"
    },
    {
        codigo: "MI004",
        categoria: "Micrófonos",
        nombreproducto: "Micrófono USB de Condensador",
        marca: "Blue",
        modelo: "Yeti",
        stock: 5,
        precio: 299990,
        descripcion: "USB, 4 patrones polares, ideal para streaming y podcast.",
        imagen: "/img/microfonos/Micrófono USB de Condensador.png"
    },
    {
        codigo: "PE001",
        categoria: "Pedales de Efectos",
        nombreproducto: "Pedal Distorsión",
        marca: "Boss",
        modelo: "DS-1",
        stock: 7,
        precio: 79990,
        descripcion: "Clásico pedal de distorsión, 3 controles.",
        imagen: "/img/pedales/Pedal Distorsión.png"
    },
    {
        codigo: "PE002",
        categoria: "Pedales de Efectos",
        nombreproducto: "Pedal Reverb",
        marca: "Boss",
        modelo: "RV-6",
        stock: 4,
        precio: 179990,
        descripcion: "8 modos de reverb, control de shimmer.",
        imagen: "/img/pedales/Pedal Reverb.png"
    },
    {
        codigo: "PE003",
        categoria: "Pedales de Efectos",
        nombreproducto: "Pedal Multi-efectos",
        marca: "Boss",
        modelo: "ME-80",
        stock: 2,
        precio: 349990,
        descripcion: "Diseño tipo pedalboard, 8 efectos simultáneos.",
        imagen: "/img/pedales/Pedal Multi-efectos.png"
    },
    {
        codigo: "PE004",
        categoria: "Pedales de Efectos",
        nombreproducto: "Pedal Tuner Cromático",
        marca: "Boss",
        modelo: "TU-3",
        stock: 8,
        precio: 89990,
        descripcion: "Afinador cromático, indicador de tono.",
        imagen: "/img/pedales/Pedal Tuner Cromático.png"
    },
    {
        codigo: "PE005",
        categoria: "Pedales de Efectos",
        nombreproducto: "Pedal Delay",
        marca: "MXR",
        modelo: "Carbon Copy",
        stock: 4,
        precio: 179990,
        descripcion: "Delay analógico cálido, tiempo 600ms.",
        imagen: "/img/pedales/Pedal Delay.png"
    },
    {
        codigo: "PE006",
        categoria: "Pedales de Efectos",
        nombreproducto: "Pedal Overdrive",
        marca: "Ibanez",
        modelo: "TS9",
        stock: 6,
        precio: 99990,
        descripcion: "Tube Screamer clásico, sonido suave y orgánico.",
        imagen: "/img/pedales/Pedal Overdrive.png"
    },
    {
        codigo: "AC001",
        categoria: "Accesorios",
        nombreproducto: "Cuerdas Guitarra Eléctrica 09-42",
        marca: "Ernie Ball",
        modelo: "Super Slinky",
        stock: 25,
        precio: 8990,
        descripcion: "Juego 6 cuerdas, calibre ligero.",
        imagen: "/img/accesorios/Cuerdas Guitarra Eléctrica 09-42.png"
    },
    {
        codigo: "AC002",
        categoria: "Accesorios",
        nombreproducto: "Cuerdas Guitarra Acústica 12-53",
        marca: "Ernie Ball",
        modelo: "Earthwood",
        stock: 20,
        precio: 10990,
        descripcion: "Bronce fósforo, sonido cálido.",
        imagen: "/img/accesorios/Cuerdas Guitarra Acústica 12-53.png"
    },
    {
        codigo: "AC003",
        categoria: "Accesorios",
        nombreproducto: "Cuerdas Bajo 45-105",
        marca: "Ernie Ball",
        modelo: "Regular Slinky",
        stock: 12,
        precio: 14990,
        descripcion: "Cuerdas de níquel enrollado, set 4 cuerdas.",
        imagen: "/img/accesorios/Cuerdas Bajo 45-105.png"
    },
    {
        codigo: "AC004",
        categoria: "Accesorios",
        nombreproducto: "Púas de Guitarra x10 (0.73mm)",
        marca: "Fender",
        modelo: "351",
        stock: 50,
        precio: 3990,
        descripcion: "Celulosa, grosor medio.",
        imagen: "/img/accesorios/Púas de Guitarra x10 (0.73mm).png"
    },
    {
        codigo: "AC005",
        categoria: "Accesorios",
        nombreproducto: "Capotraste Guitarra",
        marca: "Dunlop",
        modelo: "Trigger",
        stock: 15,
        precio: 12990,
        descripcion: "Capotraste de resorte, compatible 6 cuerdas.",
        imagen: "/img/accesorios/Capotraste Guitarra.png"
    },
    {
        codigo: "AC006",
        categoria: "Accesorios",
        nombreproducto: "Afinador de Clip",
        marca: "Snark",
        modelo: "SN-5",
        stock: 20,
        precio: 8990,
        descripcion: "Afinador cromático de clip, pantalla giratoria.",
        imagen: "/img/accesorios/Afinador de Clip.png"
    },
    {
        codigo: "AC007",
        categoria: "Accesorios",
        nombreproducto: "Cable Instrumento 3m",
        marca: "Monster",
        modelo: "S100-I-3",
        stock: 15,
        precio: 12990,
        descripcion: "Cable trenzado, conectores dorados, 3 metros.",
        imagen: "/img/accesorios/Cable Instrumento 3m.png"
    },
    {
        codigo: "AC008",
        categoria: "Accesorios",
        nombreproducto: "Cable Instrumento 6m",
        marca: "Monster",
        modelo: "S100-I-6",
        stock: 10,
        precio: 17990,
        descripcion: "Cable trenzado, conectores dorados, 6 metros.",
        imagen: "/img/accesorios/Cable Instrumento 6m.png"
    },
    {
        codigo: "AC009",
        categoria: "Accesorios",
        nombreproducto: "Soporte Guitarra de Piso",
        marca: "Hercules",
        modelo: "GS302B",
        stock: 12,
        precio: 22990,
        descripcion: "Soporte plegable con enganche automático.",
        imagen: "/img/accesorios/Soporte Guitarra de Piso.png"
    },
    {
        codigo: "AC010",
        categoria: "Accesorios",
        nombreproducto: "Soporte Guitarra de Pared",
        marca: "Hercules",
        modelo: "WAH-202",
        stock: 10,
        precio: 18990,
        descripcion: "Montaje a pared, enganche automático.",
        imagen: "/img/accesorios/Soporte Guitarra de Pared.png"
    },
    {
        codigo: "ES001",
        categoria: "Estudio y Grabación",
        nombreproducto: "Interfaz de Audio 2x2 USB",
        marca: "Focusrite",
        modelo: "Scarlett Solo",
        stock: 4,
        precio: 149990,
        descripcion: "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.",
        imagen: "/img/estudio/Interfaz de Audio 2x2 USB.png"
    },
    {
        codigo: "ES002",
        categoria: "Estudio y Grabación",
        nombreproducto: "Auriculares de Estudio",
        marca: "Audio-Tech.",
        modelo: "ATH-M20x",
        stock: 6,
        precio: 79990,
        descripcion: "Circumaurales, respuesta 15Hz-20kHz.",
        imagen: "/img/estudio/Auriculares de Estudio.png"
    },
    {
        codigo: "ES003",
        categoria: "Estudio y Grabación",
        nombreproducto: "Auriculares de Estudio Pro",
        marca: "Audio-Tech.",
        modelo: "ATH-M50x",
        stock: 4,
        precio: 219990,
        descripcion: "Referencia de industria, sonido neutro y detallado.",
        imagen: "/img/estudio/Auriculares de Estudio Pro.png"
    },
    {
        codigo: "ES004",
        categoria: "Estudio y Grabación",
        nombreproducto: "Monitor de Estudio 5\"",
        marca: "Yamaha",
        modelo: "HS5",
        stock: 2,
        precio: 349990,
        descripcion: "Altavoz activo, respuesta plana, ideal mezcla.",
        imagen: "/img/estudio/Monitor de Estudio 5.png"
    },
    {
        codigo: "ES005",
        categoria: "Estudio y Grabación",
        nombreproducto: "Pop Filter para Micrófono",
        marca: "Sennheiser",
        modelo: "MZP 40",
        stock: 8,
        precio: 14990,
        descripcion: "Doble malla, brazo flexible con clip.",
        imagen: "/img/estudio/Pop Filter para Micrófono.png"
    }
];

