import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Productos from '../src/paginas/Productos';
import { CartProvider } from '../src/context/CartProvider';
import { filtrarProductos } from '../src/data/filtros';
import { productos as catalogo } from '../src/data/Coleccion';

const renderProductos = (ruta = '/productos') =>
    render(
        <MemoryRouter initialEntries={[ruta]}>
            <CartProvider>
                <Productos />
            </CartProvider>
        </MemoryRouter>,
    );

const tarjetas = () => screen.queryAllByRole('link', { name: 'Ver producto' });

beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
});

describe('filtrarProductos', () => {
    it('sin filtros devuelve todos los productos', () => {
        expect(filtrarProductos(catalogo, {})).toHaveLength(catalogo.length);
    });

    it('filtra por categoría', () => {
        const resultado = filtrarProductos(catalogo, { categorias: ['Baterías'] });

        expect(resultado.length).toBeGreaterThan(0);
        expect(resultado.every(p => p.categoria === 'Baterías')).toBe(true);
    });

    it('busca por texto sin importar tildes ni mayúsculas', () => {
        const resultado = filtrarProductos(catalogo, { categorias: ['Guitarras Acústicas'], texto: 'YAMAHA' });

        expect(resultado.map(p => p.codigo)).toEqual(['GA001', 'GA003', 'GA005']);
    });
});

describe('Filtros en la página de productos', () => {
    it('muestra una tarjeta por cada producto', () => {
        renderProductos();

        expect(tarjetas()).toHaveLength(catalogo.length);
    });

    it('aplica la categoría que viene en la URL', () => {
        renderProductos('/productos?categoria=Baterías');

        expect(screen.getByLabelText('Baterías')).toBeChecked();
        expect(tarjetas()).toHaveLength(catalogo.filter(p => p.categoria === 'Baterías').length);
    });

    it('filtra al marcar una categoría', () => {
        renderProductos();

        fireEvent.click(screen.getByLabelText('Micrófonos'));

        expect(tarjetas()).toHaveLength(catalogo.filter(p => p.categoria === 'Micrófonos').length);
    });

    it('muestra el aviso solo cuando la búsqueda no tiene resultados', () => {
        renderProductos();
        const buscador = screen.getByRole('searchbox', { name: 'Buscar productos' });
        expect(screen.queryByText('No hay productos')).not.toBeInTheDocument();

        fireEvent.change(buscador, { target: { value: 'zzz' } });

        expect(tarjetas()).toHaveLength(0);
        expect(screen.getByText('No hay productos')).toBeInTheDocument();
    });

    it('agrega al carrito al hacer clic en Añadir al Carrito', () => {
        renderProductos('/productos?categoria=Baterías');

        fireEvent.click(screen.getAllByRole('button', { name: 'Añadir al Carrito' })[0]);

        expect(JSON.parse(localStorage.getItem('carritoSonidoVivo')!)).toHaveLength(1);
    });
});
