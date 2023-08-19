import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AllProducts.css';
import './SingleProduct.css';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function SingleProduct() {
  let { id } = useParams();

  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const onClickHandler = (event) => {
    event.preventDefault();
    navigate(`/profile/${product.userId}`);
  };

  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `Products/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productData = snapshot.val();
          setProduct(productData);

          get(child(dbRef, `Users/${productData.userId}`)).then(
            (userSnapshot) => {
              if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                setUser(userData);
              } else {
                console.log('No user data available');
              }
            }
          );
        } else {
          console.log('No product data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product || !user) {
    return <p>No data available</p>;
  }

  return (
    <div className="singleProductContainer">
      <div className="profileContainer">
        <Link to="/userproducts" state={{ uid: user.id }}>
          <div className="profileImgContainer">
            <Image
              className="profileImg"
              src={user['profileImage']}
              roundedCircle
            />
          </div>
        </Link>
        <p className="email">{user['email']}</p>
      </div>
      <div className="carouselAndDetailsContainer">
        <div className="carouselContainer">
          <Carousel>
            <Carousel.Item>
              <img
                className="carouselImg"
                src={product['imageUrl']}
                alt="Product"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carouselImg"
                src={product['imageUrl']}
                alt="Product"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carouselImg"
                src={product['imageUrl']}
                alt="Product"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="itemDetails">
          <div className="productInfo">
            <p className="singleProductTitle">{product['name']}</p>
            <p className="productDescription">
              Description: {product['description']}
            </p>
            <p className="productPrice">Price: ${product['price']}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
