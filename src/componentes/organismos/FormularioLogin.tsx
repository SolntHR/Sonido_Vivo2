import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { useAuth } from '../../data/AuthContext';


function FormularioLogin() {

    // Estados para guardar los datos del formulario
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errores, setErrores] = useState<{ correo?: string; contrasena?: string; general?: string }>({});
    
    const { login } = useAuth();
    const navigate = useNavigate();


    // Valida los datos al enviar el formulario
    const manejarLogin = (e: React.SubmitEvent<HTMLFormElement>) =>{
        
        e.preventDefault();// Evita recargar la pagina

        const nuevosErrores: typeof errores = {};
        let esValido = true;

    
        //validacion correo
        if (correo.trim() === ""){
            nuevosErrores.correo = "Debe ingresar su correo";
            esValido = false;
        }
        // Comprueba que el corre otenga un formato válido
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)){
            nuevosErrores.correo = "Ingrese un correo válido";
            esValido = false;
        }
        // validacion contrasena
        if (contrasena.trim() === ""){
            nuevosErrores.contrasena = "Debe ingresar su contraseña";
            esValido = false;
        }
        // comprueba el largo de la contrasena
        if (contrasena.length < 4){
            nuevosErrores.contrasena = "La contraseña debe tener un mínimo de 4 caracteres";
            esValido = false;
        }
        if (!esValido) {
            setErrores(nuevosErrores);
            return;
        }

        // Si pasa las validaciones, intentamos loguear con el Contexto
        const exito = login(correo, contrasena);
        
        if (exito) {
            setErrores({});
            navigate("/admin"); // Redirige a la vista de admin
        } else {
            setErrores({ general: "Credenciales incorrectas. Verifique su correo y contraseña." });
        }
    };
    


    return(
        <form onSubmit={manejarLogin} noValidate>
            {errores.general && (<div className="alert alert-danger py-2">{errores.general}</div>)}

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
                Iniciar sesion
            </button>

        </form>

    );

};

export default FormularioLogin;