const limpiarRut = (rut: string): string => rut.replace(/[.\-\s]/g, '').toUpperCase();

export const normalizarRut = (rut: string): string => {
    const limpio = limpiarRut(rut);
    if (limpio.length < 2) return limpio;
    return `${limpio.slice(0, -1)}-${limpio.slice(-1)}`;
};

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

export const mismoRut = (a: string, b: string): boolean => limpiarRut(a) === limpiarRut(b);

export const validarEmail = (correo: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

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

const esEntero = (valor: string): boolean => /^\d+$/.test(valor.trim());

export interface DatosProducto {
    codigo: string;
    nombreproducto: string;
    categoria: string;
    marca: string;
    modelo: string;
    precio: string;
    stock: string;
    descripcion: string;
}

export const validarProducto = (form: DatosProducto): Record<string, string> => {
    const errores: Record<string, string> = {};

    if (!form.codigo.trim()) errores.codigo = "El código es obligatorio.";
    else if (!/^[A-Za-z0-9-]{3,10}$/.test(form.codigo.trim())) {
        errores.codigo = "El código debe tener entre 3 y 10 letras, números o guiones.";
    }
    if (!form.nombreproducto.trim()) errores.nombreproducto = "El nombre del producto es obligatorio.";
    if (!form.categoria) errores.categoria = "Debe seleccionar una categoría.";
    if (!form.marca.trim()) errores.marca = "La marca es obligatoria.";
    if (!form.modelo.trim()) errores.modelo = "El modelo es obligatorio.";

    if (!form.precio.trim()) errores.precio = "El precio es obligatorio.";
    else if (!esEntero(form.precio)) errores.precio = "El precio debe ser un número entero sin decimales.";
    else if (Number(form.precio) < 1) errores.precio = "El precio mínimo debe ser 1.";

    if (!form.stock.trim()) errores.stock = "El stock es obligatorio.";
    else if (!esEntero(form.stock)) errores.stock = "El stock debe ser un número entero mayor o igual a 0.";

    if (form.descripcion.length > 250) errores.descripcion = "La descripción no puede superar los 250 caracteres.";

    return errores;
};
