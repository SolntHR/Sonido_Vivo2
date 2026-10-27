import { useState } from "react";
import Input from "../atomos/Input";

type Props = {
    etiqueta : string;
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
    error?: string;
    deshabilitado?: boolean;
};

function CampoFormulario({etiqueta, tipo, nombre, valor, alCambiar, error, deshabilitado}: Props){
    const id = `campo-${nombre}`;
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const esPassword = tipo === "password";
    const descripcionPassword = etiqueta.toLowerCase().startsWith("confirmar")
        ? "confirmación de contraseña"
        : etiqueta.toLowerCase();
    const tipoInput = esPassword && mostrarPassword ? "text" : tipo;
    const input = (
        <Input
            id={id}
            tipo={tipoInput}
            nombre={nombre}
            valor={valor}
            alCambiar={alCambiar}
            error={error}
            deshabilitado={deshabilitado}
        />
    );

    return(
        <div className="mb-3">

            <label className="form-label" htmlFor={id}>
                {etiqueta}
            </label>

            {esPassword ? (
                <div className="input-group">
                    {input}
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        aria-label={`${mostrarPassword ? "Ocultar" : "Mostrar"} ${descripcionPassword}`}
                        aria-pressed={mostrarPassword}
                        onClick={() => setMostrarPassword(prev => !prev)}
                    >
                        {mostrarPassword ? "Ocultar" : "Mostrar"}
                    </button>
                </div>
            ) : input}

            {error && <div className="invalid-feedback d-block" role="alert">{error}</div>}

        </div>
    );
}

export default CampoFormulario;
