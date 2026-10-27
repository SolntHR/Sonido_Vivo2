import type { ReactNode } from 'react';

type Props = {
    columnas: string[];
    children: ReactNode;
    mensajeVacio: string;
    hayDatos: boolean;
};

function TablaAdmin({ columnas, children, mensajeVacio, hayDatos }: Props) {
    return (
        <div className="card-body p-0 table-responsive" style={{ maxHeight: '600px' }}>
        <table className="table table-hover table-striped align-middle mb-0">
            <thead className="table-dark sticky-top">
            <tr>
                {columnas.map((col, index) => (
                <th key={index} className={col === 'Acciones' ? 'text-center' : ''}>
                    {col}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {!hayDatos ? (
                <tr>
                <td colSpan={columnas.length} className="text-center py-4">
                    {mensajeVacio}
                </td>
                </tr>
            ) : (
                children
            )}
            </tbody>
        </table>
        </div>
    );
}

export default TablaAdmin;