import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";
import "./SingleProduct/SingleProduct.css";
import IndividualProduct from "../UserProduct/IndividualProduct";
import { Image, Carousel } from "react-bootstrap";
export default function ProductsByUser() {
  let { state } = useLocation();

  const userId = state.uid;

  const [userProducts, setUserProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dbRef = ref(getDatabase());
    // console.log('userId:', userId);

    // Fetch user details
    get(child(dbRef, `Users/${userId}`))
      .then((userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          setUser(userData);

          // Fetch all products listed by the user
          get(child(dbRef, "Products"))
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
          console.log("No user data available");
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
    <div className="userProductsContainer">
      <div className="upProfileContainer">
        <div className="upProfileImgContainer">
          <img
            className="upProfileImg"
            src={user.profileImage}
            alt={user.userName}
          />
         
        </div>
        <p className="upEmail"> {user.email}</p>
      </div>

      <div className="upCarouselAndDetailsContainer">
        {userProducts.map((product) => (
          <div key={product.productId} className="upProduct-item">
            <Link to={`/singleproduct/${product.productId}`}>
              <img
                className="upProduct-img"
                src={product.imageUrl}
                alt={product.name}
              />
            </Link>
            {/* Just in Case:  */}
            {/* <IndividualProduct
            key={product.productId}
            product={product}
            uid={userId} 

          /> */}

            <div className="upItemDetails">
              <div clacsName="upProductInfo">
                <p className="upSingleProductTitle">{product.name}</p>
                <p className="upProductDescription">{product.description}</p>
                <p className="upProductPrice">{`$ ${product.price}`}</p>
                <p className="upProduct-category">{product.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
