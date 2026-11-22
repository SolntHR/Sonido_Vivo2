import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { useAuth } from '../../context/AuthContext';
import { validarEmail } from '../../data/validaciones';
import { ErrorApi } from '../../api/cliente';

function FormularioLogin() {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errores, setErrores] = useState<{ correo?: string; contrasena?: string; general?: string }>({});

    const [enviando, setEnviando] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();


    const manejarLogin = async (e: React.SubmitEvent<HTMLFormElement>) =>{

        e.preventDefault();

        if (enviando) return;

        const nuevosErrores: typeof errores = {};
        let esValido = true;


        if (correo.trim() === ""){
            nuevosErrores.correo = "Debe ingresar su correo";
            esValido = false;
        } else if (!validarEmail(correo.trim())){
            nuevosErrores.correo = "Ingrese un correo válido";
            esValido = false;
        }
        if (contrasena.trim() === ""){
            nuevosErrores.contrasena = "Debe ingresar su contraseña";
            esValido = false;
        } else if (contrasena.length < 4){
            nuevosErrores.contrasena = "La contraseña debe tener un mínimo de 4 caracteres";
            esValido = false;
        }
        if (!esValido) {
            setErrores(nuevosErrores);
            return;
        }

        setEnviando(true);
        try {
            // Envía el correo y la contraseña al backend (POST /auth/login)
            const usuario = await login(correo, contrasena);
            setErrores({});
            navigate(usuario.rol === "Administrador" ? "/admin" : "/perfil");
        } catch (error) {
            // Muestra el mensaje del backend, por ejemplo "Correo o contraseña incorrectos"
            const mensaje = error instanceof ErrorApi ? error.message : "No se pudo iniciar sesión. Intente nuevamente.";
            setErrores({ general: mensaje });
        } finally {
            setEnviando(false);
        }
    };

    return(
        <form onSubmit={manejarLogin} noValidate aria-label="Formulario de inicio de sesión">
            {errores.general && (<div className="alert alert-danger py-2" role="alert">{errores.general}</div>)}

            <CampoFormulario
                etiqueta="Correo electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
                error={errores.correo}
            />
            <CampoFormulario
                etiqueta="Contraseña"
                tipo="password"
                nombre="contrasena"
                valor={contrasena}
                alCambiar={setContrasena}
                error={errores.contrasena}
            />

            <button type="submit" className="btn btn-primary" disabled={enviando}>
                {enviando ? "Ingresando..." : "Iniciar sesión"}
            </button>

        </form>

    );

};

export default FormularioLogin;