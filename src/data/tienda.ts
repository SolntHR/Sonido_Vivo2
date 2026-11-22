export const TIENDA = {
    nombre: 'Sonido Vivo',
    direccion: 'Av. Valparaíso 500',
    comuna: 'Viña del Mar',
    region: 'Región de Valparaíso',
    horario: 'Lunes a viernes, 10:00 a 19:00 hrs',
    latitud: -33.0246,
    longitud: -71.5518,
};

export const urlComoLlegar = () =>
    `https://www.google.com/maps/dir/?api=1&destination=${TIENDA.latitud},${TIENDA.longitud}`;
