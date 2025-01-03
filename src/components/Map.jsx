// Map.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// Fix default icon issue in React Leaflet
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Delete the default _getIconUrl method
delete L.Icon.Default.prototype._getIconUrl;

// Merge options
L.Icon.Default.prototype.options = {
  ...L.Icon.Default.prototype.options,
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
};


const InteractiveMap = ({ regions }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Active Voting Regions</h2>
        <MapContainer
          center={[20.5937, 78.9629]} // Center the map to India (replace with your app's target region)
          zoom={5}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          {regions.map((region, index) => (
            <Marker
              key={index}
              position={region.coordinates}
              title={region.name}
            >
              <Popup>
                <h3 className="text-lg font-bold">{region.name}</h3>
                <p>{region.description}</p>
                <p className="font-semibold">
                  Votes Cast Today: {region.votesToday}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Map;
