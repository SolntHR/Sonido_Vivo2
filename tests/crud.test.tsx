import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminMantenedor from '../src/paginas/AdminMantenedor';
import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    type Producto,
} from '../src/data/db';
import { productos as catalogo } from '../src/data/Coleccion';

const nuevo: Producto = {
    codigo: 'TS001',
    nombreproducto: 'Afinador Pro',
    categoria: 'Accesorios',
    marca: 'Korg',
    modelo: 'TM-60',
    precio: 25990,
    stock: 4,
    descripcion: '',
};

const renderMantenedor = () => render(<MemoryRouter><AdminMantenedor /></MemoryRouter>);
const filas = () => within(screen.getByRole('table')).getAllByRole('row').slice(1);
const escribir = (etiqueta: string, valor: string) =>
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });

beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
});

describe('CRUD de productos en el módulo de datos', () => {
    it('crea un producto y lanza error si el código ya existe', () => {
        crearProducto(nuevo);

        expect(obtenerProducto('TS001')).toEqual(nuevo);
        expect(() => crearProducto(nuevo)).toThrow('Este código ya existe.');
    });

    it('actualiza solo los campos indicados', () => {
        actualizarProducto('GA001', { precio: 99990 });

        expect(obtenerProducto('GA001')?.precio).toBe(99990);
        expect(obtenerProducto('GA001')?.marca).toBe('Yamaha');
    });

    it('elimina un producto y lanza error si no existe', () => {
        eliminarProducto('GA001');

        expect(obtenerProducto('GA001')).toBeUndefined();
        expect(() => eliminarProducto('GA001')).toThrow('no existe');
    });
});

describe('CRUD de productos en la interfaz (AdminMantenedor)', () => {
    it('lista todos los productos en la tabla', () => {
        renderMantenedor();

        expect(filas()).toHaveLength(catalogo.length);
    });

    it('muestra errores solo al enviar el formulario vacío', () => {
        renderMantenedor();
        expect(screen.queryByText('El código es obligatorio.')).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        expect(screen.getByText('El código es obligatorio.')).toBeInTheDocument();
        expect(screen.getByText('Debe seleccionar una categoría.')).toBeInTheDocument();
    });

    it('crea un producto desde el formulario', () => {
        renderMantenedor();

        escribir('Código', 'TS001');
        escribir('Nombre del producto', 'Afinador Pro');
        escribir('Categoría', 'Accesorios');
        escribir('Marca', 'Korg');
        escribir('Modelo', 'TM-60');
        escribir('Precio ($)', '25990');
        escribir('Stock', '4');
        fireEvent.click(screen.getByRole('button', { name: 'Guardar Producto' }));

        expect(filas()).toHaveLength(catalogo.length + 1);
        expect(screen.getByRole('cell', { name: 'TS001' })).toBeInTheDocument();
    });

    it('edita el precio de un producto', () => {
        renderMantenedor();

        fireEvent.click(screen.getByRole('button', { name: 'Editar GA001' }));
        expect(screen.getByLabelText('Código')).toBeDisabled();
        escribir('Precio ($)', '111111');
        fireEvent.click(screen.getByRole('button', { name: 'Actualizar Cambios' }));

        expect(screen.getByText('$111.111')).toBeInTheDocument();
        expect(obtenerProducto('GA001')?.precio).toBe(111111);
    });

    it('elimina un producto solo si el usuario confirma', () => {
        const confirmar = vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);
        renderMantenedor();

        fireEvent.click(screen.getByRole('button', { name: 'Eliminar GA001' }));
        expect(screen.getByRole('cell', { name: 'GA001' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Eliminar GA001' }));
        expect(confirmar).toHaveBeenCalledTimes(2);
        expect(screen.queryByRole('cell', { name: 'GA001' })).not.toBeInTheDocument();
    });
});
