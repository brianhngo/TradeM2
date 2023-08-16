import React from 'react';
import IndividualProduct from './IndividualProduct';
import './UserProduct.css';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, deleteProduct, uid }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) &&
        products.map((product) => (
          <div key={product.id}>
           
              <IndividualProduct
                product={product}
                deleteProduct={deleteProduct}
                uid={uid}
              />
           
          </div>
        ))}
    </div>
  );
};

export default ProductGrid;
