type Props = {
    tipo: string;
    nombre: string;
    valor: string;
    alCambiar: (valor: string) => void;
    error?: string;
    id?: string;
    deshabilitado?: boolean;
};

function Input({tipo, nombre, valor, alCambiar, error, id, deshabilitado = false}: Props){
    return(
        <input
        id={id}
        type={tipo}
        name={nombre}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        aria-invalid={error ? true : undefined}
        disabled={deshabilitado}

        value={valor}

        onChange={(e) => alCambiar(e.target.value)}
        />
    );
}

export default Input;
