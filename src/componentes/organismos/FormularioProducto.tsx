import CampoFormulario from '../moleculas/CampoFormulario';

// Tipado estricto para el formulario
export interface ProductoFormData {
    codigo: string;
    categoria: string;
    marca: string;
    modelo: string;
    precio: string;
    stock: string;
    descripcion: string;
}

interface Props {
    form: ProductoFormData;
    errores: Record<string, string>;
    codigoEditando: string | null;
    categorias: string[];
    handleChange: (campo: string, valor: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    limpiarFormulario: () => void;
}

function FormularioProducto({ form, errores, codigoEditando, categorias, handleChange, handleSubmit, limpiarFormulario }: Props) {
    return (
        <div className="card shadow-sm">
        <div className={`card-header text-white ${codigoEditando ? 'bg-warning text-dark' : 'bg-dark'}`}>
            <h5 className="mb-0">{codigoEditando ? "Editar Producto" : "Agregar Nuevo Producto"}</h5>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
            <CampoFormulario 
                etiqueta="Código" 
                tipo="text" 
                nombre="codigo" 
                valor={form.codigo} 
                alCambiar={(v) => handleChange('codigo', v)} 
                error={errores.codigo} 
            />
            
            <div className="mb-3">
                <label className="form-label">Categoría</label>
                <select 
                className="form-select" 
                value={form.categoria} 
                onChange={(e) => handleChange('categoria', e.target.value)}
                >
                <option value="">Seleccionar...</option>
                {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
            </div>

            <CampoFormulario 
                etiqueta="Marca" 
                tipo="text" 
                nombre="marca" 
                valor={form.marca} 
                alCambiar={(v) => handleChange('marca', v)} 
                error={errores.marca} 
            />
            <CampoFormulario 
                etiqueta="Modelo" 
                tipo="text" 
                nombre="modelo" 
                valor={form.modelo} 
                alCambiar={(v) => handleChange('modelo', v)} 
                error={errores.modelo} 
            />
            
            <div className="row">
                <div className="col-6">
                <CampoFormulario 
                    etiqueta="Precio ($)" 
                    tipo="number" 
                    nombre="precio" 
                    valor={form.precio} 
                    alCambiar={(v) => handleChange('precio', v)} 
                    error={errores.precio} 
                />
                </div>
                <div className="col-6">
                <CampoFormulario 
                    etiqueta="Stock" 
                    tipo="number" 
                    nombre="stock" 
                    valor={form.stock} 
                    alCambiar={(v) => handleChange('stock', v)} 
                    error={errores.stock} 
                />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción Breve</label>
                <textarea 
                className="form-control" 
                rows={2} 
                value={form.descripcion} 
                onChange={(e) => handleChange('descripcion', e.target.value)} 
                />
            </div>

            <div className="d-grid gap-2 mt-4">
                <button type="submit" className={`btn ${codigoEditando ? 'btn-warning' : 'btn-dark'}`}>
                {codigoEditando ? "Actualizar Cambios" : "Guardar Producto"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
                Limpiar
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default FormularioProducto;