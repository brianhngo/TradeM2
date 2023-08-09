import React from 'react';
import './UserProduct.css'

const ProductGrid = ({ products, deleteProduct }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) && products.map((product) => (
        <div key={product.id} className="product-card">
          <img className="product-image" src={product.imageUrl} alt={product.name} />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price}</p>
          <p className="product-category">{product.category}</p>
          <button className="edit-product-btn">Edit</button>
          <button className="delete-product-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
