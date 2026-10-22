import { Link } from "react-router-dom";

interface BotonDoradoProps {
    to: string;
    children: React.ReactNode;
    grande?: boolean;
}

function BotonDorado({ to, children, grande = false }: BotonDoradoProps) {
    return (
        <Link
            to={to}
            className={`btn btn-outline-gold text-uppercase ${grande ? "btn-lg px-5" : ""}`}
        >
            {children}
        </Link>
    );
}

export default BotonDorado;
