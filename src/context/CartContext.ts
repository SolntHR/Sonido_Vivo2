import { createContext } from 'react';
import type { Producto } from '../data/db';

export interface CartItem extends Producto {
    cantidad: number;
}

export interface CartContextType {
    carrito: CartItem[];
    isOpen: boolean;
    aviso: string | null;
    abrirCarrito: () => void;
    cerrarCarrito: () => void;
    agregarAlCarrito: (producto: Producto) => boolean;
    eliminarDelCarrito: (codigo: string) => void;
    cantidadTotal: number;
    total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
