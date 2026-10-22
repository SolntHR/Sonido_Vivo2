import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { useAuth } from "../../data/AuthContext";
import { regionesData } from "../../data/regiones";

function FormularioPerfil() {
    const { user, actualizarPerfil } = useAuth();
    const [form, setForm] = useState({
        nombre: user?.nombre ?? "",
        telefono: user?.telefono ?? "",
        region: user?.region ?? "",
        comuna: user?.comuna ?? "",
    });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [guardado, setGuardado] = useState(false);

    if (!user) return null;

    const cambiar = (campo: string, valor: string) => {
        setForm((f) => ({ ...f, [campo]: valor }));
        if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
        setGuardado(false);
    };

    const comunas = regionesData.find((r) => r.region === form.region)?.comunas ?? [];

    const guardar = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevos: Record<string, string> = {};
        if (!form.nombre.trim()) nuevos.nombre = "El nombre es obligatorio.";
        if (form.telefono.trim() && !/^\+?[0-9\s]{8,15}$/.test(form.telefono.trim())) {
            nuevos.telefono = "Ingresa un teléfono válido (8 a 15 dígitos).";
        }
        if (form.region && !form.comuna) nuevos.comuna = "Selecciona una comuna.";
        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }
        actualizarPerfil({
            nombre: form.nombre.trim(),
            telefono: form.telefono.trim(),
            region: form.region,
            comuna: form.comuna,
        });
        setGuardado(true);
    };

    return (
        <form onSubmit={guardar} noValidate className="text-start">
            {guardado && <div className="alert alert-success py-2">Datos guardados correctamente.</div>}

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">RUN</label>
                    <input className="form-control" value={user.rut} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input className="form-control" value={user.correo} readOnly />
                </div>
            </div>

            <CampoFormulario etiqueta="Nombre completo" tipo="text" nombre="nombre" valor={form.nombre} alCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} />
            <CampoFormulario etiqueta="Teléfono (opcional)" tipo="tel" nombre="telefono" valor={form.telefono} alCambiar={(v) => cambiar("telefono", v)} error={errores.telefono} />

            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Región</label>
                    <select
                        className="form-select"
                        value={form.region}
                        onChange={(e) => {
                            setForm((f) => ({ ...f, region: e.target.value, comuna: "" }));
                            setGuardado(false);
                        }}
                    >
                        <option value="">Seleccione una región...</option>
                        {regionesData.map((r) => (
                            <option key={r.region} value={r.region}>{r.region}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Comuna</label>
                    <select
                        className={`form-select ${errores.comuna ? "is-invalid" : ""}`}
                        value={form.comuna}
                        onChange={(e) => cambiar("comuna", e.target.value)}
                        disabled={!form.region}
                    >
                        <option value="">Seleccione una comuna...</option>
                        {comunas.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    {errores.comuna && <div className="invalid-feedback d-block">{errores.comuna}</div>}
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Guardar cambios</button>
        </form>
    );
}

export default FormularioPerfil;
