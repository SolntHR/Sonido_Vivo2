import { useRef, useState } from "react";
import Avatar from "../atomos/Avatar";
import { procesarFoto } from "../../data/imagen";

interface SelectorFotoProps {
    nombre: string;
    foto?: string;
    alCambiar: (foto: string | undefined) => void;
}

function SelectorFoto({ nombre, foto, alCambiar }: SelectorFotoProps) {
    const input = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const alElegir = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const archivo = e.target.files?.[0];
        e.target.value = "";
        if (!archivo) return;
        try {
            alCambiar(await procesarFoto(archivo));
            setError("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "No se pudo cargar la imagen.");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center gap-3">
            <Avatar nombre={nombre} foto={foto} tamano={140} />

            <input ref={input} type="file" accept="image/*" className="d-none" onChange={alElegir} />

            <div className="d-flex gap-2">
                <button type="button" className="btn btn-outline-gold btn-sm" onClick={() => input.current?.click()}>
                    {foto ? "Cambiar foto" : "Subir foto"}
                </button>
                {foto && (
                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => alCambiar(undefined)}>
                        Quitar
                    </button>
                )}
            </div>

            {error && <div className="text-danger small text-center">{error}</div>}
        </div>
    );
}

export default SelectorFoto;
