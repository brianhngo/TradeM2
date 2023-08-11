import React from 'react';
import IndividualProduct from './IndividualProduct';
import './UserProduct.css';

const ProductGrid = ({ products, deleteProduct, uid }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) &&
        products.map((product) => (
          <IndividualProduct
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            uid={uid}
          />
        ))}
    </div>
  );
};

export default ProductGrid;
