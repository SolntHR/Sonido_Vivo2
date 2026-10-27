import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import FormularioRegistro from '../src/componentes/organismos/FormularioRegistro';

describe('visibilidad de contraseña en el registro', () => {
    it('muestra y oculta cada contraseña de forma independiente', () => {
        render(
            <MemoryRouter>
                <FormularioRegistro />
            </MemoryRouter>,
        );

        const password = screen.getByLabelText('Contraseña');
        const confirmPassword = screen.getByLabelText('Confirmar Contraseña');

        expect(password).toHaveAttribute('type', 'password');
        expect(confirmPassword).toHaveAttribute('type', 'password');

        fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }));

        expect(password).toHaveAttribute('type', 'text');
        expect(confirmPassword).toHaveAttribute('type', 'password');

        fireEvent.click(screen.getByRole('button', { name: 'Ocultar contraseña' }));
        fireEvent.click(screen.getByRole('button', { name: 'Mostrar confirmación de contraseña' }));

        expect(password).toHaveAttribute('type', 'password');
        expect(confirmPassword).toHaveAttribute('type', 'text');
    });
});
