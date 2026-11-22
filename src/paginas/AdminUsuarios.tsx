import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { crearUsuario, editarUsuario as editarUsuarioApi, eliminarUsuario, listarUsuarios } from '../api/usuarios';
import { ErrorApi } from '../api/cliente';
import { validarRut, normalizarRut, mismoRut, validarEmail, validarPassword } from '../data/validaciones';
import { filtrarUsuarios } from '../data/filtros';
import { useAuth } from '../context/AuthContext';
import type { Usuario } from '../api/tipos';
import FormularioUsuario, { type UsuarioFormData } from '../componentes/organismos/FormularioUsuario';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

const FORM_VACIO: UsuarioFormData = { rut: '', nombre: '', correo: '', password: '', rol: 'Cliente' };

const AdminUsuarios = () => {
  const { user } = useAuth();
  // Datos del backend: GET /usuarios (solo Admin)
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [usuarioEditando, setUsuarioEditando] = useState<string | null>(null);
  // El backend identifica las cuentas por id: PATCH y DELETE /usuarios/{id}
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [mensaje, setMensaje] = useState("");

  const [form, setForm] = useState<UsuarioFormData>(FORM_VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});
  useEffect(() => {
    listarUsuarios()
      .then(setUsuarios)
      .catch((error: Error) => setMensaje(`No se pudo cargar la lista de usuarios: ${error.message}`))
      .finally(() => setCargando(false));
  }, []);

  const esUsuarioActual = (rut: string) => !!user && mismoRut(user.rut, rut);

  const handleChange = (campo: keyof UsuarioFormData, valor: string) => {
    setForm(prev => ({ ...prev, [campo]: valor }) as UsuarioFormData);
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: '' }));
    setMensaje('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;

    const nuevosErrores: Record<string, string> = {};
    if (!form.rut.trim()) {
      nuevosErrores.rut = "El RUT es obligatorio";
    } else if (!validarRut(form.rut)) {
      nuevosErrores.rut = "El RUT ingresado no es válido (revise el dígito verificador)";
    }
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio";
    } else if (!validarEmail(form.correo.trim())) {
      nuevosErrores.correo = "Formato de correo inválido";
    }

    if (!usuarioEditando) {
      if (!form.password) {
        nuevosErrores.password = "La contraseña es obligatoria";
      } else {
        const errorPassword = validarPassword(form.password);
        if (errorPassword) nuevosErrores.password = errorPassword;
      }
    }

    if (usuarioEditando && esUsuarioActual(usuarioEditando) && form.rol !== 'Administrador') {
      nuevosErrores.rol = "No puedes quitarte el rol de Administrador a ti mismo";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const datos = {
      rut: normalizarRut(form.rut),
      nombre: form.nombre.trim(),
      correo: form.correo.trim().toLowerCase(),
      rol: form.rol,
    };

    setEnviando(true);
    try {
      if (idEditando !== null) {
        // PATCH /usuarios/{id}
        const actualizado = await editarUsuarioApi(idEditando, datos);
        setUsuarios(prev => prev.map(u => (u.id === actualizado.id ? actualizado : u)));
        setMensaje(`Usuario ${actualizado.rut} actualizado correctamente.`);
      } else {
        // POST /usuarios
        const creado = await crearUsuario({ ...datos, password: form.password });
        setUsuarios(prev => [...prev, creado]);
        setMensaje(`Usuario ${creado.rut} creado correctamente.`);
      }
      limpiarFormulario();
    } catch (error) {
      if (error instanceof ErrorApi && Object.keys(error.errores).length > 0) {
        setErrores(error.errores);
      } else if (error instanceof ErrorApi && error.status === 409) {
        const texto = error.message;
        if (texto.includes('correo')) setErrores({ correo: texto });
        else if (texto.includes('RUT')) setErrores({ rut: texto });
        else setMensaje(texto); // por ejemplo: "Debe existir al menos un administrador activo."
      } else {
        setMensaje(error instanceof Error ? error.message : 'No se pudo guardar el usuario.');
      }
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (u: Usuario) => {
    if (esUsuarioActual(u.rut)) {
      setMensaje('No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada.');
      return;
    }
    if (!window.confirm(`¿Seguro que deseas eliminar al usuario con RUT ${u.rut}?`)) return;
    try {
      // DELETE /usuarios/{id}
      await eliminarUsuario(u.id);
      setUsuarios(prev => prev.filter(x => x.id !== u.id));
      if (idEditando === u.id) limpiarFormulario();
      setMensaje(`Usuario ${u.rut} eliminado.`);
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : 'No se pudo eliminar el usuario.');
    }
  };

  const editarUsuario = (u: Usuario) => {
    setForm({ rut: u.rut, nombre: u.nombre, correo: u.correo, password: '', rol: u.rol });
    setUsuarioEditando(u.rut);
    setIdEditando(u.id);
    setErrores({});
    setMensaje('');
  };

  const limpiarFormulario = () => {
    setForm(FORM_VACIO);
    setUsuarioEditando(null);
    setIdEditando(null);
    setErrores({});
  };

  const usuariosFiltrados = filtrarUsuarios(usuarios, filtro);

  return (
    <div className="container-fluid px-3 px-md-4 my-5">
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">← Volver al Panel</Link>
        <h2 className="mt-2 fw-bold">Mantenedor de Usuarios</h2>
      </div>

      {mensaje && <div className="alert alert-info py-2" role="status">{mensaje}</div>}

      <div className="row">
        <div className="col-12 col-lg-4 mb-4">
          <FormularioUsuario
            form={form}
            errores={errores}
            usuarioEditando={usuarioEditando}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            limpiarFormulario={limpiarFormulario}
          />
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 py-3">
              <h5 className="mb-0 fw-bold">
                {cargando ? 'Cargando usuarios...' : `Usuarios Registrados (${usuariosFiltrados.length})`}
              </h5>
              <input
                type="search"
                className="form-control w-auto flex-md-grow-0"
                placeholder="Buscar por nombre, RUT o correo..."
                aria-label="Buscar usuarios"
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
                <tr key={u.id}>
                  <td className="fw-bold text-nowrap">{u.rut}</td>
                  <td>{u.nombre}</td>
                  <td>{u.correo}</td>
                  <td>
                    <span className={`badge ${u.rol === 'Administrador' ? 'bg-primary' : 'bg-secondary'}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td className="text-center text-nowrap">
                    <BotonAccion icono="✏️" color="primary" title={`Editar ${u.rut}`} onClick={() => editarUsuario(u)} />
                    <BotonAccion icono="🗑️" color="danger" title={`Eliminar ${u.rut}`} onClick={() => handleEliminar(u)} />
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
