import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import './AllProducts.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Bookmark from './Bookmark'; // Make sure you have the correct path to your Bookmark component
import toyIcon from '../../public/toys.png';
import electronicsIcon from '../../public/electronics.png';
import clothingIcon from '../../public/clothing.png';

const ICONS = {
  Toy: toyIcon,
  Electronics: electronicsIcon,
  Clothing: clothingIcon
};

const AllProducts = ({ updateMapLocation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: 'All',
    price: 'All',
  });

  const handleIconClick = (category) => {
    setFilter((prev) => ({ ...prev, category }));
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const productsRef = child(dbRef, 'Products');

    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsList = Object.values(productsData);
        setProducts(productsList);
      }
    });
  }, []);

  useEffect(() => {
    let result = products;

    if (filter.category !== 'All') {
      result = result.filter((product) => product.category === filter.category);
    }

    if (filter.price !== 'All') {
      switch (filter.price) {
        case '50':
          result = result.filter((product) => product.price < 50);
          break;
        case '50-100':
          result = result.filter(
            (product) => product.price >= 50 && product.price <= 100
          );
          break;
        case '100-500':
          result = result.filter(
            (product) => product.price >= 100 && product.price <= 500
          );
          break;
        case '500-1000':
          result = result.filter(
            (product) => product.price >= 500 && product.price <= 1000
          );
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [products, filter]);

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
    <div className="all-products-container">
      <div className="filter-section">
        <div className="icon-container">
          {Object.entries(ICONS).map(([category, iconPath]) => (
            <img
            key={category}
            src={iconPath}
            alt={category}
            className={`filter-icon ${filter.category === category ? 'active' : ''}`}
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
          {/* Options here */}
          <option value="All">All Prices</option>
          <option value="50">Under 50</option>
          <option value="50-100">50 to 100</option>
          <option value="100-500">100 to 500</option>
          <option value="500-1000">500 to 1000</option>
        </select>
      </div>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-item" key={product.id}>
            <div className="product-img-container">
              <button
                className="locate-product"
                onClick={() => locateProduct(product.location)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-geo-alt-fill"
                  viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
              </button>
              <Bookmark
                productId={product.productId}
                className="bookmark-icon"
              />{' '}
              {/* Add the Bookmark component here */}
              <Link
                className="product-link"
                to={`/singleproduct/${product.productId}`}>
                <img
                  className="product-img"
                  src={product.imageUrl}
                  alt={product.ProductName}
                />
              </Link>
              <p className="product-name">{product.name}</p>
            </div>
            <p className="product-price">${product.price}</p>
            <div className="product-details">
              <p className="product-texts">
                Description: {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
