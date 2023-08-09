import React from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function Map() {
  const dummyDataMarkers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1",
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello , I am pop up 3",
    },
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  return (
    <div className="mapContainer">
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Search position="topleft" showMarker={true} showPopup={false} />

        <MarkerClusterGroup
          chunkedLoading // Loads marker 1 by 1 helps with performance
        >
          {dummyDataMarkers.map((marker, idx) => (
            <Marker key={idx} position={marker.geocode} icon={customIcon}>
              <Popup>
                <h2>{marker.popUp}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {useMapEvents({
          "search:locationfound": (e) => {
            const map = e.target;
            map.setView(e.latlng, 16);
          },
        })}
      </MapContainer>
    </div>
  );
}
