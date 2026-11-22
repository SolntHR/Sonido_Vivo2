import { api } from './cliente';
import type { Categoria } from './tipos';

export const listarCategorias = () => api<Categoria[]>('/categorias');