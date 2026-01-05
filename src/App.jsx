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
import AuthPage from './authentication/AuthPage';
import ShopPage from './components/pages/ShopPage';
import MainNav from './Header-Footer/MainNav';
import Footer from './Header-Footer/Footer';



function App() {
  return (
    
    <CartProvider>
      
    <Router>
       <MainNav/>
      <Routes>
        <Route path="/" element={<MainHome />}/>
        <Route path="/post" element={<PostSlider />}/>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductGrid />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="/shop" element={<ShopPage />}/>
      </Routes>
      <Footer/>
    </Router>
    
    </CartProvider>
  );
}

export default App;
