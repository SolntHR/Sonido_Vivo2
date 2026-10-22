import { useState } from "react";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";

const Contacto = () => {
    const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [enviado, setEnviado] = useState(false);

    const cambiar = (campo: string, valor: string) => {
        setForm({ ...form, [campo]: valor });
        if (errores[campo]) setErrores({ ...errores, [campo]: "" });
        setEnviado(false);
    };

    const enviar = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevos: Record<string, string> = {};
        if (!form.nombre.trim()) nuevos.nombre = "Ingresa tu nombre.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) nuevos.correo = "Ingresa un correo válido.";
        if (form.mensaje.trim().length < 10) nuevos.mensaje = "El mensaje debe tener al menos 10 caracteres.";
        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }
        // Sin backend: guardamos el mensaje en localStorage para poder revisarlo después.
        const guardados = JSON.parse(localStorage.getItem("mensajesContacto") ?? "[]");
        localStorage.setItem("mensajesContacto", JSON.stringify([...guardados, { ...form, fecha: new Date().toISOString() }]));
        setForm({ nombre: "", correo: "", mensaje: "" });
        setEnviado(true);
    };

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <span className="text-gold fw-bold text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>
                    Hablemos
                </span>
                <h1 className="display-5 fw-bold">Contacto</h1>
                <p className="mx-auto" style={{ maxWidth: "620px" }}>
                    ¿Dudas sobre un producto, stock o despachos? Escríbenos y te respondemos a la brevedad.
                </p>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-12 col-lg-4">
                    <div className="card h-100 p-4 text-start">
                        <h4 className="text-gold mb-3">Información</h4>
                        <p className="mb-1 fw-bold">Correo</p>
                        <p>contacto@sonidovivo.cl</p>
                        <p className="mb-1 fw-bold">Atención</p>
                        <p className="mb-0">Lunes a viernes, 10:00 a 19:00 hrs</p>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card p-4 text-start">
                        <h4 className="text-gold mb-3">Envíanos un mensaje</h4>
                        {enviado && <div className="alert alert-success py-2">¡Mensaje enviado! Gracias por escribirnos.</div>}
                        <form onSubmit={enviar} noValidate>
                            <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={form.nombre} alCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} />
                            <CampoFormulario etiqueta="Correo electrónico" tipo="email" nombre="correo" valor={form.correo} alCambiar={(v) => cambiar("correo", v)} error={errores.correo} />
                            <div className="mb-3">
                                <label className="form-label">Mensaje</label>
                                <textarea
                                    className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                                    rows={5}
                                    value={form.mensaje}
                                    onChange={(e) => cambiar("mensaje", e.target.value)}
                                />
                                {errores.mensaje && <div className="invalid-feedback d-block">{errores.mensaje}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Enviar mensaje</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
