import React from "react";
import { Link } from "react-router-dom";
import "./MainHome.css";

const MainHome = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🏸 Welcome to Our Sports Store</h1>
        <p>Explore premium gear for badminton, padel, squash, pickleball, and tennis.</p>
      </header>

      <div className="home-actions">
        <Link to="/products" className="home-btn">
          🛍️ Browse Products
        </Link>

        <Link to="/cart" className="home-btn secondary">
          🛒 View Cart
        </Link>
      </div>
    </div>
  );
};

export default MainHome;
