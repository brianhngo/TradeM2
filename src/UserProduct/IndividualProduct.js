import React, { useState } from 'react';
import './UserProduct.css';
import { getDatabase, ref, set } from 'firebase/database';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this import is correct

export default function IndividualProduct({ product, deleteProduct, uid }) {
  const toastUpdate = () => {
    toast.info('Updated');
  };

  const [editProduct, setEditProduct] = useState(false);
  const [productInfo, setProductInfo] = useState({
    productId: product.productId,
    imageUrl: product.imageUrl,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    location: product.location,
    userId: uid,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSaveHandler = (event) => {
    event.preventDefault();
    const database = getDatabase();
    const updateProductNode = ref(database, `Products/${product.productId}`);
    toastUpdate();
    set(updateProductNode, productInfo).then(() => {
      console.log('updated');
      setEditProduct(false);
    });
  };
  return (
    <div key={product.id} className="product-card">
      {editProduct !== product.productId ? (
        <>
          <img
            className="product-image"
            src={product.imageUrl}
            alt={product.name}
          />
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price}</p>
          <p className="product-category">{product.category}</p>
          <button
            className="edit-product-btn"
            onClick={() => setEditProduct(product.productId)}>
            Edit
          </button>
          <button
            className="delete-product-btn"
            onClick={() => deleteProduct(product.productId)}>
            Delete
          </button>
        </>
      ) : (
        <div key={product.id} className="product-card">
          <form onSubmit={onSaveHandler}>
            <input
              className="input-product-image-url"
              type="text"
              defaultValue={product.imageUrl}
              name="imageUrl"
              onChange={handleInputChange}
            />
            <input
              className="input-product-name"
              type="text"
              defaultValue={product.name}
              name="name"
              onChange={handleInputChange}
            />
            <input
              className="input-product-description"
              type="text"
              defaultValue={product.description}
              name="description"
              onChange={handleInputChange}
            />
            <input
              className="input-product-price"
              type="text"
              defaultValue={product.price}
              name="price"
              onChange={handleInputChange}
            />
            <input
              className="input-product-category"
              type="text"
              defaultValue={product.category}
              name="category"
              onChange={handleInputChange}
            />
            <input
              className="input-product-location"
              type="text"
              defaultValue={product.location}
              name="location"
              onChange={handleInputChange}
            />
            <button className="add-product-btn">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
