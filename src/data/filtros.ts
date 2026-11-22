
export const normalizarTexto = (texto: string): string =>
    texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export interface FiltroProductos {
    categorias?: string[];
    texto?: string;
}

interface ProductoFiltrable {
    codigo: string;
    categoria: string;
    nombreproducto?: string;
    marca: string;
    modelo: string;
}

interface UsuarioFiltrable {
    rut: string;
    nombre: string;
    correo: string;
}

export const filtrarProductos = <T extends ProductoFiltrable>(productos: T[], { categorias = [], texto = '' }: FiltroProductos): T[] => {
    const busqueda = normalizarTexto(texto);
    return productos.filter(p => {
        if (categorias.length > 0 && !categorias.includes(p.categoria)) return false;
        if (!busqueda) return true;
        const campos = [p.nombreproducto ?? '', p.marca, p.modelo, p.codigo];
        return campos.some(c => normalizarTexto(c).includes(busqueda));
    });
};

export const filtrarUsuarios = <T extends UsuarioFiltrable>(usuarios: T[], texto: string): T[] => {
    const busqueda = normalizarTexto(texto);
    if (!busqueda) return usuarios;
    const rutBuscado = busqueda.replace(/[.\-\s]/g, '');
    return usuarios.filter(u =>
        normalizarTexto(u.nombre).includes(busqueda) ||
        normalizarTexto(u.correo).includes(busqueda) ||
        (rutBuscado !== '' && u.rut.replace(/[.\-\s]/g, '').toLowerCase().includes(rutBuscado))
    );
};
