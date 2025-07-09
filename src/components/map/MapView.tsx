"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon
const icon = new Icon({
 iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Property = {
  id: string;
  title: string;
  price: number;
  latitude: number | null;
  longitude: number | null;
  city?: string;
  state?: string;
  bhk?: string;
};

export default function MapView({ properties }: { properties: Property[] }) {
  const validProps = properties.filter(p => p.latitude !== null && p.longitude !== null);
  
  const defaultCenter: LatLngExpression = validProps.length > 0
    ? [validProps[0].latitude!, validProps[0].longitude!]
    : [19.0760, 72.8777]; // Default to Mumbai

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={12} 
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {validProps.map((prop) => (
        <Marker
          key={prop.id}
          position={[prop.latitude!, prop.longitude!]}
          icon={icon}
        >
          <Popup className="leaflet-popup">
            <div className="space-y-1 min-w-[200px]">
              <h4 className="font-semibold">{prop.title}</h4>
              <div className="flex items-center gap-1 text-sm">
                <span>₹{prop.price.toLocaleString()}</span>
                {prop.bhk && (
                  <>
                    <span>•</span>
                    <span>{prop.bhk} BHK</span>
                  </>
                )}
              </div>
              {prop.city && prop.state && (
                <p className="text-xs text-gray-600">
                  {prop.city}, {prop.state}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}