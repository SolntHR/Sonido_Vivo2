import { useEffect, useState, type ReactNode } from 'react';
import type { Producto } from '../data/db';
import { CartContext, type CartItem } from './CartContext';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [carrito, setCarrito] = useState<CartItem[]>(() => {
        const guardado = localStorage.getItem('carritoSonidoVivo');
        return guardado ? JSON.parse(guardado) : [];
    });

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
        setIsOpen(true);
    };

    const eliminarDelCarrito = (codigo: string) => {
        setCarrito(prev => prev.filter(item => item.codigo !== codigo));
    };

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{
                carrito,
                isOpen,
                abrirCarrito: () => setIsOpen(true),
                cerrarCarrito: () => setIsOpen(false),
                agregarAlCarrito,
                eliminarDelCarrito,
                cantidadTotal,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
