import { useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../componentes/moleculas/CampoFormulario";
import { validarEmail } from "../data/validaciones";
import MapaTienda from "../componentes/moleculas/MapaTienda";
import { TIENDA } from "../data/tienda";
import { enviarMensaje } from "../api/contactos";
import { ErrorApi } from "../api/cliente";
import { useAuth } from "../context/AuthContext";

const Contacto = () => {
    const { user } = useAuth();
    // Con sesión, el nombre y el correo se completan con los de la cuenta.
    // El correo no se puede cambiar: así la respuesta aparece en "Mis mensajes" del perfil.
    const [form, setForm] = useState(() => ({ nombre: user?.nombre ?? "", correo: user?.correo ?? "", mensaje: "" }));
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [enviado, setEnviado] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [errorGeneral, setErrorGeneral] = useState<string | null>(null);

    const correo = user ? user.correo : form.correo;

    const cambiar = (campo: string, valor: string) => {
        setForm((f) => ({ ...f, [campo]: valor }));
        if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
        setEnviado(false);
        setErrorGeneral(null);
    };

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (enviando) return;
        const nuevos: Record<string, string> = {};
        if (!form.nombre.trim()) nuevos.nombre = "Ingresa tu nombre.";
        if (!correo.trim()) nuevos.correo = "Ingresa tu correo.";
        else if (!validarEmail(correo.trim())) nuevos.correo = "Ingresa un correo válido.";
        if (!form.mensaje.trim()) nuevos.mensaje = "Escribe tu mensaje.";
        else if (form.mensaje.trim().length < 10) nuevos.mensaje = "El mensaje debe tener al menos 10 caracteres.";
        else if (form.mensaje.trim().length > 500) nuevos.mensaje = "El mensaje no puede superar los 500 caracteres.";
        if (Object.keys(nuevos).length > 0) {
            setErrores(nuevos);
            return;
        }

        setEnviando(true);
        try {
            await enviarMensaje({ nombre: form.nombre.trim(), correo: correo.trim(), mensaje: form.mensaje.trim() });
            setForm((f) => ({ ...f, mensaje: "", ...(user ? {} : { nombre: "", correo: "" }) }));
            setEnviado(true);
        } catch (error) {
            if (error instanceof ErrorApi) {
                setErrores(error.errores);
                setErrorGeneral(error.message);
            } else {
                setErrorGeneral("No se pudo enviar el mensaje.");
            }
        } finally {
            setEnviando(false);
        }
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
                        <p className="mb-1 fw-bold">Dirección</p>
                        <p>{TIENDA.direccion}, {TIENDA.comuna}</p>
                        <p className="mb-1 fw-bold">Atención</p>
                        <p className="mb-0">{TIENDA.horario}</p>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card p-4 text-start">
                        <h4 className="text-gold mb-3">Envíanos un mensaje</h4>
                        {enviado && (
                            <div className="alert alert-success py-2">
                                ¡Mensaje enviado! Gracias por escribirnos.
                                {user && <> Podrás ver la respuesta en <Link to="/perfil">Mi perfil</Link>.</>}
                            </div>
                        )}
                        {errorGeneral && <div className="alert alert-danger py-2" role="alert">{errorGeneral}</div>}
                        <form onSubmit={enviar} noValidate aria-label="Formulario de contacto">
                            <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={form.nombre} alCambiar={(v) => cambiar("nombre", v)} error={errores.nombre} />
                            <CampoFormulario etiqueta="Correo electrónico" tipo="email" nombre="correo" valor={correo} alCambiar={(v) => cambiar("correo", v)} error={errores.correo} deshabilitado={!!user} />
                            <div className="mb-3">
                                <label className="form-label" htmlFor="contacto-mensaje">Mensaje</label>
                                <textarea
                                    id="contacto-mensaje"
                                    className={`form-control ${errores.mensaje ? "is-invalid" : ""}`}
                                    rows={5}
                                    value={form.mensaje}
                                    onChange={(e) => cambiar("mensaje", e.target.value)}
                                />
                                {errores.mensaje && <div className="invalid-feedback d-block" role="alert">{errores.mensaje}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={enviando}>
                                {enviando ? "Enviando..." : "Enviar mensaje"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-12 col-lg-10">
                    <div className="card p-4 text-start">
                        <h4 className="text-gold mb-3">Dónde estamos</h4>
                        <p>Visítanos en nuestra tienda física. También es nuestro punto de retiro de pedidos.</p>
                        <MapaTienda alto={320} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
