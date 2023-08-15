import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AllProducts.css';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function SingleProduct() {
  let { id } = useParams();
  //get product images and info from firebase
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

          // Once product data is set, fetch user data using product.userId
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
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product || !user) {
    return (
      <div>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div>
      {loading === false ? (

        <div> 
        <div className="profilecontainer">
       <Link to="/userproducts" state={{ uid: user.id }}>
        <Image className="profileimg"src={user['profileImage']} roundedCircle />
           </Link>
        </div>
        <Carousel>
          <Carousel.Item>
            <img className="carouselImg" src={product['imageUrl']} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="carouselImg" src={product['imageUrl']} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="carouselImg" src={product['imageUrl']} />
          </Carousel.Item>
        </Carousel>
        <div className='itemtext'> 
        <div className='prodName'>
        <p className="itemDesc">
          {product['name']}
        </p>
        </div>
        <div className='priceanddesc'> 
        <p className="itemDesc">
          Description: {product['description']}
        </p>
        <p className="itemDesc">
          Price: ${product['price']}
        </p>

        </div>
        </div>
        
        </div>
      ) : (
        <div> Loading </div>
      )}
    </div>
  );
}
