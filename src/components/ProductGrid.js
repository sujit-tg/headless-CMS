import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'https://gos-testing.tantra-gyan.com/wp-json/wc/v3/products';
  const CONSUMER_KEY = 'ck_bcde0446325fb4b146e2607ecc23f0cab1cfc5ef';
  const CONSUMER_SECRET = 'cs_c336466917442d6c696a5f3f26cdc32635f9e0d0';


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="loading-text">Loading products...</p>;

  return (
    <div className="product-grid-container">
      <h2 className="product-grid-title">🛍️ Our Products</h2>
    
    <Link to="/cart" className="floating-cart">🛒 Cart</Link>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.images[0]?.src || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.name}
              className="product-image"
            />

            <h3 className="product-title">{product.name}</h3>

            <p className="product-category">
              {product.categories[0]?.name || 'Uncategorized'}
            </p>

            <p className="product-price">
              {product.price ? `₹${product.price}` : 'No price available'}
            </p>

            <Link to={`/product/${product.id}`} className="product-link">
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

