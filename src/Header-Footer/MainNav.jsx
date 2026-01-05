
import "./main-nav.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";

const MainNav = ()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
   

    return (
    <>
      <header className="gos-header-wrapper">
        {/* TOP BAR */}
        <div className="gos-topbar">
          <div className="gos-container">

            {/* LOGO */}
            <div className="gos-logo">
              <Link to="/">
                <img
                  src="https://gos-testing.tantra-gyan.com/wp-content/uploads/2025/04/GOS-logo.png"
                  alt="God of Sports Logo"
                />
              </Link>
            </div>

            {/* SEARCH */}
            <div className="gos-search">
              <input type="text" placeholder="Search for products" />

              <Link to="/shop" aria-label="Search">
                <Search size={18} />
              </Link>
            </div>

            {/* ICONS */}
            <div className="gos-icons">
              <button className="icon-btn desktop-only">
                <User size={20} />
              </button>

              <button className="icon-btn badge-wrap desktop-only">
                <Heart size={20} />
                <span className="badge">0</span>
              </button>

              <button
                className="icon-btn mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={24} />
              </button>

              {/* CART ICON */}
              <button
                className="icon-btn badge-wrap"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                <span className="badge">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* NAV MENU */}
        <nav className={`gos-nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="gos-nav-list">
            <li>BADMINTON <ChevronDown size={14} /></li>
            <li>TENNIS <ChevronDown size={14} /></li>
            <li>PADEL <ChevronDown size={14} /></li>
            <li>PICKLEBALL <ChevronDown size={14} /></li>
            <li>SQUASH <ChevronDown size={14} /></li>
            <li>BACKPACKS</li>
            <li>SPORTOPEDIA <ChevronDown size={14} /></li>
          </ul>
        </nav>
      </header>

      {/* CART DRAWER */}
      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-drawer-body">
          {/* Later map cart items here */}
          <p>No items in cart</p>
        </div>

        <div className="cart-drawer-footer">
          <Link
            to="/cart"
            className="view-cart-btn"
            onClick={() => {
              setIsCartOpen(false);
             
            }}
          >
            View Cart
          </Link>
        </div>
      </div>

      {/* OVERLAY */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      )}
    </>


  );

  
};

export default MainNav;