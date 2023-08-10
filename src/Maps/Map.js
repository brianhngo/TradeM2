import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { getDatabase, ref, get } from "firebase/database";
import axios from "axios";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // Circle,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function Map() {
  const [productMarkers, setProductMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  // const [radius, setRadius] = useState(600);
  const [address, setAddress] = useState("");
  const mapRef = useRef();

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const locateAddress = async () => {
    console.log("Locating address:", address);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setUserLocation([parseFloat(lat), parseFloat(lon)]);
        if (mapRef.current) {
          const map = mapRef.current;
          map.setView([parseFloat(lat), parseFloat(lon)], 13);
        }
      } else {
        console.log("Address not found");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

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

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);

        if (mapRef.current) {
          const map = mapRef.current;
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
        zoom={userLocation ? 13 : 7}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <>
            {/* <Circle center={userLocation} radius={radius} /> */}
            <Marker position={userLocation} icon={customIcon}>
              <Popup>
                <h2>Your Location</h2>
              </Popup>
            </Marker>
          </>
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

      <div className="address-container">
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={handleAddressChange}
        />
        <button className="locateButton" onClick={locateAddress}>
          Locate Address
        </button>
      </div>
    </div>
  );
}
