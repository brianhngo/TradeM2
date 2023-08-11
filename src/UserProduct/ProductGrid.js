import React from 'react';
import IndividualProduct from './IndividualProduct';
import './UserProduct.css';

const ProductGrid = ({ products, deleteProduct }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) &&
        products.map((product) => (
          <IndividualProduct
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))}
    </div>
  );
};

export default ProductGrid;
