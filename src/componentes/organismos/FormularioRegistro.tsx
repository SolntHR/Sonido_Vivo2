import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { crearUsuario } from "../../data/db";
import { regionesData } from "../../data/regiones";
import { validarRut, normalizarRut, validarEmail, validarPassword } from "../../data/validaciones";

function FormularioRegistro() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
    rut: '', nombre: '', apellido: '', correo: '', password: '', confirmPassword: '', region: '', comuna: ''
    });

    const [errores, setErrores] = useState<Record<string, string>>({});

    const handleChange = (campo: string, valor: string) => {
        setForm(prev => ({ ...prev, [campo]: valor }));
        if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: '' }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevosErrores: Record<string, string> = {};

        if (!form.rut.trim()) {
            nuevosErrores.rut = "El RUN es obligatorio.";
        } else if (!validarRut(form.rut)) {
            nuevosErrores.rut = "El RUN ingresado no es válido (revise el dígito verificador).";
        }

        if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!form.apellido.trim()) nuevosErrores.apellido = "Los apellidos son obligatorios.";

        if (!form.correo.trim()) {
            nuevosErrores.correo = "El correo es obligatorio.";
        } else if (!validarEmail(form.correo.trim())) {
            nuevosErrores.correo = "Formato de correo inválido.";
        }
        if (!form.password) {
            nuevosErrores.password = "La contraseña es obligatoria.";
        } else {
            const errorPassword = validarPassword(form.password);
            if (errorPassword) nuevosErrores.password = errorPassword;
        }
        if (!form.confirmPassword) nuevosErrores.confirmPassword = "Debe confirmar la contraseña.";
        else if (form.password !== form.confirmPassword) nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
        if (!form.region) nuevosErrores.region = "Debe seleccionar una región.";
        if (!form.comuna) nuevosErrores.comuna = "Debe seleccionar una comuna.";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        try {
            crearUsuario({
                rut: normalizarRut(form.rut),
                nombre: `${form.nombre.trim()} ${form.apellido.trim()}`,
                correo: form.correo.trim().toLowerCase(),
                password: form.password,
                rol: 'Cliente',
                activo: true,
                region: form.region,
                comuna: form.comuna
            });
        } catch (error) {
            const texto = error instanceof Error ? error.message : "No se pudo completar el registro.";
            setErrores(texto.includes("correo") ? { correo: texto } : { rut: texto });
            return;
        }

        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigate('/login');
    };

    const comunasDisponibles = form.region
        ? regionesData.find(r => r.region === form.region)?.comunas || []
        : [];

    return (
        <form onSubmit={handleSubmit} noValidate aria-label="Formulario de registro">

        <CampoFormulario etiqueta="RUN (con o sin puntos y guion)" tipo="text" nombre="rut" valor={form.rut} alCambiar={(v) => handleChange('rut', v)} error={errores.rut} />

        <div className="row">
            <div className="col-md-6">
            <CampoFormulario etiqueta="Nombre" tipo="text" nombre="nombre" valor={form.nombre} alCambiar={(v) => handleChange('nombre', v)} error={errores.nombre} />
            </div>
            <div className="col-md-6">
            <CampoFormulario etiqueta="Apellidos" tipo="text" nombre="apellido" valor={form.apellido} alCambiar={(v) => handleChange('apellido', v)} error={errores.apellido} />
            </div>
        </div>

        <CampoFormulario etiqueta="Correo Electrónico" tipo="email" nombre="correo" valor={form.correo} alCambiar={(v) => handleChange('correo', v)} error={errores.correo} />

        <div className="row">
            <div className="col-md-6">
            <CampoFormulario etiqueta="Contraseña" tipo="password" nombre="password" valor={form.password} alCambiar={(v) => handleChange('password', v)} error={errores.password} />
            </div>
            <div className="col-md-6">
            <CampoFormulario etiqueta="Confirmar Contraseña" tipo="password" nombre="confirmPassword" valor={form.confirmPassword} alCambiar={(v) => handleChange('confirmPassword', v)} error={errores.confirmPassword} />
            </div>
        </div>

        <div className="row mb-4">
        <div className="col-md-6">
            <label className="form-label" htmlFor="registro-region">Región</label>
            <select
                id="registro-region"
                className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                value={form.region}
                onChange={(e) => {
                const regionSeleccionada = e.target.value;
                setForm(prevForm => ({
                    ...prevForm,
                    region: regionSeleccionada,
                    comuna: ''
                }));
                if (errores.region || errores.comuna) {
                    setErrores(prev => ({ ...prev, region: '', comuna: '' }));
                }
                }}
            >
                <option value="">Seleccione una región...</option>
                {regionesData.map(r => (
                <option key={r.region} value={r.region}>{r.region}</option>
                ))}
            </select>
            {errores.region && <div className="invalid-feedback d-block">{errores.region}</div>}
            </div>

            <div className="col-md-6">
            <label className="form-label" htmlFor="registro-comuna">Comuna</label>
            <select
                id="registro-comuna"
                className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                value={form.comuna}
                onChange={(e) => handleChange('comuna', e.target.value)}
                disabled={!form.region}
            >
                <option value="">Seleccione una comuna...</option>
                {comunasDisponibles.map(c => (
                <option key={c} value={c}>{c}</option>
                ))}
            </select>
            {errores.comuna && <div className="invalid-feedback d-block">{errores.comuna}</div>}
            </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
            Crear Cuenta
        </button>

        </form>
    );
}

export default FormularioRegistro;