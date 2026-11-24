import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminarMensaje, listarMensajes, responderMensaje } from '../api/contactos';
import { ErrorApi } from '../api/cliente';
import type { MensajeContacto } from '../api/tipos';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

type Filtro = 'TODOS' | 'PENDIENTE' | 'ATENDIDO';

const formatearFecha = (iso?: string) =>
  iso ? new Date(iso).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' }) : '';

/** Mensajes del formulario de Contacto. Solo Administrador (GET, PATCH y DELETE /contactos) */
const AdminMensajes = () => {
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState<Filtro>('TODOS');
  const [aviso, setAviso] = useState('');

  // Mensaje que se está respondiendo (panel de la izquierda)
  const [seleccionado, setSeleccionado] = useState<MensajeContacto | null>(null);
  const [respuesta, setRespuesta] = useState('');
  const [errorRespuesta, setErrorRespuesta] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarMensajes()
      .then(setMensajes)
      .catch((error: Error) => setAviso(`No se pudieron cargar los mensajes: ${error.message}`))
      .finally(() => setCargando(false));
  }, []);

  const visibles = mensajes.filter(m => filtro === 'TODOS' || m.estado === filtro);
  const pendientes = mensajes.filter(m => m.estado === 'PENDIENTE').length;

  const abrir = (m: MensajeContacto) => {
    setSeleccionado(m);
    setRespuesta(m.respuesta ?? '');
    setErrorRespuesta('');
    setAviso('');
  };

  const cerrar = () => {
    setSeleccionado(null);
    setRespuesta('');
    setErrorRespuesta('');
  };

  const enviarRespuesta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seleccionado || enviando) return;
    const texto = respuesta.trim();
    if (!texto) return setErrorRespuesta('Escribe una respuesta.');
    if (texto.length > 1000) return setErrorRespuesta('La respuesta no puede superar los 1000 caracteres.');

    setEnviando(true);
    try {
      const actualizado = await responderMensaje(seleccionado.id, texto);
      // Se reemplaza el mensaje en la lista con la versión que devuelve el backend
      setMensajes(prev => prev.map(m => (m.id === actualizado.id ? actualizado : m)));
      setAviso(`Respuesta enviada a ${actualizado.nombre}. La verá en su perfil.`);
      cerrar();
    } catch (error) {
      setErrorRespuesta(error instanceof ErrorApi ? (error.errores.respuesta ?? error.message) : 'No se pudo enviar la respuesta.');
    } finally {
      setEnviando(false);
    }
  };

  const eliminar = async (m: MensajeContacto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar el mensaje de ${m.nombre}?`)) return;
    try {
      await eliminarMensaje(m.id);
      setMensajes(prev => prev.filter(x => x.id !== m.id));
      if (seleccionado?.id === m.id) cerrar();
      setAviso('Mensaje eliminado.');
    } catch (error) {
      setAviso(error instanceof Error ? error.message : 'No se pudo eliminar el mensaje.');
    }
  };

  return (
    <div className="container-fluid px-3 px-md-4 my-5">
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">← Volver al Panel</Link>
        <h2 className="mt-2 fw-bold">Mensajes de Contacto</h2>
      </div>

      {aviso && <div className="alert alert-info py-2" role="status">{aviso}</div>}

      <div className="row">
        <div className="col-12 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-warning fw-bold">Responder mensaje</div>
            <div className="card-body">
              {!seleccionado ? (
                <p className="text-secondary mb-0">Selecciona un mensaje con el botón ✉️ para responderlo.</p>
              ) : (
                <form onSubmit={enviarRespuesta} noValidate aria-label="Responder mensaje">
                  <p className="mb-1 fw-bold">{seleccionado.nombre}</p>
                  <p className="mb-1 small">{seleccionado.correo}</p>
                  <p className="mb-3 small text-secondary">{formatearFecha(seleccionado.fechaCreacion)}</p>
                  <blockquote className="border-start border-3 ps-3 mb-3">{seleccionado.mensaje}</blockquote>
                  <label className="form-label" htmlFor="campo-respuesta">Respuesta</label>
                  <textarea
                    id="campo-respuesta"
                    className={`form-control ${errorRespuesta ? 'is-invalid' : ''}`}
                    rows={5}
                    value={respuesta}
                    onChange={(e) => { setRespuesta(e.target.value); setErrorRespuesta(''); }}
                  />
                  {errorRespuesta && <div className="invalid-feedback d-block" role="alert">{errorRespuesta}</div>}
                  <small className="text-secondary d-block mt-1">{respuesta.trim().length}/1000</small>
                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-warning fw-bold" disabled={enviando}>
                      {enviando ? 'Enviando...' : seleccionado.respuesta ? 'Actualizar respuesta' : 'Enviar respuesta'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={cerrar}>Cancelar</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 py-3">
              <h5 className="mb-0 fw-bold">
                {cargando ? 'Cargando mensajes...' : `Mensajes (${visibles.length}) · ${pendientes} pendiente(s)`}
              </h5>
              <select
                className="form-select w-auto"
                aria-label="Filtrar mensajes por estado"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value as Filtro)}
              >
                <option value="TODOS">Todos</option>
                <option value="PENDIENTE">Pendientes</option>
                <option value="ATENDIDO">Respondidos</option>
              </select>
            </div>

            <TablaAdmin
              columnas={['Fecha', 'Nombre', 'Correo', 'Mensaje', 'Estado', 'Acciones']}
              mensajeVacio="No hay mensajes en esta vista"
              hayDatos={visibles.length > 0}
            >
              {visibles.map(m => (
                <tr key={m.id}>
                  <td className="text-nowrap small">{formatearFecha(m.fechaCreacion)}</td>
                  <td>{m.nombre}</td>
                  <td className="small">{m.correo}</td>
                  <td className="small" style={{ maxWidth: 280 }}>{m.mensaje}</td>
                  <td>
                    <span className={`badge ${m.estado === 'ATENDIDO' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {m.estado === 'ATENDIDO' ? 'Respondido' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="text-center text-nowrap">
                    <BotonAccion icono="✉️" color="primary" title={`Responder a ${m.nombre}`} onClick={() => abrir(m)} />
                    <BotonAccion icono="🗑️" color="danger" title={`Eliminar mensaje de ${m.nombre}`} onClick={() => eliminar(m)} />
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

export default AdminMensajes;
