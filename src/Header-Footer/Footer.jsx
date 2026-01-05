import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.svg';
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="https://gos-testing.tantra-gyan.com/wp-content/uploads/2025/04/GOS-logo.png" alt="God of Sports Logo" className="logo-image" />
          </div>
        </div>
        <div className="footer-main">
          <div className="footer-links-container">
            <div className="footer-col">
              <ul>
                <li>Badminton</li>
                <li>Tennis</li>
                <li>Pickleball</li>
                <li>Padel</li>
                <li>Squash</li>
              </ul>
            </div>
            <div className="footer-col">
              <ul>
                <li>Sports360</li>
                <li>God's Advice</li>
              </ul>
            </div>
            <div className="footer-col-2">
              <div className="footer-col">
                <ul>
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>My Account</li>
                  <li>Wishlist</li>
                </ul>
              </div>
              <div className="footer-col">
                <ul>
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Shipping Policy</li>
                  <li>Return & Refund Policy</li>
                  <li>Order Tracking</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-newsletter">
            <h3>Newsletter! <span className="paper-plane">
              {/* <img src="#" alt="Newsletter icon" className="logo-image" /> */}
            </span></h3>
            <p>Subscribe & get exclusive offers & updates, straight to your Inbox!</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter Your Email Address" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="footer-description">
          <p>
            God of Sports provides tested racquet sports equipment with international shipping. We test gear extensively,
            publish honest reviews, and stock authentic products from leading brands. Serving badminton, pickleball,
            tennis, squash, and padel players worldwide.
          </p>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; Copyright {new Date().getFullYear()} - All Rights Reserved | Developed with :heart: by 12Grids</p>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="YouTube">:arrow_forward:</a>
          </div>
          <div className="payment-icons">
            <span className="payment-icon">VISA</span>
            <span className="payment-icon">Mastercard</span>
            <span className="payment-icon">RuPay</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;