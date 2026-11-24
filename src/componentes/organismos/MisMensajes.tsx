import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerMisMensajes } from '../../api/contactos';
import type { MensajeContacto } from '../../api/tipos';

const formatearFecha = (iso?: string) =>
    iso ? new Date(iso).toLocaleString('es-CL', { dateStyle: 'medium', timeStyle: 'short' }) : '';

/**
 * Mensajes que el usuario envió desde Contacto, con su estado y la respuesta de la tienda.
 * GET /contactos/mios: el backend identifica al usuario por el correo del token.
 */
function MisMensajes() {
    const [mensajes, setMensajes] = useState<MensajeContacto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerMisMensajes()
            .then(setMensajes)
            .catch(() => setError('No se pudieron cargar tus mensajes.'))
            .finally(() => setCargando(false));
    }, []);

    if (cargando) return <p className="text-secondary mb-0">Cargando mensajes...</p>;
    if (error) return <div className="alert alert-danger py-2 mb-0">{error}</div>;
    if (mensajes.length === 0) {
        return (
            <p className="mb-0">
                Aún no has enviado mensajes. Puedes escribirnos desde <Link to="/contacto">Contacto</Link>.
            </p>
        );
    }

    return (
        <ul className="list-unstyled mb-0 d-flex flex-column gap-3">
            {mensajes.map(m => (
                <li key={m.id} className="border border-secondary rounded p-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                        <small className="text-secondary">{formatearFecha(m.fechaCreacion)}</small>
                        <span className={`badge ${m.estado === 'ATENDIDO' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {m.estado === 'ATENDIDO' ? 'Respondido' : 'Pendiente'}
                        </span>
                    </div>
                    <p className="mb-2">{m.mensaje}</p>
                    {m.respuesta ? (
                        <div className="border-start border-3 border-gold ps-3">
                            <small className="text-gold fw-bold d-block">
                                Respuesta de Sonido Vivo · {formatearFecha(m.fechaRespuesta)}
                            </small>
                            <span>{m.respuesta}</span>
                        </div>
                    ) : (
                        <small className="text-secondary">La tienda aún no responde este mensaje.</small>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default MisMensajes;
