import { describe, expect, it } from 'vitest';
import {
    mismoRut,
    normalizarRut,
    validarEmail,
    validarPassword,
    validarRut,
} from '../src/data/validaciones';

describe('normalizarRut', () => {
    it('agrega el guion a un RUN sin formato', () => {
        expect(normalizarRut('123456785')).toBe('12345678-5');
    });

    it('quita puntos antes de normalizar', () => {
        expect(normalizarRut('12.345.678-5')).toBe('12345678-5');
    });

    it('convierte la k minúscula a mayúscula', () => {
        expect(normalizarRut('1000005-k')).toBe('1000005-K');
    });

    it('mantiene una entrada de un solo carácter', () => {
        expect(normalizarRut('1')).toBe('1');
    });
});

describe('validarRut', () => {
    it('acepta un RUN válido con puntos y guion', () => {
        expect(validarRut('12.345.678-5')).toBe(true);
    });

    it('acepta un RUN válido sin formato', () => {
        expect(validarRut('123456785')).toBe(true);
    });

    it('acepta la k minúscula como dígito verificador', () => {
        expect(validarRut('1000005-k')).toBe(true);
    });

    it('rechaza un dígito verificador incorrecto', () => {
        expect(validarRut('12345678-4')).toBe(false);
    });

    it('rechaza un RUN demasiado corto', () => {
        expect(validarRut('1234567')).toBe(false);
    });

    it('rechaza letras en el cuerpo del RUN', () => {
        expect(validarRut('12A45678-5')).toBe(false);
    });
});

describe('mismoRut', () => {
    it('considera iguales RUN con distinto formato', () => {
        expect(mismoRut('12.345.678-5', '12345678-5')).toBe(true);
    });

    it('ignora mayúsculas y minúsculas en el dígito K', () => {
        expect(mismoRut('1.000.005-k', '1000005-K')).toBe(true);
    });

    it('considera distintos RUN con números diferentes', () => {
        expect(mismoRut('12345678-5', '11111111-1')).toBe(false);
    });
});

describe('validarEmail', () => {
    it('acepta una dirección de correo válida', () => {
        expect(validarEmail('persona@ejemplo.cl')).toBe(true);
    });

    it('rechaza una dirección sin arroba', () => {
        expect(validarEmail('persona.ejemplo.cl')).toBe(false);
    });

    it('rechaza una dirección sin extensión de dominio', () => {
        expect(validarEmail('persona@ejemplo')).toBe(false);
    });

    it('rechaza espacios en la dirección', () => {
        expect(validarEmail('persona @ejemplo.cl')).toBe(false);
    });
});

describe('validarPassword', () => {
    it('acepta una contraseña que cumple todos los requisitos', () => {
        expect(validarPassword('SonidoVivo1')).toBeNull();
    });

    it('informa si la contraseña tiene menos de ocho caracteres', () => {
        expect(validarPassword('Abc123')).toBe('A la contraseña le falta al menos 8 caracteres.');
    });

    it('informa si falta una letra mayúscula', () => {
        expect(validarPassword('sonidovivo1')).toBe('A la contraseña le falta una letra mayúscula.');
    });

    it('informa si falta una letra minúscula', () => {
        expect(validarPassword('SONIDOVIVO1')).toBe('A la contraseña le falta una letra minúscula.');
    });

    it('informa si falta un número', () => {
        expect(validarPassword('SonidoVivo')).toBe('A la contraseña le falta un número.');
    });

    it('enumera varios requisitos faltantes', () => {
        expect(validarPassword('abc')).toBe(
            'A la contraseña le falta al menos 8 caracteres, una letra mayúscula y un número.',
        );
    });
});
