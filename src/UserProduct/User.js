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
import {
  ref as refFromStorage,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
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
    imageUrls: [],
    name: '',
    description: '',
    price: '',
    category: '',
    location: '',
  });

  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);

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

  const handleImageChange = async (event) => {
    if (event.target.files.length > 3) {
      toast.warning('You can only upload a max of 3 images');
      return;
    }

    let uploadedImageUrls = [];

    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const storage = getStorage();
      const storageRef = refFromStorage(storage, 'productImages/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            uploadedImageUrls.push(downloadURL);

            if (uploadedImageUrls.length === event.target.files.length) {
              setProductImages(uploadedImageUrls);
            }

          } catch (error) {
            console.error('Error getting download URL:', error);
          }
        }
      )
    }
  };

  const addProduct = async () => {
    const uploadedImageUrls = [...productImages];
    const storage = getStorage();

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

      const productData = {
        productId: id,
        imageUrl: uploadedImageUrls,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        location: newProduct.location,
        coordinates: coordinates,
        userId: uid,
      };

      await set(newProductNode, productData);
      toastAdd();

      setNewProduct({
        productId: id,
        imageUrl: "",
        name: "",
        description: "",
        price: "",
        category: "",
        location: "",
      });
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const deleteProduct = (productId) => {
    const database = getDatabase();
    const productRef = ref(database, `Products/${productId}`);
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
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
      {showAddProduct && (
        <div className="add-product-section">
          <h2 className="product-image-guide">Upload upto 3 Image Files</h2>
          <input
            className="input-product-images"
            type="file"
            accept="image/*"
            multiple
            name="productImages"
            onChange={handleImageChange}
          />
          <input
            className="input-product-name"
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            maxLength="30"
          />
          <input
            className="input-product-description"
            type="text"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            maxLength="150"
          />
          <input
            className="input-product-price"
            type="text"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            maxLength="5"
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
            <option value="Sporting">Sporting</option>
            <option value="Furniture">Furniture</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Misc">Misc</option>
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
      <div className="sections-container">
        <div className="bookmarked-products-section">
          <h2 id="listedProductsTitle">Bookmarked Products</h2>
          <BookmarkGrid
            uid={uid}
            products={bookmarkProductArray.filter((element) => {
              if (bookmarkedArray.includes(element.productId)) {
                return element;
              }
            })}
          />
        </div>
        <div className="products-listed-section">
          <h2 id="listedProductsTitle">Products Listed By You</h2>
          <ProductGrid
            products={products}
            deleteProduct={deleteProduct}
            uid={uid}
          />
        </div>
      </div>
    </div>
  );
}
