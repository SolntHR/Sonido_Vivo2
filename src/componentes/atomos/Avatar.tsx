import "../../estilos/Avatar.css";

interface AvatarProps {
    nombre: string;
    foto?: string;
    tamano?: number; // en píxeles
}

// Foto de perfil circular; si no hay foto, muestra las iniciales.
function Avatar({ nombre, foto, tamano = 40 }: AvatarProps) {
    const iniciales = nombre
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("");

    return (
        <span
            className="avatar-burbuja"
            style={{ width: tamano, height: tamano, fontSize: tamano * 0.4 }}
            aria-label={`Foto de perfil de ${nombre}`}
        >
            {foto ? <img src={foto} alt="" /> : iniciales || "?"}
        </span>
    );
}

export default Avatar;
