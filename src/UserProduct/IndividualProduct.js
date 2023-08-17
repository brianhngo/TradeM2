import React, { useState } from 'react';
import './UserProduct.css';
import { getDatabase, ref, set } from 'firebase/database';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure this import is correct

export default function IndividualProduct({ product, deleteProduct, uid }) {
  const toastUpdate = () => {
    toast.info('Updated');
  };

  const [editProduct, setEditProduct] = useState(false);
  const [productInfo, setProductInfo] = useState({
    productId: product.productId,
    imageUrl: product.imageUrl || [],
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

  const handleImageChange = async (event) => {
    if (event.target.files.length > 3) {
      alert("You can only upload a maximum of 3 images.");
      return;
    }

    if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const storage = getStorage();
    const storageRef = refFromStorage(storage, 'products/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.error("Error uploading image:", error);
    },
    async () => {
      try{
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('File available at', downloadURL);
            setProductInfo((prevState) => ({ ...prevState, imageUrl: downloadURL }));
      } catch (error) {
      console.error("Error getting download URL:", error);
      }}
    );
    }
  };

  return (
    <div key={product.id} className="product-card">
      {editProduct !== product.productId ? (
        <>
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
                <div className="product-description-container">
                  <p className="product-description">{product.description}</p>
                </div>
                <p className="product-price">${product.price}</p>
                <p className="product-category">{product.category}</p>
              </div>
            </div>
          </Link>
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
          <h2 className="product-image-edit-guide">Upload upto 3 Image Files</h2>
          <form onSubmit={onSaveHandler}>
            <input
              className="input-product-edit-images"
              type="file"
              accept="image/*"
              multiple
              name="productImages"
              onChange={handleImageChange} 
            />
            <input
              className="input-product-name"
              type="text"
              defaultValue={product.name}
              name="name"
              onChange={handleInputChange}
              maxLength="20"
            />
            <input
              className="input-product-description"
              type="text"
              defaultValue={product.description}
              name="description"
              onChange={handleInputChange}
              maxLength="150"
            />
            <input
              className="input-product-price"
              type="text"
              defaultValue={product.price}
              name="price"
              onChange={handleInputChange}
              maxLength="5"
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
