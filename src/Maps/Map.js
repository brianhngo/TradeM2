import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { getDatabase, ref, get } from "firebase/database";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function Map() {

  const [productMarkers, setProductMarkers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const productsRef = ref(db, 'Products');
    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsList = Object.values(productsData);
        const locations = productsList.map(product => {
          const [lat, lng] = product.location.split(',');
          return {
            geocode: [+lat, +lng],
            productDetails: product
          };
        });
        setProductMarkers(locations);
      }
    });
  }, []);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(); // Create a reference to the MapContainer

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        if (mapRef.current) {
          const map = mapRef.current; 
          map.setView([latitude, longitude], 16); // Set the view to user's location
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
        zoom={userLocation ? 16 : 13}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>
              <h2>Your Location</h2>
            </Popup>
          </Marker>
        )}

        <MarkerClusterGroup chunkedLoading>
          {productMarkers.map((marker, idx) => (
            <Marker key={idx} position={marker.geocode} icon={customIcon}>
              <Popup>
              <h2>{marker.productDetails.name}</h2>
              <img src={marker.productDetails.imageUrl} alt={marker.productDetails.name} width="100" />
              <p>Category: {marker.productDetails.category}</p>
              <p>{marker.productDetails.description}</p>
              <p>Price: ${marker.productDetails.price}</p>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Locate Me button */}
      <button className="locateButton" onClick={locateUser}>
        Locate Me
      </button>
    </div>
  );
}
