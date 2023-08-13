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
    result = result.filter(product => product.category === filter.category);
  }

  //price filter
  if (filter.price !== 'All') {
    switch(filter.price) {
      case "50":
        result = result.filter(product => product.price < 50);
        break;
      case "50-100":
        result = result.filter(product => product.price >= 50 && product.price <= 100);
        break;
      case "100-500":
        result = result.filter(product => product.price >= 100 && product.price <= 500);
        break;
      case "500-1000":
        result = result.filter(product => product.price >= 500 && product.price <= 1000);
        break;
    }
  }

  setFilteredProducts(result);
}, [products, filter]);

  return (
    <div className="all-products-container">
     
      {/* <h3 className="filter-header">Filter</h3> */}
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
                <img className="product-img" src={product['imageUrl']} alt={product['ProductName']} />
                <div className='product-details'>
                  <p>Category: {product['category']} </p>
                  <p>Name: {product['name']} </p>
                  <p>Description: {product['description']}</p>
                  <p className="product-price">Price: ${product['price']}</p>
                  </div>
                </li>
              ))}
          </ul>
    </div>
  );
};

export default AllProducts;
