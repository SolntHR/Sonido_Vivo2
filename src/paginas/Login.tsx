import FormularioLogin from "../componentes/organismos/FormularioLogin";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container my-auto py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4 text-uppercase">Iniciar Sesión</h2>
            <FormularioLogin />
            
            <div className="text-center mt-3">
              <small className="text-secondary">
                ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;