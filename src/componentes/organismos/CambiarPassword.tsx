import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { useAuth } from "../../data/AuthContext";

function CambiarPassword() {
    const { cambiarPassword } = useAuth();
    const [form, setForm] = useState({ actual: "", nueva: "", confirmar: "" });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [exito, setExito] = useState(false);

    const cambiar = (campo: string, valor: string) => {
        setForm((f) => ({ ...f, [campo]: valor }));
        if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
        setExito(false);
    };

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevos: Record<string, string> = {};
        if (!form.actual) nuevos.actual = "Ingresa tu contraseña actual.";
        if (form.nueva.length < 8) nuevos.nueva = "La nueva contraseña debe tener al menos 8 caracteres.";
        if (form.nueva !== form.confirmar) nuevos.confirmar = "Las contraseñas no coinciden.";
        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }
        const error = cambiarPassword(form.actual, form.nueva);
        if (error) {
            setErrores({ actual: error });
            return;
        }
        setForm({ actual: "", nueva: "", confirmar: "" });
        setExito(true);
    };

    return (
        <form onSubmit={enviar} noValidate className="text-start">
            {exito && <div className="alert alert-success py-2">Contraseña actualizada.</div>}
            <CampoFormulario etiqueta="Contraseña actual" tipo="password" nombre="actual" valor={form.actual} alCambiar={(v) => cambiar("actual", v)} error={errores.actual} />
            <CampoFormulario etiqueta="Nueva contraseña" tipo="password" nombre="nueva" valor={form.nueva} alCambiar={(v) => cambiar("nueva", v)} error={errores.nueva} />
            <CampoFormulario etiqueta="Confirmar nueva contraseña" tipo="password" nombre="confirmar" valor={form.confirmar} alCambiar={(v) => cambiar("confirmar", v)} error={errores.confirmar} />
            <button type="submit" className="btn btn-primary">Cambiar contraseña</button>
        </form>
    );
}

export default CambiarPassword;
