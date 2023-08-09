import React, { useEffect, useState } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>Name: {product['Name']}</h3>
            <p>Description: {product ['Description']}</p>
            <p>Price: ${product['Price']}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllProducts;
