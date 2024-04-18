import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setProducts(jsonData);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false); // Set loading to false in case of error
    }
  };

  // Function to convert price from dollars to Indonesian Rupiah
  const convertToRupiah = (priceInDollars) => {
    // Assuming 1 USD = 15,000 IDR for demonstration
    const exchangeRate = 15000;
    return priceInDollars * exchangeRate;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Toko Abel Imutzz</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="product-list">
            {products.map((product, index) => (
              <div className="product" key={index}>
                <img src={product.image} alt={product.title} />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="description">{product.description}</p>
                  <p className="price">Rp {convertToRupiah(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
