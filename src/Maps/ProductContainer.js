import React, { useState, useEffect, useRef } from 'react';
import Map from './Map';
import AllProducts from '../components/AllProducts';
import { getDatabase, ref, get } from 'firebase/database';
import axios from 'axios';
import toyIcon from '../../public/toys.png';
import electronicsIcon from '../../public/electronics.png';
import clothingIcon from '../../public/clothing.png';
import sportIcon from '../../public/sport.png';
import jewelryIcon from '../../public/jewelry.png';
import furnitureIcon from '../../public/furniture.png';
import miscIcon from '../../public/misc_icon.png';
import everythingIcon from '../../public/everything.png';

const ICONS = {
  All: everythingIcon,
  Toy: toyIcon,
  Electronics: electronicsIcon,
  Clothing: clothingIcon,
  Sporting: sportIcon,
  Furniture: furnitureIcon,
  Jewelry: jewelryIcon,
  Misc: miscIcon,
};

function ProductContainer() {
  const [unfilteredProducts, setUnfilteredProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: 'All',
    price: 'All',
  });
  const mapRef = useRef();
  const [highlightedProductLocation, setHighlightedProductLocation] =
    useState(null);

  const handleIconClick = (category) => {
    setFilter((prev) => ({ ...prev, category }));
  };

  useEffect(() => {
    // Filter the products when filter or unfilteredProducts change
    let result = unfilteredProducts;
    console.log(result);
    if (filter.category !== 'All') {
      result = result.filter(
        (product) => product.productDetails.category === filter.category
      );
    }

    if (filter.price !== 'All') {
      switch (filter.price) {
        case '50':
          result = result.filter(
            (product) => product.productDetails.price < 50
          );
          break;
        case '50-100':
          result = result.filter(
            (product) =>
              product.productDetails.price >= 50 &&
              product.productDetails.price <= 100
          );
          break;
        case '100-500':
          result = result.filter(
            (product) =>
              product.productDetails.price >= 100 &&
              product.productDetails.price <= 500
          );
          break;
        case '500-1000':
          result = result.filter(
            (product) =>
              product.productDetails.price >= 500 &&
              product.productDetails.price <= 1000
          );
          break;
        default:
          break;
      }
    }

    // Update the filteredProducts state
    setFilteredProducts(result);
  }, [filter, unfilteredProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      const db = getDatabase();
      const productsRef = ref(db, 'Products');

      try {
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsList = Object.values(productsData);

          const locations = await Promise.all(
            productsList.map(async (product) => {
              const [lat, lng] = product.location.split(',');
              const address = `${lat},${lng}`;

              try {
                const response = await axios.get(
                  `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
                );

                if (response.data.length > 0) {
                  const latAddress = parseFloat(response.data[0].lat);
                  const lngAddress = parseFloat(response.data[0].lon);
                  return {
                    geocode: [latAddress, lngAddress],
                    productDetails: product,
                  };
                }
              } catch (error) {
                console.error('Error fetching geolocation:', error);
              }
            })
          );

          setUnfilteredProducts(locations);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const updateMapLocation = (location) => {
    console.log(mapRef);
    if (mapRef.current) {
      mapRef.current.flyTo(location, 13);
    }
  };

  const locateProduct = async (location) => {
    if (location) {
      console.log('Locating product at:', location);

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
            console.log('Location not found');
          }
        } catch (error) {
          console.log('Error locating address:', error);
        }
      }
    } else {
      console.log('Product location missing or map reference is missing');
    }
  };

  return (
    <div className="all-container">
      <div className="allProducts-Container">
        <div className="filter-section">
          <div className="icon-container">
            {Object.entries(ICONS).map(([category, iconPath]) => (
              <img
                key={category}
                src={iconPath}
                alt={category}
                className={`filter-icon ${
                  filter.category === category ? 'active' : ''
                }`}
                onClick={() => handleIconClick(category)}
              />
            ))}
          </div>
          <div className="price-filter-container">
            <select
              name="price"
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, price: e.target.value }))
              }>
              <option value="All">All Prices</option>
              <option value="50">Under 50</option>
              <option value="50-100">50 to 100</option>
              <option value="100-500">100 to 500</option>
              <option value="500-1000">500 to 1000</option>
            </select>
          </div>
          <AllProducts
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
            filter={filter}
            setFilter={setFilter}
            updateMapLocation={updateMapLocation}
            locateProduct={locateProduct}
          />
        </div>
      </div>

      <Map
        filteredProducts={filteredProducts}
        updateMapLocation={updateMapLocation}
        locateProduct={locateProduct}
        mapRef={mapRef}
        highlightedProductLocation={highlightedProductLocation}
      />
    </div>
  );
}

export default ProductContainer;
