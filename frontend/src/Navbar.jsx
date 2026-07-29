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

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', padding: '8px 15px', flexWrap: 'wrap', gap: '15px' }}>
        
        {/* LOGO (LEFT) */}
        <Link className="navbar-brand-logo" to={userType === 'admin' ? '/admin' : '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '20px', fontWeight: 800, textDecoration: 'none' }}>
          <i className={userType === 'admin' ? "fas fa-user-shield" : "fas fa-bolt"} style={{ color: userType === 'admin' ? '#A78BFA' : '#60A5FA' }}></i>
          {userType === 'admin' ? 'Admin Portal' : 'Electronics Store'}
          {userType !== 'admin' && <span className="badge-logo" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: '#fff', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>PRO</span>}
        </Link>

        {/* SEARCH BAR (CENTER - Customers & Guests) */}
        {userType !== 'admin' && (
          <form onSubmit={handleSearchSubmit} style={{ margin: 0, flex: '1', maxWidth: '380px', minWidth: '220px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)', pointerEvents: 'none', fontSize: '13px' }}></i>
              <input
                type="text"
                placeholder="Search gadgets, accessories..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ width: '100%', height: '38px', background: 'rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '9999px', padding: '0 16px 0 40px', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
                required
              />
            </div>
          </form>
        )}

        {/* NAV ITEMS (RIGHT) */}
        <ul className="nav navbar-nav navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, flexWrap: 'wrap' }}>
          {userType === 'admin' ? (
            <>
              <li><Link to="/admin" className="nav-link-custom"><i className="fas fa-boxes"></i> Products</Link></li>
              <li><Link to="/admin/stock" className="nav-link-custom"><i className="fas fa-warehouse"></i> Inventory Stock</Link></li>
              <li><Link to="/admin/unshipped" className="nav-link-custom"><i className="fas fa-shipping-fast"></i> Orders to Ship</Link></li>
              <li><Link to="/admin/shipped" className="nav-link-custom"><i className="fas fa-check-circle"></i> Shipped</Link></li>
              <li><button onClick={onLogout} className="nav-link-custom" style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer' }}><i className="fas fa-sign-out-alt"></i> Logout</button></li>
            </>
          ) : userType === 'customer' ? (
            <>
              <li><Link to="/" className="nav-link-custom"><i className="fas fa-store"></i> Products</Link></li>
              <li className="dropdown">
                <a className="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#" style={{ cursor: 'pointer' }}>
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
                  {cartCount > 0 && <span className="cart-badge-counter" style={{ background: '#2563eb', color: '#fff', borderRadius: '9999px', padding: '2px 6px', fontSize: '11px', fontWeight: 700, marginLeft: '6px' }}>{cartCount}</span>}
                </Link>
              </li>
              <li><Link to="/orders" className="nav-link-custom"><i className="fas fa-box"></i> Orders</Link></li>
              <li><Link to="/profile" className="nav-link-custom"><i className="fas fa-user-circle" style={{ color: '#60A5FA' }}></i> My Account</Link></li>
              <li><button onClick={onLogout} className="nav-link-custom" style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer' }}><i className="fas fa-sign-out-alt"></i> Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/" className="nav-link-custom"><i className="fas fa-store"></i> Products</Link></li>
              <li className="dropdown">
                <a className="dropdown-toggle nav-link-custom" data-toggle="dropdown" href="#" style={{ cursor: 'pointer' }}>
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
            </>
          )}
        </ul>

      </div>
    </nav>
  );
}

