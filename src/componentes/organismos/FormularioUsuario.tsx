import CampoFormulario from '../moleculas/CampoFormulario';

// Tipado estricto para el formulario
export interface UsuarioFormData {
    rut: string;
    nombre: string;
    correo: string;
    password?: string;
    rol: 'Cliente' | 'Administrador';
}

interface Props {
    form: UsuarioFormData;
    errores: Record<string, string>;
    usuarioEditando: string | null;
    handleChange: (campo: string, valor: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    limpiarFormulario: () => void;
}

function FormularioUsuario({ form, errores, usuarioEditando, handleChange, handleSubmit, limpiarFormulario }: Props) {
    return (
        <div className="card shadow-sm">
        <div className={`card-header text-white ${usuarioEditando ? 'bg-warning text-dark' : 'bg-primary'}`}>
            <h5 className="mb-0">{usuarioEditando ? "Editar Usuario" : "Agregar Nuevo Usuario"}</h5>
        </div>
        <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
            <CampoFormulario 
                etiqueta="RUT (con o sin puntos y guion)" 
                tipo="text" 
                nombre="rut" 
                valor={form.rut} 
                alCambiar={(v) => handleChange('rut', v)} 
                error={errores.rut} 
            />
            <CampoFormulario 
                etiqueta="Nombre Completo" 
                tipo="text" 
                nombre="nombre" 
                valor={form.nombre} 
                alCambiar={(v) => handleChange('nombre', v)} 
                error={errores.nombre} 
            />
            <CampoFormulario 
                etiqueta="Correo Electrónico" 
                tipo="email" 
                nombre="correo" 
                valor={form.correo} 
                alCambiar={(v) => handleChange('correo', v)} 
                error={errores.correo} 
            />
            
            {!usuarioEditando && (
                <CampoFormulario 
                etiqueta="Contraseña" 
                tipo="password" 
                nombre="password" 
                valor={form.password || ''} 
                alCambiar={(v) => handleChange('password', v)}
                error={errores.password}
                />
            )}

            <div className="mb-3">
                <label className="form-label">Rol</label>
                <select 
                className="form-select" 
                value={form.rol} 
                onChange={(e) => handleChange('rol', e.target.value)}
                >
                <option value="Cliente">Cliente</option>
                <option value="Administrador">Administrador</option>
                </select>
            </div>

            <div className="d-grid gap-2 mt-4">
                <button type="submit" className={`btn ${usuarioEditando ? 'btn-warning' : 'btn-primary'}`}>
                {usuarioEditando ? "Actualizar Cambios" : "Guardar Usuario"}
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

export default FormularioUsuario;