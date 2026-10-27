type Props = {
    icono: string;
    onClick: () => void;
    color: 'primary' | 'danger' | 'success' | 'warning';
    title: string;
};

function BotonAccion({ icono, onClick, color, title }: Props) {
    return (
        <button
        type="button"
        className={`btn btn-sm btn-outline-${color} me-1`} 
        onClick={onClick}
        title={title}
        aria-label={title}
        >
        {icono}
        </button>
    );
}

export default BotonAccion;