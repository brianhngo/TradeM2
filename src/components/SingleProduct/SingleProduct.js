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
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });

      //why is product null here the set product should run and set the product
     get(child(dbRef, `Users/${product.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        setUser(userData);
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);


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
        <Image src={user['Profile Image']} roundedCircle />
        </div>
        <Carousel>
          <Carousel.Item>
            <img src={product['Image']} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={product['Image']} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={product['Image']} />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <p className="itemDesc">
          Name: {product['ProductName']}
        </p>
        <p className="itemDesc">
          {product['Description']}
        </p>
        <p className="itemDesc">
          ${product['Price']}
        </p>
        </div>
      ) : (
        <div> Loading </div>
      )}
      
    </div>
  );
}