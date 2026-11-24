import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { crearNoticia, editarNoticia, eliminarNoticia, listarNoticias, type DatosNoticia } from '../api/noticias';
import { ErrorApi } from '../api/cliente';
import type { Noticia } from '../api/tipos';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

/** Fecha de hoy en formato AAAA-MM-DD (hora local) */
const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const formVacio = (): DatosNoticia => ({ categoria: '', titulo: '', fecha: hoy(), resumen: '', contenido: '', imagen: '' });

const aFormulario = (n: Noticia): DatosNoticia => ({
  categoria: n.categoria, titulo: n.titulo, fecha: n.fecha, resumen: n.resumen, contenido: n.contenido, imagen: n.imagen ?? '',
});

/** Mismas reglas que NoticiaRequest en el backend */
const validar = (f: DatosNoticia): Record<string, string> => {
  const e: Record<string, string> = {};
  if (!f.categoria.trim()) e.categoria = 'La categoría es obligatoria.';
  else if (f.categoria.trim().length > 80) e.categoria = 'Máximo 80 caracteres.';
  if (!f.titulo.trim()) e.titulo = 'El título es obligatorio.';
  else if (f.titulo.trim().length > 180) e.titulo = 'Máximo 180 caracteres.';
  if (!f.fecha) e.fecha = 'La fecha es obligatoria.';
  if (!f.resumen.trim()) e.resumen = 'El resumen es obligatorio.';
  else if (f.resumen.trim().length > 500) e.resumen = 'Máximo 500 caracteres.';
  if (!f.contenido.trim()) e.contenido = 'El contenido es obligatorio.';
  if (f.imagen.trim().length > 500) e.imagen = 'Máximo 500 caracteres.';
  return e;
};

/** Publicaciones del blog. Solo Administrador (POST, PATCH y DELETE /noticias) */
const AdminNoticias = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState('');
  const [form, setForm] = useState<DatosNoticia>(formVacio);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [editando, setEditando] = useState<Noticia | null>(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    listarNoticias()
      .then(setNoticias)
      .catch((error: Error) => setAviso(`No se pudieron cargar las noticias: ${error.message}`))
      .finally(() => setCargando(false));
  }, []);

  const cambiar = (campo: keyof DatosNoticia, valor: string) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: '' }));
  };

  const limpiar = () => {
    setForm(formVacio());
    setErrores({});
    setEditando(null);
  };

  const editar = (n: Noticia) => {
    setEditando(n);
    setForm(aFormulario(n));
    setErrores({});
    setAviso('');
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    const nuevos = validar(form);
    if (Object.keys(nuevos).length > 0) {
      setErrores(nuevos);
      return;
    }
    const datos: DatosNoticia = {
      categoria: form.categoria.trim(), titulo: form.titulo.trim(), fecha: form.fecha,
      resumen: form.resumen.trim(), contenido: form.contenido.trim(), imagen: form.imagen.trim(),
    };

    setEnviando(true);
    try {
      if (editando) {
        // PATCH: solo viajan los campos que cambiaron respecto de la noticia original
        const original = aFormulario(editando);
        const cambios = Object.fromEntries(
          (Object.keys(datos) as (keyof DatosNoticia)[])
            .filter(k => datos[k] !== original[k])
            .map(k => [k, datos[k]]),
        ) as Partial<DatosNoticia>;
        if (Object.keys(cambios).length === 0) {
          setAviso('No hay cambios para guardar.');
        } else {
          const actualizada = await editarNoticia(editando.id, cambios);
          setNoticias(prev => prev.map(n => (n.id === actualizada.id ? actualizada : n)));
          setAviso(`Noticia "${actualizada.titulo}" actualizada correctamente.`);
        }
      } else {
        const creada = await crearNoticia(datos);
        setNoticias(prev => [creada, ...prev].sort((a, b) => b.fecha.localeCompare(a.fecha)));
        setAviso(`Noticia "${creada.titulo}" publicada correctamente.`);
      }
      limpiar();
    } catch (error) {
      if (error instanceof ErrorApi) {
        setErrores(error.errores);
        setAviso(error.message);
      } else {
        setAviso('No se pudo guardar la noticia.');
      }
    } finally {
      setEnviando(false);
    }
  };

  const eliminar = async (n: Noticia) => {
    if (!window.confirm(`¿Seguro que deseas eliminar la noticia "${n.titulo}"?`)) return;
    try {
      await eliminarNoticia(n.id);
      setNoticias(prev => prev.filter(x => x.id !== n.id));
      if (editando?.id === n.id) limpiar();
      setAviso('Noticia eliminada.');
    } catch (error) {
      setAviso(error instanceof Error ? error.message : 'No se pudo eliminar la noticia.');
    }
  };

  const campoTexto = (campo: keyof DatosNoticia, etiqueta: string, tipo = 'text') => (
    <div className="mb-3">
      <label className="form-label" htmlFor={`noticia-${campo}`}>{etiqueta}</label>
      <input
        id={`noticia-${campo}`}
        type={tipo}
        className={`form-control ${errores[campo] ? 'is-invalid' : ''}`}
        value={form[campo]}
        onChange={(e) => cambiar(campo, e.target.value)}
      />
      {errores[campo] && <div className="invalid-feedback d-block" role="alert">{errores[campo]}</div>}
    </div>
  );

  const areaTexto = (campo: keyof DatosNoticia, etiqueta: string, filas: number, ayuda?: string) => (
    <div className="mb-3">
      <label className="form-label" htmlFor={`noticia-${campo}`}>{etiqueta}</label>
      <textarea
        id={`noticia-${campo}`}
        rows={filas}
        className={`form-control ${errores[campo] ? 'is-invalid' : ''}`}
        value={form[campo]}
        onChange={(e) => cambiar(campo, e.target.value)}
      />
      {ayuda && <small className="text-secondary d-block">{ayuda}</small>}
      {errores[campo] && <div className="invalid-feedback d-block" role="alert">{errores[campo]}</div>}
    </div>
  );

  return (
    <div className="container-fluid px-3 px-md-4 my-5">
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">← Volver al Panel</Link>
        <h2 className="mt-2 fw-bold">Mantenedor de Noticias</h2>
      </div>

      {aviso && <div className="alert alert-info py-2" role="status">{aviso}</div>}

      <div className="row">
        <div className="col-12 col-lg-4 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-warning fw-bold">{editando ? 'Editar Noticia' : 'Publicar Noticia'}</div>
            <div className="card-body">
              <form onSubmit={guardar} noValidate aria-label="Formulario de noticia">
                {campoTexto('categoria', 'Categoría')}
                {campoTexto('titulo', 'Título')}
                {campoTexto('fecha', 'Fecha de publicación', 'date')}
                {areaTexto('resumen', 'Resumen', 2)}
                {areaTexto('contenido', 'Contenido', 6, 'Separa los párrafos con una línea en blanco.')}
                {campoTexto('imagen', 'Imagen (ruta o URL, opcional)')}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning fw-bold" disabled={enviando}>
                    {enviando ? 'Guardando...' : editando ? 'Actualizar Cambios' : 'Publicar Noticia'}
                  </button>
                  {editando && <button type="button" className="btn btn-secondary" onClick={limpiar}>Cancelar edición</button>}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">{cargando ? 'Cargando noticias...' : `Noticias Publicadas (${noticias.length})`}</h5>
            </div>
            <TablaAdmin
              columnas={['Fecha', 'Título', 'Categoría', 'Acciones']}
              mensajeVacio="No hay noticias publicadas"
              hayDatos={noticias.length > 0}
            >
              {noticias.map(n => (
                <tr key={n.id}>
                  <td className="text-nowrap">{n.fecha}</td>
                  <td>
                    <Link to={`/noticias/${n.id}`} target="_blank" className="fw-bold text-decoration-none">{n.titulo}</Link>
                  </td>
                  <td><span className="badge bg-secondary">{n.categoria}</span></td>
                  <td className="text-center text-nowrap">
                    <BotonAccion icono="✏️" color="primary" title={`Editar ${n.titulo}`} onClick={() => editar(n)} />
                    <BotonAccion icono="🗑️" color="danger" title={`Eliminar ${n.titulo}`} onClick={() => eliminar(n)} />
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

export default AdminNoticias;
