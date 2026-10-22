import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductos, guardarProductos } from '../data/db';
import type { Producto } from '../data/db';
import FormularioProducto, { type ProductoFormData } from '../componentes/organismos/FormularioProducto';
import TablaAdmin from '../componentes/organismos/TablaAdmin';
import BotonAccion from '../componentes/atomos/BotonAccion';

const CATEGORIAS_DISPONIBLES = [
  "Guitarras Acusticas", "Guitarras Eléctricas", "Baterías", 
  "Teclados y Pianos", "Amplificadores", "Accesorios"
];

const AdminMantenedor = () => {
  const [productos, setProductos] = useState<Producto[]>(() => getProductos());
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null);
  const [categoriasFiltro, setCategoriasFiltro] = useState<string[]>([]);
  
  // Formulario tipado estrictamente
  const [form, setForm] = useState<ProductoFormData>({
    codigo: '', categoria: '', marca: '', modelo: '', precio: '', stock: '', descripcion: ''
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const handleChange = (campo: string, valor: string) => {
    setForm({ ...form, [campo]: valor } as ProductoFormData);
    if (errores[campo]) setErrores({ ...errores, [campo]: '' });
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
    
    const nuevosErrores: Record<string, string> = {};
    if (!form.codigo) nuevosErrores.codigo = "El código es obligatorio";
    if (!form.marca) nuevosErrores.marca = "La marca es obligatoria";
    if (!form.modelo) nuevosErrores.modelo = "El modelo es obligatorio";
    // 1. Validar que precio y stock sean mínimo 1
    if (!form.precio || Number(form.precio) <= 0) {
      nuevosErrores.precio = "El precio mínimo debe ser 1";
    }
    if (!form.stock || Number(form.stock) <= 0) {
      nuevosErrores.stock = "El stock mínimo debe ser 1";
    }
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    // 2. Alerta de precio muy bajo (Largo 3 o menor, ej: 999, 50, 1)
    if (form.precio.length <= 3) {
      const confirmar = window.confirm(
        `⚠️ Alerta: El precio ingresado es de $${form.precio}.\n¿Estás seguro de que este precio es correcto?`
      );
      
      if (!confirmar) {
        // Si el usuario dice "Cancelar", detenemos la ejecución
        return;
      }
    }

    let nuevaLista: Producto[];
    const productoData = {
      ...form,
      precio: Number(form.precio),
      stock: Number(form.stock)
    };

    if (codigoEditando) {
      // UPDATE
      nuevaLista = productos.map(p => p.codigo === codigoEditando ? { ...p, ...productoData } as Producto : p);
    } else {
      // CREATE
      if (productos.some(p => p.codigo === form.codigo)) {
        setErrores({ codigo: "Este código ya existe" });
        return;
      }
      nuevaLista = [...productos, productoData as Producto];
    }

    setProductos(nuevaLista);
    guardarProductos(nuevaLista);
    limpiarFormulario();
  };

  const eliminarProducto = (codigo: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar el producto ${codigo}?`)) {
      const nuevaLista = productos.filter(p => p.codigo !== codigo);
      setProductos(nuevaLista);
      guardarProductos(nuevaLista);
    }
  };

  const editarProducto = (p: Producto) => {
    setForm({
      codigo: p.codigo, 
      categoria: p.categoria, 
      marca: p.marca, 
      modelo: p.modelo,
      precio: p.precio.toString(), 
      stock: p.stock.toString(), 
      descripcion: p.descripcion
    });
    setCodigoEditando(p.codigo);
    setErrores({});
  };

  const limpiarFormulario = () => {
    setForm({ codigo: '', categoria: '', marca: '', modelo: '', precio: '', stock: '', descripcion: '' });
    setCodigoEditando(null);
    setErrores({});
  };

  const productosFiltrados = productos.filter(p => {
    if (categoriasFiltro.length === 0) return true;
    return categoriasFiltro.includes(p.categoria);
  });

  return (
    <div className="container-fluid my-5">
      <div className="mb-4">
        <Link to="/admin" className="text-decoration-none">← Volver al Panel</Link>
        <h2 className="mt-2 fw-bold">Mantenedor de Productos</h2>
      </div>

      <div className="row">
        {/* ORGANISMO: Formulario de Producto */}
        <div className="col-lg-4 mb-4">
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

        {/* ORGANISMO: Tabla de Productos */}
        <div className="col-lg-8">
          <div className="card shadow-sm">
            
            <div className="card-header bg-white py-3">
              <h5 className="mb-3 fw-bold">Inventario Actual</h5>
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
              columnas={['Código', 'Categoría', 'Marca/Modelo', 'Precio', 'Stock', 'Acciones']} 
              mensajeVacio="No hay productos en estas categorías"
              hayDatos={productosFiltrados.length > 0}
            >
              {productosFiltrados.map(p => (
                <tr key={p.codigo}>
                  <td className="fw-bold">{p.codigo}</td>
                  <td>{p.categoria}</td>
                  <td>{p.marca} <br/><small className="text-muted">{p.modelo}</small></td>
                  <td>${p.precio.toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`badge ${p.stock > 10 ? 'bg-success' : (p.stock > 0 ? 'bg-warning' : 'bg-danger')}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="text-center">
                    <BotonAccion icono="✏️" color="primary" title="Editar" onClick={() => editarProducto(p)} />
                    <BotonAccion icono="🗑️" color="danger" title="Eliminar" onClick={() => eliminarProducto(p.codigo)} />
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