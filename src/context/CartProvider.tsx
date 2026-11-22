import { useEffect, useRef, useState, type ReactNode } from 'react';
import { leerJSON } from '../data/db';
import type { Producto } from '../api/tipos';
import { ErrorApi } from '../api/cliente';
import { agregarItem, obtenerCarrito, quitarItem, type CarritoApi } from '../api/carrito';
import { useAuth } from './AuthContext';
import { CartContext, type CartItem } from './CartContext';

const CLAVE_CARRITO = 'carritoSonidoVivo';

const mensajeDeError = (error: unknown) =>
    error instanceof ErrorApi ? error.message : 'No se pudo actualizar el carrito.';

/**
 * Dos carritos según la sesión:
 * - Con sesión: el carrito vive en el backend (GET/POST/DELETE /carrito) y el stock lo valida el microservicio.
 * - Sin sesión (visitante): el carrito vive en localStorage, como antes.
 * Al iniciar sesión, lo que el visitante tenía en localStorage se pasa a su carrito del backend.
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [aviso, setAviso] = useState<string | null>(null);

    // Carrito del visitante
    const [carritoLocal, setCarritoLocal] = useState<CartItem[]>(() => {
        const guardado = leerJSON<CartItem[]>(CLAVE_CARRITO);
        return Array.isArray(guardado) ? guardado : [];
    });

    // Carrito del backend, junto al id del usuario dueño (evita mostrar el carrito de otra sesión)
    const [carritoServidor, setCarritoServidor] = useState<{ idUsuario: number; items: CartItem[] } | null>(null);

    useEffect(() => {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carritoLocal));
    }, [carritoLocal]);

    const guardarRespuesta = (idUsuario: number, respuesta: CarritoApi) =>
        setCarritoServidor({ idUsuario, items: respuesta.items });

    // Al iniciar sesión: pasa el carrito del visitante al backend y luego carga el carrito del usuario
    // Recuerda para qué usuario ya se pasó el carrito del visitante, así no se envía dos veces
    const fusionadoPara = useRef<number | null>(null);
    const idUsuario = user?.id;
    useEffect(() => {
        if (idUsuario === undefined) {
            fusionadoPara.current = null;
            return;
        }
        let cancelado = false;
        const pendientes = fusionadoPara.current === idUsuario ? [] : (leerJSON<CartItem[]>(CLAVE_CARRITO) ?? []);
        fusionadoPara.current = idUsuario;

        const cargar = async () => {
            const rechazados: string[] = [];
            for (const item of pendientes) {
                try {
                    await agregarItem(item.codigo, item.cantidad);
                } catch (error) {
                    rechazados.push(mensajeDeError(error));
                }
            }
            if (pendientes.length > 0) setCarritoLocal([]);

            try {
                const respuesta = await obtenerCarrito();
                if (cancelado) return;
                guardarRespuesta(idUsuario, respuesta);
                if (rechazados.length > 0) setAviso(rechazados.join(' '));
            } catch (error) {
                if (!cancelado) setAviso(mensajeDeError(error));
            }
        };

        cargar();
        return () => { cancelado = true; };
    }, [idUsuario]);

    // El carrito que se muestra depende de si hay sesión
    const carrito: CartItem[] = user
        ? (carritoServidor?.idUsuario === user.id ? carritoServidor.items : [])
        : carritoLocal;

    const agregarAlCarrito = async (producto: Producto) => {
        setIsOpen(true);

        // Con sesión: el backend suma la cantidad y valida el stock (409 si no alcanza)
        if (user) {
            try {
                guardarRespuesta(user.id, await agregarItem(producto.codigo, 1));
                setAviso(null);
                return true;
            } catch (error) {
                setAviso(mensajeDeError(error));
                return false;
            }
        }

        // Sin sesión: misma validación de stock, pero en el navegador
        const enCarrito = carritoLocal.find(item => item.codigo === producto.codigo)?.cantidad ?? 0;
        if (enCarrito >= producto.stock) {
            setAviso(producto.stock <= 0
                ? `${producto.nombreproducto ?? producto.codigo} está agotado.`
                : `Solo hay ${producto.stock} unidad(es) disponibles de ${producto.nombreproducto ?? producto.codigo}.`);
            return false;
        }

        setCarritoLocal(prev => {
            const existe = prev.find(item => item.codigo === producto.codigo);
            if (existe) {
                return prev.map(item =>
                    item.codigo === producto.codigo ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            const { codigo, nombreproducto, marca, modelo, precio, imagen } = producto;
            return [...prev, { codigo, nombreproducto, marca, modelo, precio, imagen, cantidad: 1 }];
        });
        setAviso(null);
        return true;
    };

    const eliminarDelCarrito = async (codigo: string) => {
        if (user) {
            try {
                guardarRespuesta(user.id, await quitarItem(codigo));
                setAviso(null);
            } catch (error) {
                setAviso(mensajeDeError(error));
            }
            return;
        }
        setCarritoLocal(prev => prev.filter(item => item.codigo !== codigo));
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
