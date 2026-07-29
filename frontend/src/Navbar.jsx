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
      <nav className="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" style={{ border: 'none', background: 'transparent', marginTop: '10px' }}>
              <span className="icon-bar" style={{ background: '#fff' }}></span>
              <span className="icon-bar" style={{ background: '#fff' }}></span>
              <span className="icon-bar" style={{ background: '#fff' }}></span>
            </button>
            <Link className="navbar-brand-logo" to="/admin">
              <i className="fas fa-user-shield" style={{ color: '#A78BFA' }}></i>
              Admin Portal
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', flexWrap: 'wrap', gap: '15px' }}>
              <ul className="nav navbar-nav navbar-right" style={{ margin: 0 }}>
                <li><Link to="/admin" className="nav-link-custom"><i className="fas fa-boxes"></i> Products</Link></li>
                <li><Link to="/admin/stock" className="nav-link-custom"><i className="fas fa-warehouse"></i> Inventory Stock</Link></li>
                <li><Link to="/admin/unshipped" className="nav-link-custom"><i className="fas fa-shipping-fast"></i> Orders to Ship</Link></li>
                <li><Link to="/admin/shipped" className="nav-link-custom"><i className="fas fa-check-circle"></i> Shipped</Link></li>
                <li><button onClick={onLogout} className="nav-link-custom" style={{ background: 'none', border: 'none', color: '#F87171' }}><i className="fas fa-sign-out-alt"></i> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  if (userType === 'customer') {
    return (
      <nav className="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" style={{ border: 'none', background: 'transparent', marginTop: '10px' }}>
              <span className="icon-bar" style={{ background: '#fff' }}></span>
              <span className="icon-bar" style={{ background: '#fff' }}></span>
              <span className="icon-bar" style={{ background: '#fff' }}></span>
            </button>
            <Link className="navbar-brand-logo" to="/">
              <i className="fas fa-bolt" style={{ color: '#60A5FA' }}></i>
              Electronics Store
              <span className="badge-logo">PRO</span>
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '15px' }}>
              <form className="navbar-form" onSubmit={handleSearchSubmit} style={{ border: 'none', boxShadow: 'none', margin: 0, padding: 0 }}>
                <div className="search-container-premium">
                  <i className="fas fa-search search-icon-btn"></i>
                  <input
                    type="text"
                    className="search-input-premium"
                    placeholder="Search gadgets, accessories..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    required
                  />
                </div>
              </form>

              <ul className="nav navbar-nav navbar-right" style={{ margin: 0 }}>
                <li><Link to="/" className="nav-link-custom"><i className="fas fa-store"></i> Products</Link></li>
                <li className="dropdown">
                  <a className="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
                    <i className="fas fa-th-large"></i> Categories <span className="caret"></span>
                  </a>
                <ul className="dropdown-menu" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.1)', borderRadius: '12px', padding: '8px 0' }}>
                  <li><Link to="/?type=mobile" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-mobile-alt" style={{ color: '#2563eb', marginRight: '8px' }}></i> Mobiles</Link></li>
                  <li><Link to="/?type=tv" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-tv" style={{ color: '#2563eb', marginRight: '8px' }}></i> TVs</Link></li>
                  <li><Link to="/?type=laptop" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-laptop" style={{ color: '#2563eb', marginRight: '8px' }}></i> Laptops</Link></li>
                  <li><Link to="/?type=camera" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-camera" style={{ color: '#2563eb', marginRight: '8px' }}></i> Cameras</Link></li>
                  <li><Link to="/?type=speaker" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-volume-up" style={{ color: '#2563eb', marginRight: '8px' }}></i> Speakers</Link></li>
                  <li><Link to="/?type=tablet" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-tablet-alt" style={{ color: '#2563eb', marginRight: '8px' }}></i> Tablets</Link></li>
                </ul>
                </li>
                <li>
                  <Link to="/cart" className="nav-link-custom">
                    <i className="fas fa-shopping-bag"></i> Cart
                    {cartCount > 0 && <span className="cart-badge-counter">{cartCount}</span>}
                  </Link>
                </li>
                <li><Link to="/orders" className="nav-link-custom"><i className="fas fa-box"></i> Orders</Link></li>
                <li><Link to="/profile" className="nav-link-custom"><i className="fas fa-user-circle"></i> Profile</Link></li>
                <li><button onClick={onLogout} className="nav-link-custom" style={{ background: 'none', border: 'none', color: '#F87171' }}><i className="fas fa-sign-out-alt"></i> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // GUEST HEADER
  return (
    <nav className="navbar navbar-default navbar-fixed-top glass-navbar navbar-custom">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#myNavbar" style={{ border: 'none', background: 'transparent', marginTop: '10px' }}>
            <span className="icon-bar" style={{ background: '#fff' }}></span>
            <span className="icon-bar" style={{ background: '#fff' }}></span>
            <span className="icon-bar" style={{ background: '#fff' }}></span>
          </button>
          <Link className="navbar-brand-logo" to="/">
            <i className="fas fa-bolt" style={{ color: '#60A5FA' }}></i>
            Electronics Store
            <span className="badge-logo">PRO</span>
          </Link>
        </div>

        <div className="collapse navbar-collapse" id="myNavbar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '15px' }}>
            <form className="navbar-form" onSubmit={handleSearchSubmit} style={{ border: 'none', boxShadow: 'none', margin: 0, padding: 0 }}>
              <div className="search-container-premium">
                <i className="fas fa-search search-icon-btn"></i>
                <input
                  type="text"
                  className="search-input-premium"
                  placeholder="Search laptops, phones, audio..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  required
                />
              </div>
            </form>

            <ul className="nav navbar-nav navbar-right" style={{ margin: 0 }}>
              <li><Link to="/" className="nav-link-custom"><i className="fas fa-store"></i> Products</Link></li>
              <li className="dropdown">
                <a className="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#">
                  <i className="fas fa-th-large"></i> Categories <span className="caret"></span>
                </a>
                <ul className="dropdown-menu" style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.1)', borderRadius: '12px', padding: '8px 0' }}>
                  <li><Link to="/?type=mobile" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-mobile-alt" style={{ color: '#2563eb', marginRight: '8px' }}></i> Mobiles</Link></li>
                  <li><Link to="/?type=tv" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-tv" style={{ color: '#2563eb', marginRight: '8px' }}></i> TVs</Link></li>
                  <li><Link to="/?type=laptop" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-laptop" style={{ color: '#2563eb', marginRight: '8px' }}></i> Laptops</Link></li>
                  <li><Link to="/?type=camera" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-camera" style={{ color: '#2563eb', marginRight: '8px' }}></i> Cameras</Link></li>
                  <li><Link to="/?type=speaker" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-volume-up" style={{ color: '#2563eb', marginRight: '8px' }}></i> Speakers</Link></li>
                  <li><Link to="/?type=tablet" style={{ color: '#0f172a', padding: '8px 16px', fontWeight: 500 }}><i className="fas fa-tablet-alt" style={{ color: '#2563eb', marginRight: '8px' }}></i> Tablets</Link></li>
                </ul>
              </li>
              <li><Link to="/login" className="nav-link-custom"><i className="fas fa-sign-in-alt"></i> Login</Link></li>
              <li>
                <Link to="/register" className="btn-premium-primary" style={{ padding: '8px 18px', color: '#fff' }}>
                  <i className="fas fa-user-plus"></i> Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
