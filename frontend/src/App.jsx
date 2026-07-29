import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import ProductDetailsPage from './ProductDetailsPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
import CartPage from './CartPage';
import PaymentPage from './PaymentPage';
import OrdersPage from './OrdersPage';
import AdminDashboardPage from './AdminDashboardPage';

import './custom_premium.css';
import './changes.css';

export default function App() {
  const [user, setUser] = useState(null); // { username: 'test', usertype: 'customer' | 'admin' }
  const [cart, setCart] = useState({});

  const handleAddToCart = (pid, qty = 1) => {
    setCart(prev => ({
      ...prev,
      [pid]: (prev[pid] || 0) + qty
    }));
  };

  const handleUpdateQty = (pid, qty) => {
    setCart(prev => ({
      ...prev,
      [pid]: qty
    }));
  };

  const handleRemoveFromCart = (pid) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[pid];
      return next;
    });
  };

  const handlePaymentComplete = () => {
    setCart({});
  };

  const handleLogout = () => {
    setUser(null);
  };

  const cartCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar user={user} cartCount={cartCount} onLogout={handleLogout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/product/:id" element={<ProductDetailsPage cart={cart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={setUser} />} />
            <Route path="/register" element={<RegisterPage onLoginSuccess={setUser} />} />
            <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
            <Route path="/cart" element={<CartPage cart={cart} onUpdateQty={handleUpdateQty} onRemove={handleRemoveFromCart} />} />
            <Route path="/payment" element={<PaymentPage onPaymentComplete={handlePaymentComplete} />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/*" element={<AdminDashboardPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
