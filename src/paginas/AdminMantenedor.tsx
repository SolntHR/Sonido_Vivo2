import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { crearProducto, editarProducto as editarProductoApi, eliminarProducto, listarProductos, type DatosProducto } from '../api/productos';
import { listarCategorias } from '../api/categorias';
import { ErrorApi } from '../api/cliente';
import type { Producto } from '../api/tipos';
import { filtrarProductos } from '../data/filtros';
import { validarProducto } from '../data/validaciones';
import FormularioProducto, { type ProductoFormData } from '../componentes/organismos/FormularioProducto';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

const FORM_VACIO: ProductoFormData = {
  codigo: '', nombreproducto: '', categoria: '', marca: '', modelo: '', precio: '', stock: '', descripcion: '', imagen: ''
};

const AdminMantenedor = () => {
  // Datos del backend: GET /productos y GET /categorias
  const [productos, setProductos] = useState<Producto[]>([]);
  const [CATEGORIAS_DISPONIBLES, setCategorias] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null);
  // El backend identifica los productos por id: PATCH y DELETE /productos/{id}
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState('');
  // El Panel de Control enlaza a /admin/mantenedor?stock=agotados para ver solo los productos sin stock
  const [params] = useSearchParams();
  const [soloSinStock, setSoloSinStock] = useState(() => params.get('stock') === 'agotados');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState<ProductoFormData>(FORM_VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([listarProductos(), listarCategorias()])
      .then(([lista, cats]) => {
        setProductos(lista);
        setCategorias(cats.map(c => c.nombre));
      })
      .catch((error: Error) => setMensaje(`No se pudo cargar el inventario: ${error.message}`))
      .finally(() => setCargando(false));
  }, []);

  const handleChange = (campo: keyof ProductoFormData, valor: string) => {
    setForm(prev => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: '' }));
    setMensaje('');
  };

  const handleCheckboxChange = (categoria: string) => {
    setCategoriasFiltro(prev =>
      prev.includes(categoria)
        ? prev.filter(c => c !== categoria)
        : [...prev, categoria]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;

    const nuevosErrores = validarProducto(form);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    if (Number(form.precio) < 1000) {
      const confirmar = window.confirm(
        `Alerta: El precio ingresado es de $${form.precio}.\n¿Estás seguro de que este precio es correcto?`
      );
      if (!confirmar) return;
    }

    const datos: DatosProducto = {
    codigo: form.codigo.trim().toUpperCase(),
    nombreproducto: form.nombreproducto.trim(),
    categoria: form.categoria,
    marca: form.marca.trim(),
    modelo: form.modelo.trim(),
    precio: Number(form.precio),
    stock: Number(form.stock),
    descripcion: form.descripcion.trim(),
    imagen: form.imagen.trim(),
    };

    setEnviando(true);
    try {
      if (idEditando !== null) {
        // PATCH /productos/{id}
        const actualizado = await editarProductoApi(idEditando, datos);
        setProductos(prev => prev.map(p => (p.id === actualizado.id ? actualizado : p)));
        setMensaje(`Producto ${actualizado.codigo} actualizado correctamente.`);
      } else {
        // POST /productos
        const creado = await crearProducto(datos);
        setProductos(prev => [...prev, creado]);
        setMensaje(`Producto ${creado.codigo} creado correctamente.`);
      }
      limpiarFormulario();
    } catch (error) {
      if (error instanceof ErrorApi && Object.keys(error.errores).length > 0) {
        setErrores(error.errores);           // 400: errores por campo del backend
      } else if (error instanceof ErrorApi && error.status === 409) {
        setErrores({ codigo: error.message }); // 409: "Este código ya existe."
      } else {
        setMensaje(error instanceof Error ? error.message : 'No se pudo guardar el producto.');
      }
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (p: Producto) => {
    if (!window.confirm(`¿Seguro que deseas eliminar el producto ${p.codigo}?`)) return;
    try {
      // DELETE /productos/{id}
      await eliminarProducto(p.id);
      setProductos(prev => prev.filter(x => x.id !== p.id));
      if (idEditando === p.id) limpiarFormulario();
      setMensaje(`Producto ${p.codigo} eliminado.`);
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : 'No se pudo eliminar el producto.');
    }
  };

  const editarProducto = (p: Producto) => {
    setForm({
      codigo: p.codigo,
      nombreproducto: p.nombreproducto ?? '',
      categoria: p.categoria,
      marca: p.marca,
      modelo: p.modelo,
      precio: p.precio.toString(),
      stock: p.stock.toString(),
      descripcion: p.descripcion ?? '',
      imagen: p.imagen ?? '',
    });
    setCodigoEditando(p.codigo);
    setIdEditando(p.id);
    setErrores({});
    setMensaje('');
  };

  const limpiarFormulario = () => {
    setForm(FORM_VACIO);
    setCodigoEditando(null);
    setIdEditando(null);
    setErrores({});
  };

  const productosFiltrados = filtrarProductos(productos, { categorias: categoriasFiltro, texto: busqueda })
    .filter(p => !soloSinStock || p.stock === 0);

  return (
    <div className="container-fluid px-3 px-md-4 my-5">
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">← Volver al Panel</Link>
        <h2 className="mt-2 fw-bold">Mantenedor de Productos</h2>
      </div>

      {mensaje && <div className="alert alert-info py-2" role="status">{mensaje}</div>}

      <div className="row">
        <div className="col-12 col-lg-4 mb-4">
          <FormularioProducto
            form={form}
            errores={errores}
            codigoEditando={codigoEditando}
            categorias={CATEGORIAS_DISPONIBLES}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            limpiarFormulario={limpiarFormulario}
          />
        </div>

        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">

            <div className="card-header bg-white py-3">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
                <h5 className="mb-0 fw-bold">
                  {cargando ? 'Cargando inventario...' : `Inventario Actual (${productosFiltrados.length})`}
                </h5>
                <input
                  type="search"
                  className="form-control w-auto flex-md-grow-0"
                  placeholder="Buscar por nombre, marca, modelo o código..."
                  aria-label="Buscar productos"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
              <div className="form-check form-switch mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="check-sin-stock"
                  checked={soloSinStock}
                  onChange={(e) => setSoloSinStock(e.target.checked)}
                />
                <label className="form-check-label small fw-semibold text-danger" htmlFor="check-sin-stock" style={{cursor: 'pointer'}}>
                  Solo productos sin stock
                </label>
              </div>
              <div className="d-flex flex-wrap gap-3 align-items-center">
                <span className="fw-semibold text-muted small">Filtrar por categoría:</span>
                {CATEGORIAS_DISPONIBLES.map(cat => (
                  <div className="form-check" key={cat}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`check-${cat}`}
                      checked={categoriasFiltro.includes(cat)}
                      onChange={() => handleCheckboxChange(cat)}
                    />
                    <label className="form-check-label small" htmlFor={`check-${cat}`} style={{cursor: 'pointer'}}>
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <TablaAdmin
              columnas={['Código', 'Nombre', 'Categoría', 'Marca/Modelo', 'Precio', 'Stock', 'Acciones']}
              mensajeVacio="No hay productos que coincidan con los filtros"
              hayDatos={productosFiltrados.length > 0}
            >
              {productosFiltrados.map(p => (
                <tr key={p.id}>
                  <td className="fw-bold">{p.codigo}</td>
                  <td>{p.nombreproducto ?? '—'}</td>
                  <td>{p.categoria}</td>
                  <td>{p.marca} <br/><small className="text-muted">{p.modelo}</small></td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`badge ${p.stock > 10 ? 'bg-success' : (p.stock > 0 ? 'bg-warning' : 'bg-danger')}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="text-center text-nowrap">
                    <BotonAccion icono="✏️" color="primary" title={`Editar ${p.codigo}`} onClick={() => editarProducto(p)} />
                    <BotonAccion icono="🗑️" color="danger" title={`Eliminar ${p.codigo}`} onClick={() => handleEliminar(p)} />
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

export default AdminMantenedor;
