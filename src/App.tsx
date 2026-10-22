import { Routes, Route } from 'react-router-dom'
import './App.css'
// plantillas
import LayoutPublico from './componentes/organismos/LayoutPublico';
import LayoutAdmin from './componentes/organismos/LayoutAdmin';
import { RutaProtegida } from './rutas/RutaProtegida';
// vista publica
import InicioPublico from './paginas/InicioPublico'
import Productos from './paginas/Productos'
import DetalleProducto from './paginas/DetalleProducto'
import Contacto from './paginas/Contacto'
import Quienes from './paginas/Quienes'
import Login from './paginas/Login'
import Registro from './paginas/Registro';
import Novedades from './paginas/Novedades'
// admin
import InicioAdmin from './paginas/InicioAdmin'
import AdminUsuarios from './paginas/AdminUsuarios'
import AdminMantenedor from './paginas/AdminMantenedor'


function App() {
    return(

        <Routes>

          <Route element={<LayoutPublico/>}>
            
            <Route
              path="/"
              element={<InicioPublico/>}
            />
            <Route
              path="/iniciopublico"
              element={<InicioPublico/>}
            />

            <Route
              path="/productos"
              element={<Productos/>}
            />
            {/* Ruta dinamica para mostrar el detalle seun el id del producto*/}
            <Route
              path='/producto/:codigo'
              element={<DetalleProducto/>}
            />

            <Route
              path="/contacto"
              element={<Contacto/>}
            />
            
            <Route
              path="/quienes"
              element={<Quienes/>}
            />

            <Route
              path="/login"
              element={<Login/>}
            />

            <Route
              path="/registro"
              element={<Registro/>}
            />

            <Route
              path="/novedades"
              element={<Novedades/>}
            />
          </Route>

          <Route element={<RutaProtegida />}>
        
            <Route element={<LayoutAdmin />}>
              <Route path="/admin" element={<InicioAdmin />} />
              <Route path="/admin/usuarios" element={<AdminUsuarios />} />
              <Route path="/admin/mantenedor" element={<AdminMantenedor />} />
            </Route>

          </Route>
    </Routes>
  );
}

export default App;
