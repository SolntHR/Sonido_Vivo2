import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import iconoMarcador from 'leaflet/dist/images/marker-icon.png';
import iconoMarcador2x from 'leaflet/dist/images/marker-icon-2x.png';
import sombraMarcador from 'leaflet/dist/images/marker-shadow.png';
import { TIENDA, urlComoLlegar } from '../../data/tienda';

const icono = L.icon({
    iconUrl: iconoMarcador,
    iconRetinaUrl: iconoMarcador2x,
    shadowUrl: sombraMarcador,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface Props {
    alto?: number;
}

function MapaTienda({ alto = 300 }: Props) {
    const posicion: [number, number] = [TIENDA.latitud, TIENDA.longitud];

    return (
        <div>
            <div className="rounded overflow-hidden border border-secondary" style={{ height: alto }}>
                <MapContainer center={posicion} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={posicion} icon={icono}>
                        <Popup>
                            <strong>{TIENDA.nombre}</strong>
                            <br />
                            {TIENDA.direccion}, {TIENDA.comuna}
                            <br />
                            Punto de retiro de pedidos
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
                <small>
                    {TIENDA.direccion}, {TIENDA.comuna}, {TIENDA.region}
                </small>
                <a href={urlComoLlegar()} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-gold">
                    Cómo llegar
                </a>
            </div>
        </div>
    );
}

export default MapaTienda;
