import React from 'react';
import IndividualBookmark from './IndividualBookmark';
import IndividualProduct from './IndividualProduct';
import './UserProduct.css';

export default function BookmarkGrid({ products, uid }) {
  return (
    <div className="product-grid">
      {Array.isArray(products) &&
        products.map((product) => (
          <div key={product.id}>
            <IndividualBookmark product={product} uid={uid} />
          </div>
        ))}
    </div>
  );
}
