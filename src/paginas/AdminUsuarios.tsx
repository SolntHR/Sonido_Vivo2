import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsuarios, guardarUsuarios } from '../data/db';
import type { Usuario } from '../data/db';
import FormularioUsuario, { type UsuarioFormData } from '../componentes/organismos/FormularioUsuario';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

const AdminUsuarios = () => {
  // Inicialización perezosa (Lazy initialization)
  const [usuarios, setUsuarios] = useState<Usuario[]>(() => getUsuarios());
  const [usuarioEditando, setUsuarioEditando] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("");
  
  // Formulario tipado estrictamente
  const [form, setForm] = useState<UsuarioFormData>({ 
    rut: '', nombre: '', correo: '', password: '', rol: 'Cliente' 
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (campo: string, valor: string) => {
    // Usamos "as UsuarioFormData" para asegurar a TS que el campo es válido
    setForm({ ...form, [campo]: valor } as UsuarioFormData);
    if (errores[campo]) setErrores({ ...errores, [campo]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const nuevosErrores: Record<string, string> = {};
    if (!form.rut) nuevosErrores.rut = "El RUT es obligatorio";
    if (!form.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.correo.includes('@')) nuevosErrores.correo = "Correo inválido";
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    let nuevaLista: Usuario[];

    if (usuarioEditando) {
      // UPDATE
      nuevaLista = usuarios.map(u => u.rut === usuarioEditando ? { ...u, ...form } as Usuario : u);
    } else {
      // CREATE
      if (usuarios.some(u => u.rut === form.rut)) {
        setErrores({ rut: "Este RUT ya está registrado" });
        return;
      }
      nuevaLista = [...usuarios, { ...form, activo: true } as Usuario];
    }

    setUsuarios(nuevaLista);
    guardarUsuarios(nuevaLista);
    limpiarFormulario();
  };

  const eliminarUsuario = (rut: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario con RUT ${rut}?`)) {
      const nuevaLista = usuarios.filter(u => u.rut !== rut);
      setUsuarios(nuevaLista);
      guardarUsuarios(nuevaLista);
    }
  };

  const editarUsuario = (user: Usuario) => {
    setForm({ 
      rut: user.rut, 
      nombre: user.nombre, 
      correo: user.correo, 
      password: user.password || '', 
      rol: user.rol 
    });
    setUsuarioEditando(user.rut);
    setErrores({});
  };

  const limpiarFormulario = () => {
    setForm({ rut: '', nombre: '', correo: '', password: '', rol: 'Cliente' });
    setUsuarioEditando(null);
    setErrores({});
  };

  const usuariosFiltrados = usuarios.filter(u => 
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
    u.correo.toLowerCase().includes(filtro.toLowerCase()) ||
    u.rut.includes(filtro)
  );

  return (
    <div className="container-fluid px-4 my-5">
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">← Volver al Panel</Link>
        <h2 className="mt-2 fw-bold">Mantenedor de Usuarios</h2>
      </div>

      <div className="row">
        {/* ORGANISMO: Formulario de Usuario */}
        <div className="col-lg-4 mb-4">
          <FormularioUsuario 
            form={form}
            errores={errores}
            usuarioEditando={usuarioEditando}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            limpiarFormulario={limpiarFormulario}
          />
        </div>

        {/* ORGANISMO: Tabla de Usuarios */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
              <h5 className="mb-0 fw-bold">Usuarios Registrados</h5>
              <input 
                type="text" 
                className="form-control w-50" 
                placeholder="Buscar por nombre, RUT o correo..." 
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>

            <TablaAdmin 
              columnas={['RUT', 'Nombre', 'Correo', 'Rol', 'Acciones']} 
              mensajeVacio="No se encontraron usuarios"
              hayDatos={usuariosFiltrados.length > 0}
            >
              {usuariosFiltrados.map(u => (
                <tr key={u.rut}>
                  <td className="fw-bold">{u.rut}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    <span className={`badge ${u.rol === 'Administrador' ? 'bg-primary' : 'bg-secondary'}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td className="text-center">
                    <BotonAccion icono="✏️" color="primary" title="Editar" onClick={() => editarUsuario(u)} />
                    <BotonAccion icono="🗑️" color="danger" title="Eliminar" onClick={() => eliminarUsuario(u.rut)} />
                  </td>
                </tr>
              ))}
            </TablaAdmin>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios;