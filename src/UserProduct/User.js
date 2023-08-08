import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import UserProfile from './UserProfile';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import './User.css'

const User = ({ match }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  //get user id from url ex) http://localhost:3000/user/1
  const { userId } = useParams();
  //const { userId } = match.params;

  //get user data and user's products
  useEffect(() => {
    const fetchUserAndProducts = async () => {
      const userRef = firebase.database().ref('Users').child(userId);
      const userSnapshot = await userRef.once('value');
      const userData = userSnapshot.val();
      
      const productsRef = firebase.database().ref('Products');
      const productsSnapshot = await productsRef.once('value');
      const productsData = productsSnapshot.val();
      
      const userProducts = Object.values(productsData).filter(
        product => product.userId === userId
      );

      setUser(userData);
      setProducts(userProducts);
    };

    fetchUserAndProducts();
  }, [userId]);

  //check auth for logged in user
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user);
    });
  }, []);

  if (!user || !products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-page">
      <UserProfile user={user} isCurrentUser={currentUser && currentUser.uid === userId} />
      <ProductGrid products={products} isCurrentUser={currentUser && currentUser.uid === userId} />
    </div>
  );
};

export default User;