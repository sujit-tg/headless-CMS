import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleProduct.css';
import { useCart } from '../context/CartContext';


const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();


  const API_URL = `https://gos-testing.tantra-gyan.com/wp-json/wc/v3/products/${id}`;
  const CONSUMER_KEY = 'ck_bcde0446325fb4b146e2607ecc23f0cab1cfc5ef';
  const CONSUMER_SECRET = 'cs_c336466917442d6c696a5f3f26cdc32635f9e0d0';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `${API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching single product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="loading-text">Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  const featuredImage =
    product?.images?.length > 0
      ? product.images[0].src
      : 'https://via.placeholder.com/400x400?text=No+Image';

  return (
    <div className="single-product-container">
      <Link to="/products" className="back-button">← Back to Products</Link>

      
      <Link to="/cart" className="floating-cart">🛒 Cart</Link>


      <div className="product-details">
        <div className="product-image-section">
          <img src={featuredImage} alt={product.name} className="single-product-image" />
        </div>

        <div className="product-info-section">
          <h1 className="single-product-title">{product.name}</h1>

          <p className="single-product-category">
            Category: {product.categories?.[0]?.name || 'Uncategorized'}
          </p>

          <p className="single-product-price">
            {product.price ? `₹${product.price}` : 'Price not available'}
          </p>

          <button
  className="add-to-cart-btn"
  onClick={() => {
    console.log('Adding to cart:', product);
    addToCart(product);
  }}
>
  🛒 Add to Cart
</button>



          <div
            className="single-product-short-desc"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />

          <div
            className="single-product-desc"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="single-product-meta">
            <h3>Additional Information</h3>
            <ul>
              <li><strong>SKU:</strong> {product.sku || 'N/A'}</li>
              <li><strong>Stock Status:</strong> {product.stock_status}</li>
              <li><strong>Weight:</strong> {product.weight || 'N/A'}</li>
              <li>
                <strong>Dimensions:</strong>{' '}
                {product.dimensions?.length || 'N/A'} x {product.dimensions?.width || 'N/A'} x {product.dimensions?.height || 'N/A'}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
