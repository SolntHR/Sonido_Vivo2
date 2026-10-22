type Props = {
    tipo: string;
    nombre: string;
    valor: string; // valor actual del campo
    alCambiar: (valor: string) => void; // funcion para actualizar el valor
    error?: string;
};

function Input({tipo,nombre, valor, alCambiar, error}: Props){
    return(
        <input
        type={tipo}
        name={nombre}
        className={`form-control ${error ? 'is-invalid' : ''}`}

        // muestra el valor guardado
        value={valor}

        // detecta cuando el usuario escribe
        onChange={(e) => alCambiar(e.target.value)}
        />
    );
}

export default Input;