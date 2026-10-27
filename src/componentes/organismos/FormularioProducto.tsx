import CampoFormulario from '../moleculas/CampoFormulario';

export interface ProductoFormData {
    codigo: string;
    nombreproducto: string;
    categoria: string;
    marca: string;
    modelo: string;
    precio: string;
    stock: string;
    descripcion: string;
    imagen: string;
}

interface Props {
    form: ProductoFormData;
    errores: Record<string, string>;
    codigoEditando: string | null;
    categorias: string[];
    handleChange: (campo: keyof ProductoFormData, valor: string) => void;
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
            <form onSubmit={handleSubmit} noValidate aria-label="Formulario de producto">
            <CampoFormulario
                etiqueta="Código"
                tipo="text"
                nombre="codigo"
                valor={form.codigo}
                alCambiar={(v) => handleChange('codigo', v)}
                error={errores.codigo}
                deshabilitado={codigoEditando !== null}
            />

            <CampoFormulario
                etiqueta="Nombre del producto"
                tipo="text"
                nombre="nombreproducto"
                valor={form.nombreproducto}
                alCambiar={(v) => handleChange('nombreproducto', v)}
                error={errores.nombreproducto}
            />

            <div className="mb-3">
                <label className="form-label" htmlFor="campo-categoria">Categoría</label>
                <select
                id="campo-categoria"
                className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
                value={form.categoria}
                onChange={(e) => handleChange('categoria', e.target.value)}
                >
                <option value="">Seleccionar...</option>
                {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                </select>
                {errores.categoria && <div className="invalid-feedback d-block" role="alert">{errores.categoria}</div>}
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
                <div className="col-12 col-sm-6">
                <CampoFormulario
                    etiqueta="Precio ($)"
                    tipo="number"
                    nombre="precio"
                    valor={form.precio}
                    alCambiar={(v) => handleChange('precio', v)}
                    error={errores.precio}
                />
                </div>
                <div className="col-12 col-sm-6">
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

            <CampoFormulario
                etiqueta="Imagen (ruta o URL, opcional)"
                tipo="text"
                nombre="imagen"
                valor={form.imagen}
                alCambiar={(v) => handleChange('imagen', v)}
                error={errores.imagen}
            />

            <div className="mb-3">
                <label className="form-label" htmlFor="campo-descripcion">Descripción Breve</label>
                <textarea
                id="campo-descripcion"
                className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                rows={2}
                value={form.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                />
                {errores.descripcion && <div className="invalid-feedback d-block" role="alert">{errores.descripcion}</div>}
            </div>

            <div className="d-grid gap-2 mt-4">
                <button type="submit" className={`btn ${codigoEditando ? 'btn-warning' : 'btn-dark'}`}>
                {codigoEditando ? "Actualizar Cambios" : "Guardar Producto"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
                {codigoEditando ? "Cancelar edición" : "Limpiar"}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}

export default FormularioProducto;
