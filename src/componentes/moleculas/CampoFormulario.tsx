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

    return(
        <div className="mb-3">

            <label className="form-label" htmlFor={id}>
                {etiqueta}
            </label>

            <Input
            id={id}
            tipo={tipo}
            nombre={nombre}
            valor={valor}
            alCambiar={alCambiar}
            error={error}
            deshabilitado={deshabilitado}
            />

            {error && <div className="invalid-feedback d-block" role="alert">{error}</div>}

        </div>
    );
}

export default CampoFormulario;
