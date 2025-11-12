import './App.css';
import 'swiper/css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostSlider from './components/PostSlider';
import ProductGrid from './components/ProductGrid';
import SingleProduct from './components/SingleProduct';
import CartPage from './components/CartPage';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './components/CheckoutPage';
import MainHome from './home/MainHome';
import FormPage from './components/Forms/FormPage';



function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />}/>
        <Route path="/post" element={<PostSlider />}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductGrid />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
