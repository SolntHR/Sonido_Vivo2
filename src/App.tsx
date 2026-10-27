import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LayoutPublico from './componentes/organismos/LayoutPublico';
import LayoutAdmin from './componentes/organismos/LayoutAdmin';
import { RutaProtegida } from './rutas/RutaProtegida';
import InicioPublico from './paginas/InicioPublico'
import Productos from './paginas/Productos'
import DetalleProducto from './paginas/DetalleProducto'
import Contacto from './paginas/Contacto'
import Quienes from './paginas/Quienes'
import Login from './paginas/Login'
import Registro from './paginas/Registro';
import Noticias from './paginas/Noticias'
import Perfil from './paginas/Perfil'
import CarritoFinal from './paginas/CarritoFinal'
import InicioAdmin from './paginas/InicioAdmin'
import AdminUsuarios from './paginas/AdminUsuarios'
import AdminMantenedor from './paginas/AdminMantenedor'
import NoticiaDetalle from './paginas/DetalleNoticias';


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
            <Route
              path="/carrito"
              element={<CarritoFinal/>}
            />
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
              path="/noticias"
              element={<Noticias/>}
            />

            <Route
              path="/noticias/:id"
              element={<NoticiaDetalle/>}
            />
            <Route
              path="/novedades"
              element={<Navigate to="/noticias" replace />}
            />

            <Route element={<RutaProtegida />}>
              <Route path="/perfil" element={<Perfil />} />
            </Route>
          </Route>

          <Route element={<RutaProtegida rol="Administrador" />}>

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
