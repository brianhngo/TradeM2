import React from 'react';
import './ProductGrid.css';

const ProductGrid = ({ products, isCurrentUser }) => (
  <div className="product-grid">
    {products.map(product => (
      <div className="product-card" key={product.id}>
        <div className="product-image">
          <img src={product.Image} alt={product.Name} />
        </div>
        <div className="product-details">
          <h3>{product.Name}</h3>
          <p>{product.Description}</p>
          <p>{product.Price}</p>
          <p>{product.Category}</p>
          {isCurrentUser && (
            <>
              <button>Edit</button>
              <button>Delete</button>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default ProductGrid;
