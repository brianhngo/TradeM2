import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import "./AllProducts.css";
import { Link } from "react-router-dom";
import axios from "axios";

const AllProducts = ({ updateMapLocation }) => {
  const [products, setProducts] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProductLocation, setSelectedProductLocation] = useState(null);

  const [filter, setFilter] = useState({
    category: "All",
    price: "All",
  });

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const productsRef = child(dbRef, "Products");

    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsList = Object.values(productsData);
        setProducts(productsList);
      }
    });
  }, []);

  //filter
  useEffect(() => {
    let result = products;

    //category filter
    if (filter.category !== "All") {
      result = result.filter((product) => product.category === filter.category);
    }

    //price filter
    if (filter.price !== "All") {
      switch (filter.price) {
        case "50":
          result = result.filter((product) => product.price < 50);
          break;
        case "50-100":
          result = result.filter(
            (product) => product.price >= 50 && product.price <= 100
          );
          break;
        case "100-500":
          result = result.filter(
            (product) => product.price >= 100 && product.price <= 500
          );
          break;
        case "500-1000":
          result = result.filter(
            (product) => product.price >= 500 && product.price <= 1000
          );
          break;
      }
    }

    setFilteredProducts(result);
  }, [products, filter]);



  const locateProduct = async (location) => {
    if (location) {
      console.log("Locating product at:", location);

      const [lat, lon] = location.split(',').map(parseFloat);

      // If coordinates are available
      if (!isNaN(lat) && !isNaN(lon)) {
        const coordinates = [lat, lon];
        updateMapLocation(coordinates);
      } else {
        // Geocode the address using axios and Nominatim API
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
            );
          if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const coordinates = [parseFloat(lat), parseFloat(lon)];
            updateMapLocation(coordinates);
          } else {
            console.log("Location not found");
          }
        } catch (error) {
          console.log("Error locating address:", error);
        }
      }
    } else {
      console.log("Product location missing or map reference is missing");
    }
  };



  return (
    <div className="all-products-container">
      {/* <h3 className="filter-header">Filter</h3> */}
      <div className="filter-section">
        <select
          name="category"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Toy">Toy</option>
          <option value="Clothing">Clothing</option>
        </select>
        <select
          name="price"
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, price: e.target.value }))
          }
        >
          <option value="All">All Prices</option>
          <option value="50">Under 50</option>
          <option value="50-100">50 to 100</option>
          <option value="100-500">100 to 500</option>
          <option value="500-1000">500 to 1000</option>
        </select>
      </div>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li className="product-item" key={product.id}>
            <Link
              className="product-link"
              to={`/singleproduct/${product.productId}`}
            >
              <img
                className="product-img"
                src={product["imageUrl"]}
                alt={product["ProductName"]}
              />
            </Link>
            <div className="product-details">
              <p className="product-texts">Category: {product["category"]} </p>
              <p className="product-texts">Name: {product["name"]} </p>
              <p className="product-texts">
                Description: {product["description"]}
              </p>
              <p className="product-price">Price: ${product["price"]}</p>

              <button onClick={() => locateProduct(product.location)}>
                Locate Product
              </button>
            </div>

            <svg
              className="svgTest"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="100px"
              height="100px"
              viewBox="0 0 36.09 36.09"
            >
              <g>
                <path d="M36.042,13.909c-0.123-0.377-0.456-0.646-0.85-0.688l-11.549-1.172L18.96,1.43c-0.16-0.36-0.519-0.596-0.915-0.596   s-0.755,0.234-0.915,0.598L12.446,12.05L0.899,13.221c-0.394,0.04-0.728,0.312-0.85,0.688c-0.123,0.377-0.011,0.791,0.285,1.055   l8.652,7.738L6.533,34.045c-0.083,0.387,0.069,0.787,0.39,1.02c0.175,0.127,0.381,0.191,0.588,0.191   c0.173,0,0.347-0.045,0.503-0.137l10.032-5.84l10.03,5.84c0.342,0.197,0.77,0.178,1.091-0.059c0.32-0.229,0.474-0.633,0.391-1.02   l-2.453-11.344l8.653-7.737C36.052,14.699,36.165,14.285,36.042,13.909z M25.336,21.598c-0.268,0.24-0.387,0.605-0.311,0.957   l2.097,9.695l-8.574-4.99c-0.311-0.182-0.695-0.182-1.006,0l-8.576,4.99l2.097-9.695c0.076-0.352-0.043-0.717-0.311-0.957   l-7.396-6.613l9.87-1.002c0.358-0.035,0.668-0.264,0.814-0.592l4.004-9.077l4.003,9.077c0.146,0.328,0.456,0.557,0.814,0.592   l9.87,1.002L25.336,21.598z" />
              </g>
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
