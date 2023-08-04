import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import ProductGrid from './ProductGrid';

export default function User() {
  const [user, setUser] = useState({
    name: "John Doe",
    profileImageUrl: "https://xsgames.co/randomusers/assets/avatars/male/27.jpg"
  });
  const [products, setProducts] = useState([
    {id: 1, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-ToyTruck.jpg', name: 'product 1', description: 'product description', price: '10', category: 'category 1'},
    {id: 2, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Boxing.jpg', name: 'product 2', description: 'product description', price: '15', category: 'category 2'},
    {id: 3, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Cup.jpg', name: 'product 3', description: 'product description', price: '20', category: 'category 3'},
    {id: 4, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Rocker.jpg', name: 'product 4', description: 'product description', price: '21', category: 'category 4'},
    {id: 5, imageUrl: 'http://dummy-images.com/objects/dummy-900x900-Commodore64.jpg', name: 'product 5', description: 'product description', price: '210', category: 'category 5'},
  ]);

  // useEffect(() => {
  //   fetchUserData().then(data => setUser(data));
  //   fetchProductsData().then(data => setProducts(data));
  // }, []);

  return (
    <div className="body">
    <UserProfile user={user} />
    <ProductGrid products={products} />
  </div>
  );
}
