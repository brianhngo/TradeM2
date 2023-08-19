import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';
import './AllProducts.css';
import SingleProduct from './SingleProduct/SingleProduct';
import IndividualProduct from '../UserProduct/IndividualProduct';
export default function ProductsByUser() {
  let { state } = useLocation();

  const userId = state.uid;

  const [userProducts, setUserProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    console.log('userId:', userId);

    // Fetch user details
    get(child(dbRef, `Users/${userId}`))
      .then((userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUser(userData);

          // Fetch all products listed by the user
          get(child(dbRef, 'Products'))
            .then((productsSnapshot) => {
              if (productsSnapshot.exists()) {
                const allProducts = productsSnapshot.val();
                const userProducts = Object.values(allProducts).filter(
                  (product) => product.userId === userId
                );
                setUserProducts(userProducts);
              }
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        } else {
          console.log('No user data available');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data available</p>;
  }

  if (userProducts.length === 0) {
    return (
      <div>
        <p>No products listed by this user.</p>
      </div>
    );
  }
  return (
    <>
      <img src={user.profileImage} roundedCircle />
      <h3 className="text-center"> {user.userName}</h3>

      <div className="product-list">
        {userProducts.map((product) => (
          
          <div key={product.productId} className="product-item">
           <Link to={`/singleproduct/${product.productId}`}>  <img
              className="product-img"
              src={product.imageUrl}
              alt={product.name}
            /> </Link>
          
            <div className="product-details text-black">
              <h3 className="product-name text-black">{product.name}</h3>
              <p className="product-description text-black">
                {product.description}
              </p>
              <p className="product-price">{`$ ${product.price}`}</p>
              <p className="product-category text-black">{product.category}</p>
            </div>
            <IndividualProduct
            key={product.productId}
            product={product}
            uid={userId} // Pass the user ID as a prop
            deleteProduct={deleteProduct}
            locateProduct={locateProduct}
          />
          </div>

          
        ))}
      </div>
    </>
  );
}
