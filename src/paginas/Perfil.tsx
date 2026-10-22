import { useNavigate } from "react-router-dom";
import SelectorFoto from "../componentes/moleculas/SelectorFoto";
import FormularioPerfil from "../componentes/organismos/FormularioPerfil";
import CambiarPassword from "../componentes/organismos/CambiarPassword";
import { useAuth } from "../data/AuthContext";

function Perfil() {
    const { user, actualizarPerfil, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <span className="text-gold fw-bold text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>
                    Tu cuenta
                </span>
                <h1 className="display-5 fw-bold">Mi perfil</h1>
            </div>

            <div className="row g-4">
                <div className="col-12 col-lg-4">
                    <div className="card p-4 text-center h-100">
                        <SelectorFoto
                            nombre={user.nombre}
                            foto={user.foto}
                            alCambiar={(foto) => actualizarPerfil({ foto })}
                        />
                        <h4 className="mt-4 mb-1">{user.nombre}</h4>
                        <p className="mb-2 text-secondary">{user.correo}</p>
                        <div>
                            <span className="badge bg-black border border-gold text-gold">{user.rol}</span>
                        </div>
                        <button
                            type="button"
                            className="btn btn-secondary mt-4"
                            onClick={() => { logout(); navigate("/login"); }}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <div className="card p-4 mb-4">
                        <h4 className="text-gold mb-3 text-start">Datos personales</h4>
                        <FormularioPerfil />
                    </div>
                    <div className="card p-4">
                        <h4 className="text-gold mb-3 text-start">Seguridad</h4>
                        <CambiarPassword />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
