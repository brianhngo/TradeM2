import React, { useState } from 'react';
import './UserProduct.css';
import { getDatabase, ref, set, child, update } from 'firebase/database';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this import is correct

export default function IndividualBookmark({ product, uid }) {
  const toastUpdate = () => {
    toast.success('Removed');
  };

  const deleteProduct = (event, productId) => {
    try {
      event.preventDefault();
      const dbRef = ref(getDatabase());
      const bookmarksRef = child(dbRef, `Users/${uid}/Bookmarks/`);
      update(bookmarksRef, {
        [productId]: null,
      });

      toastUpdate();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div key={product.id} className="product-card">
      <Link
        className="product-Links"
        to={`/singleproduct/${product.productId}`}>
        <div className="product-content">
          <img
            className="product-img"
            src={product.imageUrl}
            alt={product.name}
          />
          <div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <div className="product-description-container">
              <p className="product-description">{product.description}</p>
            </div>

            <p className="product-category">{product.category}</p>
          </div>
        </div>
      </Link>
      <button
        className="delete-product-btn"
        onClick={(event) => deleteProduct(event, product.productId)}>
        Remove from Bookmarks
      </button>
    </div>
  );
}
