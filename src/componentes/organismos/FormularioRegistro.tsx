import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampoFormulario from "../moleculas/CampoFormulario";
import { getUsuarios, guardarUsuarios } from "../../data/db";

// 1. Validador de RUT
const validarRut = (rutCompleto: string): boolean => {
    const rutLimpio = rutCompleto.replace(/[.-]/g, '');
    if (rutLimpio.length < 8) return false;
    if (!/^[0-9]+[0-9kK]{1}$/.test(rutLimpio)) return false;

    const cuerpo = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1).toUpperCase();

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = suma % 11;
    const dvCalculado = 11 - resto;

    let dvEsperado = dvCalculado.toString();
    if (dvCalculado === 11) dvEsperado = '0';
    if (dvCalculado === 10) dvEsperado = 'K';

    return dvEsperado === dvIngresado;
};

// Datos regiones
const regionesData = [
    { region: "Región Metropolitana", comunas: ["Santiago", "Maipú", "Providencia", "Ñuñoa", "Puente Alto"] },
    { region: "Región de Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"] },
    { region: "Región del Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles"] }
];

function FormularioRegistro() {
    const navigate = useNavigate();

  // 2. Estado para guardar todos los datos
    const [form, setForm] = useState({
    rut: '', nombre: '', apellido: '', correo: '', password: '', confirmPassword: '', region: '', comuna: ''
    });

  // 3. Estado para los errores
    const [errores, setErrores] = useState<Record<string, string>>({});

    const handleChange = (campo: string, valor: string) => {
        setForm({ ...form, [campo]: valor });
        if (errores[campo]) setErrores({ ...errores, [campo]: '' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevosErrores: Record<string, string> = {};

        // validaciones
        if (!form.rut.trim()) {
        nuevosErrores.rut = "El RUN es obligatorio.";
        } else if (!validarRut(form.rut)) {
        nuevosErrores.rut = "El RUN ingresado no es válido (revise el dígito verificador).";
        }

        if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!form.apellido.trim()) nuevosErrores.apellido = "Los apellidos son obligatorios.";
        if (!form.correo.includes('@')) nuevosErrores.correo = "Formato de correo inválido.";
        if (form.password.length < 8) nuevosErrores.password = "La contraseña debe tener al menos 8 caracteres.";
        if (form.password !== form.confirmPassword) nuevosErrores.confirmPassword = "Las contraseñas no coinciden.";
        if (!form.region) nuevosErrores.region = "Debe seleccionar una región.";
        if (!form.comuna) nuevosErrores.comuna = "Debe seleccionar una comuna.";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

    // Guardar usuario
    const usuarios = getUsuarios();
    if (usuarios.some(u => u.correo === form.correo)) {
        setErrores({ correo: "Este correo ya está registrado." });
        return;
    }

    const nuevoUsuario = {
        rut: form.rut,
        nombre: `${form.nombre} ${form.apellido}`,
        correo: form.correo,
        password: form.password,
        rol: 'Cliente' as const,
        activo: true
    };

    guardarUsuarios([...usuarios, nuevoUsuario]);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    navigate('/login');
    };

    const comunasDisponibles = form.region 
        ? regionesData.find(r => r.region === form.region)?.comunas || []
        : [];

    return (
        <form onSubmit={handleSubmit} noValidate>
        
        <CampoFormulario etiqueta="RUN (Sin puntos ni guion)" tipo="text" nombre="rut" valor={form.rut} alCambiar={(v) => handleChange('rut', v)} error={errores.rut} />

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
            <label className="form-label">Región</label>
            <select
                className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                value={form.region}
                onChange={(e) => {
                const regionSeleccionada = e.target.value;
                // Actualizamos región y reseteamos comuna en una sola instrucción
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
            <label className="form-label">Comuna</label>
            <select
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