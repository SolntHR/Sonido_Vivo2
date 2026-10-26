import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Producto } from '../data/db';

export interface CartItem extends Producto {
    cantidad: number;
}

interface CartContextType {
    carrito: CartItem[];
    isOpen: boolean;
    abrirCarrito: () => void;
    cerrarCarrito: () => void;
    agregarAlCarrito: (producto: Producto) => void;
    eliminarDelCarrito: (codigo: string) => void;
    cantidadTotal: number;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [carrito, setCarrito] = useState<CartItem[]>(() => {
        const guardado = localStorage.getItem('carritoSonidoVivo');
        return guardado ? JSON.parse(guardado) : [];
    });

    // Sincronizar con localStorage cada vez que el carrito cambie
    useEffect(() => {
        localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto: Producto) => {
        setCarrito(prev => {
            const existe = prev.find(item => item.codigo === producto.codigo);
            if (existe) {
                return prev.map(item => 
                    item.codigo === producto.codigo 
                        ? { ...item, cantidad: item.cantidad + 1 } 
                        : item
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
        setIsOpen(true); // Abre el panel automáticamente al agregar algo
    };

    const eliminarDelCarrito = (codigo: string) => {
        setCarrito(prev => prev.filter(item => item.codigo !== codigo));
    };

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <CartContext.Provider value={{ 
            carrito, isOpen, abrirCarrito: () => setIsOpen(true), cerrarCarrito: () => setIsOpen(false), 
            agregarAlCarrito, eliminarDelCarrito, cantidadTotal, total 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
    return context;
};