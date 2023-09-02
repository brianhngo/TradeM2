import React from 'react';
import './AllProducts.css';
import { Link } from 'react-router-dom';
import Bookmark from './Bookmark';

export default function AllProducts({
  filteredProducts,
  filter,
  setFilter,
  updateMapLocation,
  locateProduct,
}) {
  return (
    <div className="all-products-container">
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-item" key={product.productDetails.id}>
            <div className="product-img-container">
              <button
                className="locate-product"
                onClick={() => {
                  const location = product.productDetails.location;
                  locateProduct(location); // Call locateProduct to get the location coordinates
                  updateMapLocation(location); // Call updateMapLocation with the location coordinates
                }}>
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
                productId={product.productDetails.productId}
                className="bookmark-icon"
              />
              <Link
                className="product-link"
                to={`/singleproduct/${product.productDetails.productId}`}>
                <img
                  className="product-img"
                  src={product.productDetails.imageUrl}
                  alt={product.productDetails.ProductName}
                />
              </Link>
              <p className="product-name">{product.productDetails.name}</p>
            </div>
            <p className="product-price">${product.productDetails.price}</p>
            <div className="product-details">
              <p className="product-texts">
                Description: {product.productDetails.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
