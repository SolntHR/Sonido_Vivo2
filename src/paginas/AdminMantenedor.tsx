import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductos, crearProducto, actualizarProducto, eliminarProducto } from '../data/db';
import type { Producto } from '../data/db';
import { categorias } from '../data/categorias';
import { filtrarProductos } from '../data/filtros';
import { validarProducto } from '../data/validaciones';
import FormularioProducto, { type ProductoFormData } from '../componentes/organismos/FormularioProducto';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

const CATEGORIAS_DISPONIBLES = categorias.map(c => c.nombre);

const FORM_VACIO: ProductoFormData = {
  codigo: '', nombreproducto: '', categoria: '', marca: '', modelo: '', precio: '', stock: '', descripcion: '', imagen: ''
};

const AdminMantenedor = () => {
  const [productos, setProductos] = useState<Producto[]>(() => getProductos());
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null);
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [form, setForm] = useState<ProductoFormData>(FORM_VACIO);
  const [errores, setErrores] = useState<Record<string, string>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nuevosErrores = validarProducto(form);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    if (Number(form.precio) < 1000) {
      const confirmar = window.confirm(
        `⚠️ Alerta: El precio ingresado es de $${form.precio}.\n¿Estás seguro de que este precio es correcto?`
      );
      if (!confirmar) return;
    }

    const productoData: Producto = {
      codigo: form.codigo.trim().toUpperCase(),
      nombreproducto: form.nombreproducto.trim(),
      categoria: form.categoria,
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim(),
      imagen: form.imagen.trim() || undefined,
    };

    try {
      if (codigoEditando) {
        setProductos(actualizarProducto(codigoEditando, productoData));
        setMensaje(`Producto ${productoData.codigo} actualizado correctamente.`);
      } else {
        setProductos(crearProducto(productoData));
        setMensaje(`Producto ${productoData.codigo} creado correctamente.`);
      }
      limpiarFormulario();
    } catch (error) {
      setErrores({ codigo: error instanceof Error ? error.message : 'No se pudo guardar el producto.' });
    }
  };

  const handleEliminar = (codigo: string) => {
    if (!window.confirm(`¿Seguro que deseas eliminar el producto ${codigo}?`)) return;
    try {
      setProductos(eliminarProducto(codigo));
      if (codigoEditando === codigo) limpiarFormulario();
      setMensaje(`Producto ${codigo} eliminado.`);
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
      descripcion: p.descripcion,
      imagen: p.imagen ?? '',
    });
    setCodigoEditando(p.codigo);
    setErrores({});
    setMensaje('');
  };

  const limpiarFormulario = () => {
    setForm(FORM_VACIO);
    setCodigoEditando(null);
    setErrores({});
  };

  const productosFiltrados = filtrarProductos(productos, { categorias: categoriasFiltro, texto: busqueda });

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
                <h5 className="mb-0 fw-bold">Inventario Actual ({productosFiltrados.length})</h5>
                <input
                  type="search"
                  className="form-control w-auto flex-md-grow-0"
                  placeholder="Buscar por nombre, marca, modelo o código..."
                  aria-label="Buscar productos"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
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
                <tr key={p.codigo}>
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
                    <BotonAccion icono="🗑️" color="danger" title={`Eliminar ${p.codigo}`} onClick={() => handleEliminar(p.codigo)} />
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
