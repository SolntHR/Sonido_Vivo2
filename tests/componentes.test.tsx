import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import BotonAgregar from '../src/componentes/atomos/BotonAgregar';
import BotonCarrito from '../src/componentes/atomos/BotonCarrito';
import Contacto from '../src/paginas/Contacto';

describe('clases responsivas en Contacto', () => {
    const markup = renderToStaticMarkup(createElement(Contacto));

    it('mantiene la columna de información a ancho completo en móvil', () => {
        expect(markup).toContain('class="col-12 col-lg-4"');
    });

    it('mantiene el formulario a ancho completo en móvil y cambia en escritorio', () => {
        expect(markup).toContain('class="col-12 col-lg-6"');
    });
});

describe('renderizado dinámico de BotonCarrito', () => {
    it('muestra la cantidad actual de productos en el contador', () => {
        const markup = renderToStaticMarkup(
            createElement(BotonCarrito, { cantidad: 3, onClick: vi.fn() }),
        );

        expect(markup).toContain('>3</span>');
    });

    it('oculta el contador cuando la cantidad es cero', () => {
        const markup = renderToStaticMarkup(
            createElement(BotonCarrito, { cantidad: 0, onClick: vi.fn() }),
        );

        expect(markup).not.toContain('badge rounded-pill');
    });
});

describe('renderizado dinámico de BotonAgregar', () => {
    it('muestra el texto personalizado y habilita el botón cuando hay stock', () => {
        const markup = renderToStaticMarkup(
            createElement(BotonAgregar, {
                onClick: vi.fn(),
                texto: 'Añadir al carrito',
                deshabilitado: false,
            }),
        );

        expect(markup).toContain('Añadir al carrito');
        expect(markup).not.toContain('disabled=""');
    });

    it('deshabilita el botón cuando no hay stock', () => {
        const markup = renderToStaticMarkup(
            createElement(BotonAgregar, {
                onClick: vi.fn(),
                texto: 'Sin Stock',
                deshabilitado: true,
            }),
        );

        expect(markup).toContain('Sin Stock');
        expect(markup).toContain('disabled=""');
    });
});
