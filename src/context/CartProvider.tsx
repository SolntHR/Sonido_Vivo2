import { useEffect, useState, type ReactNode } from 'react';
import { leerJSON, type Producto } from '../data/db';
import { CartContext, type CartItem } from './CartContext';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [aviso, setAviso] = useState<string | null>(null);
    const [carrito, setCarrito] = useState<CartItem[]>(() => {
        const guardado = leerJSON<CartItem[]>('carritoSonidoVivo');
        return Array.isArray(guardado) ? guardado : [];
    });

    useEffect(() => {
        localStorage.setItem('carritoSonidoVivo', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto: Producto) => {
        const enCarrito = carrito.find(item => item.codigo === producto.codigo)?.cantidad ?? 0;
        setIsOpen(true);
        if (enCarrito >= producto.stock) {
            setAviso(producto.stock <= 0
                ? `${producto.nombreproducto ?? producto.codigo} está agotado.`
                : `Solo hay ${producto.stock} unidad(es) disponibles de ${producto.nombreproducto ?? producto.codigo}.`);
            return false;
        }

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
        setAviso(null);
        return true;
    };

    const eliminarDelCarrito = (codigo: string) => {
        setCarrito(prev => prev.filter(item => item.codigo !== codigo));
        setAviso(null);
    };

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{
                carrito,
                isOpen,
                aviso,
                abrirCarrito: () => setIsOpen(true),
                cerrarCarrito: () => { setIsOpen(false); setAviso(null); },
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
