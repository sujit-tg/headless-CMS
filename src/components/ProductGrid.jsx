import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductGrid.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("badminton");

  const API_URL = 'https://gos-testing.tantra-gyan.com/wp-json/wc/v3/products';
  const CONSUMER_KEY = 'ck_bcde0446325fb4b146e2607ecc23f0cab1cfc5ef';
  const CONSUMER_SECRET = 'cs_c336466917442d6c696a5f3f26cdc32635f9e0d0';

  // Define your main categories with IDs
  const mainCategories = [
    { name: "Badminton", slug: "badminton", id: 3416 },
    { name: "Padel", slug: "padel", id: 3625 },
    { name: "Table Tennis", slug: "table-tennis", id: 3733 },
    { name: "Pickleball", slug: "pickleball", id: 3690 },
    { name: "Squash", slug: "squash", id: 3717 },
  ];

  // Fetch products based on category/tag ID
  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&category=${categoryId}`
      );

      if (!res.ok) {
        throw new Error(`Error fetching products: ${res.status}`);
      }

      const data = await res.json();
      console.log(`Fetched products for category ID ${categoryId}:`, data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch (default category: badminton)
  useEffect(() => {
    const defaultCategory = mainCategories.find(
      (cat) => cat.slug === activeCategory
    );
    if (defaultCategory) fetchProducts(defaultCategory.id);
  }, []);

  // When category changes
  useEffect(() => {
    const selectedCategory = mainCategories.find(
      (cat) => cat.slug === activeCategory
    );
    if (selectedCategory) fetchProducts(selectedCategory.id);
  }, [activeCategory]);

  return (
    <div className="product-grid-container">
      <h2 className="product-grid-title"> Shop by Category</h2>

      {/* Category Buttons */}
      <div className="category-buttons">
        {mainCategories.map((cat) => (
          <button
            key={cat.slug}
            className={`category-btn ${activeCategory === cat.slug ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <Link to="/form" className="form-button"> form </Link>
      <Link to="/cart" className="floating-cart">🛒 Cart</Link>
      <Link to="/" className="back-btn">Home</Link>

      {/* Product Slider */}
      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <div className="product-slider">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.images[0]?.src || "https://via.placeholder.com/300x300?text=No+Image"}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-title">{product.name}</h3>
                <p className="product-category">
                  {product.categories[0]?.name || "Uncategorized"}
                </p>
                <p className="product-price">
                  {product.price ? `₹${product.price}` : "No price available"}
                </p>
                <Link to={`/product/${product.id}`} className="product-link">
                  View Product
                </Link>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
