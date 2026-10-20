import { Routes, Route } from 'react-router-dom'
import Navbar from './componentes/organismos/Navbar'
import './App.css'
import Inicio from './paginas/InicioPublico'
//import BotonProducto from './componentes/atomos/BotonProducto'
import Productos from './paginas/Productos'
import DetalleProducto from './paginas/DetalleProducto'
//import Contacto from './paginas/Contacto'
//import Quienes from './paginas/Quienes'

function App() {
    return(
      <>
        <Navbar/>
        <Routes>
          <Route
            path="/"
            element={<Inicio/>}
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
            path='/producto/:codigo'
            element={<DetalleProducto/>}
          />

        </Routes>
      </>
  )

}

export default App
