import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CheckoutPage.css';

const API_URL = 'https://gos-testing.tantra-gyan.com/wp-json/wc/v3/orders';
  const CONSUMER_KEY = 'ck_bcde0446325fb4b146e2607ecc23f0cab1cfc5ef';
  const CONSUMER_SECRET = 'cs_c336466917442d6c696a5f3f26cdc32635f9e0d0';

const CheckoutPage = () => {
  const { cartItems, clearCart, totalPrice } = useCart();
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address_1: '',
    city: '',
    country: 'IN',
  });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleOrder = async () => {
    setLoading(true);
    setError(null);

    // Prepare line items from cart
    const line_items = cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const orderData = {
      payment_method: 'bacs',
      payment_method_title: 'Direct Bank Transfer',
      set_paid: false, // change to true if you want to auto-mark as paid
      billing: customer,
      shipping: customer,
      line_items,
    };

    try {
      const response = await fetch(
        `${API_URL}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      console.log('Order created:', data);
      setOrderSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-container">
        <h2>✅ Order placed successfully!</h2>
        <p>Thank you for your purchase.</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout 🧾</h2>

      <div className="checkout-form">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={customer.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={customer.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address_1"
          placeholder="Address"
          value={customer.address_1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="checkout-summary">
        <h3>Total: ₹{totalPrice}</h3>
        <button
          onClick={handleOrder}
          disabled={loading || cartItems.length === 0}
          className="checkout-btn"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default CheckoutPage;
