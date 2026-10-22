import Input from "../atomos/Input";

type Props = {
    etiqueta : string;
    tipo: string;
    nombre: string;
    valor: string; // valor actual del campo
    alCambiar: (valor: string) => void; // funcion para actualizar el valor
    error?: string;
};

function CampoFormulario({etiqueta, tipo, nombre, valor, alCambiar, error}: Props){
    return(
        <div className="mb-3">

            <label className="form-label">
                {etiqueta}
            </label>
        
            <Input
            tipo={tipo}
            nombre={nombre}
            valor={valor}
            alCambiar={alCambiar}
            error={error}
            />

            {/* Muestra el mensaje de error de Bootstrap solo si existe */}
            {error && <div className="invalid-feedback d-block">{error}</div>}

        </div>
    );
}

export default CampoFormulario;