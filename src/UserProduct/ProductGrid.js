import React from 'react';
import IndividualProduct from './IndividualProduct';
import './UserProduct.css';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, deleteProduct, uid }) => {
  return (
    <div className="product-grid">
      {Array.isArray(products) &&
        products.map((product) => (
          <Link to={`/singleproduct/${product.productId}`}>
          <IndividualProduct
            key={product.id}
            product={product}
            deleteProduct={deleteProduct}
            uid={uid}
          />
          </Link>
        ))}
    </div>
  );
};

export default ProductGrid;
