import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import './AllProducts.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    category: 'All',
    price: 'All'
});

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const productsRef = child(dbRef, 'Products');

    get(productsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const productsData = snapshot.val();
        const productsList = Object.values(productsData);
        setProducts(productsList);
      }
    });
}, []);

//filter
useEffect(() => { 
  let result = products;

  //category filter
  if (filter.category !== 'All') {
    result = result.filter(product => product.Category === filter.category);
  }

  //price filter
  if (filter.price !== 'All') {
    switch(filter.price) {
      case "50":
        result = result.filter(product => product.Price < 50);
        break;
      case "50-100":
        result = result.filter(product => product.Price >= 50 && product.Price <= 100);
        break;
      case "100-500":
        result = result.filter(product => product.Price >= 100 && product.Price <= 500);
        break;
      case "500-1000":
        result = result.filter(product => product.Price >= 500 && product.Price <= 1000);
        break;
    }
  }

  setFilteredProducts(result);
}, [products, filter]);

  return (
    <div className="all-products-container">
      <h2 className="products-header">All Products</h2>
      <h3 className="filter-header">Filter</h3>
        <div className="filter-section">
          <select name="category" onChange={e => setFilter(prev => ({ ...prev, category: e.target.value }))}>
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Toy">Toy</option>
            <option value="Clothing">Clothing</option>
          </select>
          <select name="price" onChange={e => setFilter(prev => ({ ...prev, price: e.target.value }))}>
            <option value="All">All Prices</option>
            <option value="50">Under 50</option>
            <option value="50-100">50 to 100</option>
            <option value="100-500">100 to 500</option>
            <option value="500-1000">500 to 1000</option>
          </select>
        </div>
          <ul className="product-list">
            {filteredProducts.map((product) => (
              <li className="product-item" key={product.id}>
                <img className="product-img" src={product['Image']} alt={product['ProductName']} />
                  <p>Category: {product['Category']} </p>
                  <p>Name: {product['ProductName']} </p>
                  <p>Description: {product['Description']}</p>
                  <p>Price: ${product['Price']}</p>
                </li>
              ))}
          </ul>
    </div>
  );
};

export default AllProducts;
