import React, { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle, // Import Circle component
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

  const [userLocation, setUserLocation] = useState(null);
  //Change Radius Size
  const [radius, setRadius] = useState(600);
  const mapRef = useRef();

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        if (mapRef.current) {
          const map = mapRef.current;
          // Zoom out to view radius
          map.setView([latitude, longitude], 13); 
        }
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  };

  return (
    <div className="mapContainer">
      <MapContainer
        ref={mapRef}
        center={userLocation || [48.8566, 2.3522]}
        zoom={userLocation ? 13 : 7} // Zoom out initially
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            <Circle center={userLocation} radius={radius} /> {/* Display the radius */}
            <Marker position={userLocation} icon={customIcon}>
              <Popup>
                <h2>Your Location</h2>
              </Popup>
            </Marker>
          </>
        )}

        <MarkerClusterGroup chunkedLoading>
          {dummyDataMarkers.map((marker, idx) => (
            <Marker key={idx} position={marker.geocode} icon={customIcon}>
              <Popup>
                <h2>{marker.popUp}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      <button className="locateButton" onClick={locateUser}>
        Locate Me
      </button>
    </div>
  );
}
