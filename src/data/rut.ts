// Utilidades para RUN/RUT chileno. Un solo lugar para validar y normalizar.

// Quita puntos, guion y espacios, y deja la K en mayúscula: "12.345.678-k" -> "12345678K"
const limpiarRut = (rut: string): string => rut.replace(/[.\-\s]/g, '').toUpperCase();

// Formato único con el que se guarda: "12345678-5"
export const normalizarRut = (rut: string): string => {
    const limpio = limpiarRut(rut);
    if (limpio.length < 2) return limpio;
    return `${limpio.slice(0, -1)}-${limpio.slice(-1)}`;
};

// Valida el formato y el dígito verificador (acepta con o sin puntos y guion)
export const validarRut = (rut: string): boolean => {
    const limpio = limpiarRut(rut);
    if (limpio.length < 8) return false;
    if (!/^[0-9]+[0-9K]$/.test(limpio)) return false;

    const cuerpo = limpio.slice(0, -1);
    const dvIngresado = limpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const dvCalculado = 11 - (suma % 11);
    const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : String(dvCalculado);

    return dvEsperado === dvIngresado;
};

// Compara dos RUT sin importar el formato en que fueron escritos
export const mismoRut = (a: string, b: string): boolean => limpiarRut(a) === limpiarRut(b);
