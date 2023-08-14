import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { Image, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './SingleProduct.css';
import { useParams } from 'react-router-dom';

export default function SingleProduct() {
  let {id} = useParams();
  //get product images and info from firebase
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const dbRef = ref(getDatabase());

    get(child(dbRef, `Products/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productData = snapshot.val();
          setProduct(productData);
          console.log(productData);
          console.log(product);


          // Once product data is set, fetch user data using product.userId
          get(child(dbRef, `Users/${productData.userId}`)).then((userSnapshot) => {
            if (userSnapshot.exists()) {
              const userData = userSnapshot.val();
              setUser(userData);
            } else {
              console.log('No user data available');
            }
          });
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
        <div className="profilepic">
        <Image src={user['profileImage']} roundedCircle />
        </div>
        <Carousel>
          <Carousel.Item>
            <img className="carouselImg" src={product['imageUrl']} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carouselImg" src={product['imageUrl']} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carouselImg" src={product['imageUrl']} />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className='itemtext'> 
        <p className="itemDesc">
          Name: {product['name']}
        </p>
        <p className="itemDesc">
          {product['description']}
        </p>
        <p className="itemDesc">
          ${product['price']}
        </p>
        </div>
        
        </div>
      ) : (
        <div> Loading </div>
      )}
      
    </div>
  );
}