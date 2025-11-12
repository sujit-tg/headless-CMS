import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/products" className="back-to-shop">← Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart 🛍️</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.images?.[0]?.src || 'https://via.placeholder.com/80'}
              alt={item.name}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Total: ₹{totalPrice}</h3>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
        <Link to="/" className="back-to-shop">← Continue Shopping</Link>

        <Link to="/checkout" className="checkout-link">Proceed to Checkout →</Link>

      </div>
    </div>
  );
};

export default CartPage;
