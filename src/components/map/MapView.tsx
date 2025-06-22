"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing default marker icon in Leaflet
const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Property = {
  id: string;
  title: string;
  latitude: number | null;
  longitude: number | null;
  price: number;
};

export default function MapView({ properties }: { properties: Property[] }) {
  const validProps = properties.filter(p => p.latitude !== null && p.longitude !== null);
  const defaultCenter: LatLngExpression =
    validProps.length > 0
      ? [validProps[0].latitude as number, validProps[0].longitude as number]
      : [19.07, 72.87]; // fallback: Mumbai

  return (
    <MapContainer center={defaultCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {validProps.map((prop) => (
        <Marker
          key={prop.id}
          position={[prop.latitude!, prop.longitude!]}
          icon={icon}
        >
          <Popup>
            <strong>{prop.title}</strong><br />
            ₹{prop.price.toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
