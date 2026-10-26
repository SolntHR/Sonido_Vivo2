// Quita puntos, guion y espacios, y deja la K en mayúscula
const limpiarRut = (rut: string): string => rut.replace(/[.\-\s]/g, '').toUpperCase();

// normalizar rut
export const normalizarRut = (rut: string): string => {
    const limpio = limpiarRut(rut);
    if (limpio.length < 2) return limpio;
    return `${limpio.slice(0, -1)}-${limpio.slice(-1)}`;
};

// validar rut
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

// compara si dos rut son iguales, ignorando formato
export const mismoRut = (a: string, b: string): boolean => limpiarRut(a) === limpiarRut(b);

// valida formato de correo electrónico
export const validarEmail = (correo: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

// valida que la contraseña tenga minimo:
// 8 caracteres
// una letra mayúscula
// una letra minúscula 
// un número
export const validarPassword = (password: string): string | null => {
    const faltantes = [];

    if (password.length < 8) faltantes.push("al menos 8 caracteres");
    if (!/[A-Z]/.test(password)) faltantes.push("una letra mayúscula");
    if (!/[a-z]/.test(password)) faltantes.push("una letra minúscula");
    if (!/\d/.test(password)) faltantes.push("un número");

    if (faltantes.length === 0) return null;

    if (faltantes.length === 1) {
        return `A la contraseña le falta ${faltantes[0]}.`;
    }

    const ultimo = faltantes.pop();
    return `A la contraseña le falta ${faltantes.join(", ")} y ${ultimo}.`;
};