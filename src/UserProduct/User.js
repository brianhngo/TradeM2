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
import BookmarkGrid from './BookmarkGrid';

export default function User({ uid }) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [bookmarkedArray, setBookmarkArray] = useState([]);
  const [bookmarkProductArray, setBookmarkProductArray] = useState([]);
  const [filteredBookmarkProducts, setFilteredBookmarkProducts] = useState([]);
  const toggleAddProduct = () => {
    setShowAddProduct((prevShowAddProduct) => !prevShowAddProduct);
  };

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
    toast.success('Added');
  };

  const toastDelete = () => {
    toast.success('Deleted');
  };

  const toastWarning = () => {
    toast.warning('Please select an category option');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const [products, setProducts] = useState([]);

  const addProduct = async () => {
    try {
      if (newProduct.category === 'None') {
        console.log('hi');
        toastWarning();
        return;
      }
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
        productId: id,
        imageUrl: '',
        name: '',
        description: '',
        price: '',
        category: '',
        location: ``,
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
    );
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];
      setProducts(productsArray);
    });

    const bookmarkRef = query(ref(database, `Users/${uid}/Bookmarks/`));
    const unsubscribeBookmark = onValue(bookmarkRef, (snapshot) => {
      const data = snapshot.val();
      const bookmarkArray = data ? Object.keys(data) : [];
      setBookmarkArray(bookmarkArray);
    });

    const productsRefDb = query(ref(database, `Products/`));
    const unsubscribeProduct = onValue(productsRefDb, (snapshot) => {
      const data = snapshot.val();
      const productsArray = data ? Object.values(data) : [];

      setBookmarkProductArray(productsArray);
    });

    return () => {
      unsubscribe();
      unsubscribeBookmark();
      unsubscribeProduct();
    };
  }, []);

  return (
    <div className="body">
      <button className="showAddProduct-btn" onClick={toggleAddProduct}>
        Add New Product
      </button>
      {showAddProduct && (
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
          <select
            className="input-product-category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}>
            <option value="None">Please Select a Category</option>
            <option value="Toy">Toy</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
          </select>
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
      )}

      <h2 id="listedProductsTitle"> BookedMarked Products</h2>
      <div className="listedProductsBookmark">
        <BookmarkGrid
          uid={uid}
          products={bookmarkProductArray.filter((element) => {
            if (bookmarkedArray.includes(element.productId)) {
              return element;
            }
          })}
        />
      </div>
      <h2 id="listedProductsTitle"> Products Listed By You</h2>
      <div className="listedProducts">
        <ProductGrid
          products={products}
          deleteProduct={deleteProduct}
          uid={uid}
        />
      </div>
    </div>
  );
}
