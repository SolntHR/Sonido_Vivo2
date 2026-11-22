import { createContext } from 'react';
import type { Producto } from '../api/tipos';

/**
 * Un producto dentro del carrito. Sirve para los dos orígenes:
 * el carrito del backend (usuario con sesión) y el de localStorage (visitante).
 */
export interface CartItem {
    codigo: string;
    nombreproducto?: string;
    marca?: string;
    modelo?: string;
    precio: number;
    imagen?: string;
    cantidad: number;
}

export interface CartContextType {
    carrito: CartItem[];
    isOpen: boolean;
    aviso: string | null;
    abrirCarrito: () => void;
    cerrarCarrito: () => void;
    agregarAlCarrito: (producto: Producto) => Promise<boolean>;
    eliminarDelCarrito: (codigo: string) => Promise<void>;
    cantidadTotal: number;
    total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
