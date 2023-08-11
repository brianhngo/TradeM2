import React, { useState, useEffect } from 'react';

import ProductGrid from './ProductGrid';
import './UserProduct.css';
import {
  getDatabase,
  ref,
  push,
  remove,
  onValue,
  set,
  orderByChild,
  query,
  equalTo,
} from 'firebase/database';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this import is correct

export default function User({ uid }) {
  const [newProduct, setNewProduct] = useState({
    imageUrl: '',
    name: '',
    description: '',
    price: '',
    category: '',
    location: '',
  });

  // Adds Item
  const toastAdd = () => {
    toast.info('Added');
  };

  const toastDelete = () => {
    toast.info('Deleted');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const [products, setProducts] = useState([]);

  const addProduct = async () => {
    try {
      if (
        !newProduct.name ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.category ||
        !newProduct.location
      ) {
        return;
      }

      const coordinates = await geocodeAddress(newProduct.location);

      if (!coordinates) {
        console.log('Error geocoding address');
        return;
      }

      const database = getDatabase();
      const productsRef = ref(database, 'Products');
      const newProductNode = push(productsRef);
      const id = newProductNode.key;
      const newProductData = {
        productId: id,
        imageUrl: newProduct.imageUrl,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        location: `${coordinates.lat},${coordinates.lon}`,
        userId: uid,
      };

      set(newProductNode, newProductData).then(() => {
        console.log('updated');
      });

      toastAdd();
      setNewProduct({
        imageUrl: '',
        name: '',
        description: '',
        price: '',
        category: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = (productId) => {
    const database = getDatabase();
    const productRef = ref(database, `Products/${productId}`); // 'products' is the name of your database node

    remove(productRef);
    toastDelete();
  };

  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        console.log('Address not found');
        return null;
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  };

  useEffect(() => {
    const database = getDatabase();
    const productsRef = query(
      ref(database, 'Products'),
      orderByChild('userId'),
      equalTo(uid)
    ); // 'products' is the name of your database node
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProducts(productsArray);
    });

    return () => {
      // Unsubscribe from the database listener when the component unmounts
      unsubscribe();
    };
  });

  return (
    <div className="body">
      <div>
        <div className="add-product-section">
          <h4 className="add-product-title">Add New Product</h4>
          <input
            className="input-product-image-url"
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={newProduct.imageUrl}
            onChange={handleInputChange}
          />
          <input
            className="input-product-name"
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            className="input-product-description"
            type="text"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
          <input
            className="input-product-price"
            type="text"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <input
            className="input-product-category"
            type="text"
            placeholder="Category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          />
          <input
            className="input-product-location"
            type="text"
            placeholder="Location"
            name="location"
            value={newProduct.location}
            onChange={handleInputChange}
          />

          <button className="add-product-btn" onClick={addProduct}>
            Add Product
          </button>
        </div>
      </div>

      <ProductGrid products={products} deleteProduct={deleteProduct} />
    </div>
  );
}
