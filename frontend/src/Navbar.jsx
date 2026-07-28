import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, cartCount, onSearch, onLogout }) {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput.trim())}`);
      if (onSearch) onSearch(searchInput.trim());
    }
  };

  const userType = user ? user.usertype : null;

  if (userType === 'admin') {
    return (
      <nav class="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" style={{ border: 'none', background: 'transparent', marginTop: '10px' }}>
              <span class="icon-bar" style={{ background: '#fff' }}></span>
              <span class="icon-bar" style={{ background: '#fff' }}></span>
              <span class="icon-bar" style={{ background: '#fff' }}></span>
            </button>
            <Link class="navbar-brand-logo" to="/admin">
              <i class="fas fa-user-shield" style={{ color: '#A78BFA' }}></i>
              Admin Portal
            </Link>
          </div>

          <div class="collapse navbar-collapse" id="myNavbar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', flexWrap: 'wrap', gap: '15px' }}>
              <ul class="nav navbar-nav navbar-right" style={{ margin: 0 }}>
                <li><Link to="/admin" class="nav-link-custom"><i class="fas fa-boxes"></i> Products</Link></li>
                <li><Link to="/admin/stock" class="nav-link-custom"><i class="fas fa-warehouse"></i> Inventory Stock</Link></li>
                <li><Link to="/admin/unshipped" class="nav-link-custom"><i class="fas fa-shipping-fast"></i> Orders to Ship</Link></li>
                <li><Link to="/admin/shipped" class="nav-link-custom"><i class="fas fa-check-circle"></i> Shipped</Link></li>
                <li><button onClick={onLogout} class="nav-link-custom" style={{ background: 'none', border: 'none', color: '#F87171' }}><i class="fas fa-sign-out-alt"></i> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (userType === 'customer') {
    return (
      <nav class="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" style={{ border: 'none', background: 'transparent', marginTop: '10px' }}>
              <span class="icon-bar" style={{ background: '#fff' }}></span>
              <span class="icon-bar" style={{ background: '#fff' }}></span>
              <span class="icon-bar" style={{ background: '#fff' }}></span>
            </button>
            <Link class="navbar-brand-logo" to="/">
              <i class="fas fa-bolt" style={{ color: '#60A5FA' }}></i>
              Electronics Store
              <span class="badge-logo">PRO</span>
            </Link>
          </div>

          <div class="collapse navbar-collapse" id="myNavbar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '15px' }}>
              <form class="navbar-form" onSubmit={handleSearchSubmit} style={{ border: 'none', boxShadow: 'none', margin: 0, padding: 0 }}>
                <div class="search-container-premium">
                  <i class="fas fa-search search-icon-btn"></i>
                  <input
                    type="text"
                    class="search-input-premium"
                    placeholder="Search gadgets, accessories..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                  />
                </div>
              </form>

              <ul class="nav navbar-nav navbar-right" style={{ margin: 0 }}>
                <li><Link to="/" class="nav-link-custom"><i class="fas fa-store"></i> Products</Link></li>
                <li class="dropdown">
                  <a class="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
                    <i class="fas fa-th-large"></i> Categories <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu glass-card" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <li><Link to="/?type=mobile" style={{ color: '#fff' }}><i class="fas fa-mobile-alt"></i> Mobiles</Link></li>
                    <li><Link to="/?type=tv" style={{ color: '#fff' }}><i class="fas fa-tv"></i> TVs</Link></li>
                    <li><Link to="/?type=laptop" style={{ color: '#fff' }}><i class="fas fa-laptop"></i> Laptops</Link></li>
                    <li><Link to="/?type=camera" style={{ color: '#fff' }}><i class="fas fa-camera"></i> Cameras</Link></li>
                    <li><Link to="/?type=speaker" style={{ color: '#fff' }}><i class="fas fa-volume-up"></i> Speakers</Link></li>
                    <li><Link to="/?type=tablet" style={{ color: '#fff' }}><i class="fas fa-tablet-alt"></i> Tablets</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/cart" class="nav-link-custom">
                    <i class="fas fa-shopping-bag"></i> Cart
                    {cartCount > 0 && <span class="cart-badge-counter">{cartCount}</span>}
                  </Link>
                </li>
                <li><Link to="/orders" class="nav-link-custom"><i class="fas fa-box"></i> Orders</Link></li>
                <li><Link to="/profile" class="nav-link-custom"><i class="fas fa-user-circle"></i> Profile</Link></li>
                <li><button onClick={onLogout} class="nav-link-custom" style={{ background: 'none', border: 'none', color: '#F87171' }}><i class="fas fa-sign-out-alt"></i> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // GUEST HEADER
  return (
    <nav class="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" style={{ border: 'none', background: 'transparent', marginTop: '10px' }}>
            <span class="icon-bar" style={{ background: '#fff' }}></span>
            <span class="icon-bar" style={{ background: '#fff' }}></span>
            <span class="icon-bar" style={{ background: '#fff' }}></span>
          </button>
          <Link class="navbar-brand-logo" to="/">
            <i class="fas fa-bolt" style={{ color: '#60A5FA' }}></i>
            Electronics Store
            <span class="badge-logo">PRO</span>
          </Link>
        </div>

        <div class="collapse navbar-collapse" id="myNavbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '15px' }}>
            <form class="navbar-form" onSubmit={handleSearchSubmit} style={{ border: 'none', boxShadow: 'none', margin: 0, padding: 0 }}>
              <div class="search-container-premium">
                <i class="fas fa-search search-icon-btn"></i>
                <input
                  type="text"
                  class="search-input-premium"
                  placeholder="Search laptops, phones, audio..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  required
                />
              </div>
            </form>

            <ul class="nav navbar-nav navbar-right" style={{ margin: 0 }}>
              <li><Link to="/" class="nav-link-custom"><i class="fas fa-store"></i> Products</Link></li>
              <li class="dropdown">
                <a class="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
                  <i class="fas fa-th-large"></i> Categories <span class="caret"></span>
                </a>
                <ul class="dropdown-menu glass-card" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <li><Link to="/?type=mobile" style={{ color: '#fff' }}><i class="fas fa-mobile-alt"></i> Mobiles</Link></li>
                  <li><Link to="/?type=tv" style={{ color: '#fff' }}><i class="fas fa-tv"></i> TVs</Link></li>
                  <li><Link to="/?type=laptop" style={{ color: '#fff' }}><i class="fas fa-laptop"></i> Laptops</Link></li>
                  <li><Link to="/?type=camera" style={{ color: '#fff' }}><i class="fas fa-camera"></i> Cameras</Link></li>
                  <li><Link to="/?type=speaker" style={{ color: '#fff' }}><i class="fas fa-volume-up"></i> Speakers</Link></li>
                  <li><Link to="/?type=tablet" style={{ color: '#fff' }}><i class="fas fa-tablet-alt"></i> Tablets</Link></li>
                </ul>
              </li>
              <li><Link to="/login" class="nav-link-custom"><i class="fas fa-sign-in-alt"></i> Login</Link></li>
              <li>
                <Link to="/register" class="btn-premium-primary" style={{ padding: '8px 18px', color: '#fff' }}>
                  <i class="fas fa-user-plus"></i> Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
