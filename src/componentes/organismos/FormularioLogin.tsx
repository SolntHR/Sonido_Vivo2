import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { useAuth } from '../../context/AuthContext';
import { validarEmail } from '../../data/validaciones';


function FormularioLogin() {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errores, setErrores] = useState<{ correo?: string; contrasena?: string; general?: string }>({});

    const { login } = useAuth();
    const navigate = useNavigate();


    const manejarLogin = (e: React.SubmitEvent<HTMLFormElement>) =>{

        e.preventDefault();

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

        const usuario = login(correo, contrasena);

        if (usuario) {
            setErrores({});
            navigate(usuario.rol === "Administrador" ? "/admin" : "/perfil");
        } else {
            setErrores({ general: "Credenciales incorrectas. Verifique su correo y contraseña." });
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

            <button type="submit" className="btn btn-primary">
                Iniciar sesión
            </button>

        </form>

    );

};

export default FormularioLogin;