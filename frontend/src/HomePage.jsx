import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { pid: 'P20230423084161', pname: 'MacBook Pro M3 Max 16-inch', ptype: 'laptop', pinfo: 'Apple M3 Max chip with 16-core CPU and 40-core GPU, 48GB Unified Memory, 1TB SSD Storage.', pprice: 249999.00, pquantity: 15, image: 'laptop.png' },
  { pid: 'P20230423084162', pname: 'iPhone 15 Pro Max 256GB Titanium', ptype: 'mobile', pinfo: 'Titanium design with A17 Pro chip, Action Button, 48MP Main Camera, 5x Telephoto lens.', pprice: 149900.00, pquantity: 25, image: 'phone1.jpg' },
  { pid: 'P20230423084163', pname: 'Samsung 65-inch Neo QLED 4K Smart TV', ptype: 'tv', pinfo: 'Quantum Matrix Technology with Mini LED, Neural Quantum Processor 4K, Dolby Atmos audio.', pprice: 119990.00, pquantity: 10, image: 'tv.jpg' },
  { pid: 'P20230423084164', pname: 'Sony Alpha 7 IV Full-Frame Camera', ptype: 'camera', pinfo: '33MP Exmor R CMOS Sensor, BIONZ XR Processor, 4K 60p Video Recording, Real-time Eye AF.', pprice: 214990.00, pquantity: 8, image: 'camera.jpg' },
  { pid: 'P20230423084165', pname: 'Bose QuietComfort Ultra Headphones', ptype: 'speaker', pinfo: 'World-class noise cancellation, Immersive Audio, CustomTune technology, 24-hour battery life.', pprice: 34900.00, pquantity: 30, image: 'speaker.jpg' },
  { pid: 'P20230423084166', pname: 'Apple iPad Pro 12.9-inch M2 256GB', ptype: 'tablet', pinfo: 'Liquid Retina XDR display, M2 chip, Pro camera system, Thunderbolt port, Apple Pencil support.', pprice: 112900.00, pquantity: 12, image: 'tablet.png' }
];

export default function HomePage({ cart, onAddToCart, onRemoveFromCart }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search');
  const typeParam = queryParams.get('type');

  let filteredProducts = MOCK_PRODUCTS;
  let headerMessage = "Featured Electronics";

  if (searchParam) {
    filteredProducts = MOCK_PRODUCTS.filter(p => 
      p.pname.toLowerCase().includes(searchParam.toLowerCase()) || 
      p.ptype.toLowerCase().includes(searchParam.toLowerCase()) ||
      p.pinfo.toLowerCase().includes(searchParam.toLowerCase())
    );
    headerMessage = `Results for '${searchParam}'`;
  } else if (typeParam) {
    filteredProducts = MOCK_PRODUCTS.filter(p => p.ptype.toLowerCase() === typeParam.toLowerCase());
    headerMessage = `${typeParam.toUpperCase()} Collection`;
  }

  if (filteredProducts.length === 0) {
    filteredProducts = MOCK_PRODUCTS;
    headerMessage = `No items found for '${searchParam || typeParam}' - Showing All Products`;
  }

  const getCartQuantity = (pid) => {
    return cart[pid] || 0;
  };

  return (
    <div style={{ marginTop: '70px' }}>
      {/* Hero Banner Section */}
      <section class="hero-section-premium animate-fade-in">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-7 col-sm-12">
              <div class="hero-pill-badge">
                <i class="fas fa-fire" style={{ color: '#F59E0B' }}></i> Summer Sale - Extra 15% OFF
              </div>
              <h1 class="hero-title">
                Next-Gen Electronics.<br/>Designed for Power.
              </h1>
              <p class="hero-subtitle">
                Discover cutting-edge smartphones, ultra-thin laptops, smart TVs, and pro audio gear engineered for peak performance.
              </p>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href="#catalog" class="btn-premium-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
                  <i class="fas fa-shopping-bag"></i> Explore Catalog
                </a>
                <Link to="/?type=laptop#catalog" class="btn-premium-secondary" style={{ padding: '12px 24px', fontSize: '15px' }}>
                  <i class="fas fa-laptop"></i> View Laptops
                </Link>
              </div>
            </div>
            <div class="col-md-5 col-sm-12 hidden-xs text-center">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{ width: '280px', height: '280px', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(124, 58, 237, 0.2))', borderRadius: '50%', filter: 'blur(30px)', position: 'absolute', top: 0, left: 0 }}></div>
                <i class="fas fa-laptop-code" style={{ fontSize: '160px', color: 'rgba(255,255,255,0.9)', position: 'relative', zIndex: 2, textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <div class="container">
        <div class="features-bar-premium">
          <div class="feature-box-premium">
            <div class="feature-icon-wrapper">
              <i class="fas fa-shipping-fast"></i>
            </div>
            <div>
              <h4 class="feature-title">Free Express Shipping</h4>
              <p class="feature-desc">On orders over Rs. 999 across India</p>
            </div>
          </div>

          <div class="feature-box-premium">
            <div class="feature-icon-wrapper" style={{ color: 'var(--secondary)', background: 'rgba(124, 58, 237, 0.1)' }}>
              <i class="fas fa-shield-alt"></i>
            </div>
            <div>
              <h4 class="feature-title">100% Brand Guarantee</h4>
              <p class="feature-desc">Authentic products with warranty</p>
            </div>
          </div>

          <div class="feature-box-premium">
            <div class="feature-icon-wrapper" style={{ color: 'var(--accent)', background: 'rgba(6, 182, 212, 0.1)' }}>
              <i class="fas fa-undo-alt"></i>
            </div>
            <div>
              <h4 class="feature-title">7-Day Easy Returns</h4>
              <p class="feature-desc">Hassle-free replacement policy</p>
            </div>
          </div>

          <div class="feature-box-premium">
            <div class="feature-icon-wrapper" style={{ color: 'var(--success)', background: 'rgba(16, 185, 129, 0.1)' }}>
              <i class="fas fa-headset"></i>
            </div>
            <div>
              <h4 class="feature-title">24/7 Dedicated Support</h4>
              <p class="feature-desc">Instant customer assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Catalog */}
      <div class="container" id="catalog" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '25px', gap: '15px' }}>
          <div>
            <h2 style={{ fontSize: '28px', margin: 0, textTransform: 'capitalize' }}>{headerMessage}</h2>
            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '14px' }}>Handpicked high-tech products for your modern lifestyle</p>
          </div>

          {/* Category Filter Pills */}
          <div class="category-filter-bar" style={{ marginBottom: 0 }}>
            <Link to="/" class={`cat-pill-btn ${!typeParam && !searchParam ? 'cat-pill-active' : ''}`}>
              <i class="fas fa-border-all"></i> All
            </Link>
            <Link to="/?type=mobile" class={`cat-pill-btn ${typeParam === 'mobile' ? 'cat-pill-active' : ''}`}>
              <i class="fas fa-mobile-alt"></i> Mobiles
            </Link>
            <Link to="/?type=laptop" class={`cat-pill-btn ${typeParam === 'laptop' ? 'cat-pill-active' : ''}`}>
              <i class="fas fa-laptop"></i> Laptops
            </Link>
            <Link to="/?type=tv" class={`cat-pill-btn ${typeParam === 'tv' ? 'cat-pill-active' : ''}`}>
              <i class="fas fa-tv"></i> TVs
            </Link>
            <Link to="/?type=speaker" class={`cat-pill-btn ${typeParam === 'speaker' ? 'cat-pill-active' : ''}`}>
              <i class="fas fa-volume-up"></i> Audio
            </Link>
            <Link to="/?type=camera" class={`cat-pill-btn ${typeParam === 'camera' ? 'cat-pill-active' : ''}`}>
              <i class="fas fa-camera"></i> Cameras
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div class="row">
          {filteredProducts.map(product => {
            const qty = getCartQuantity(product.pid);
            return (
              <div key={product.pid} class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                <div class="product-card-premium">
                  <div class="product-img-wrapper">
                    <span class="product-tag-category">{product.ptype}</span>
                    <Link to={`/product/${product.pid}`}>
                      <img src={`/images/${product.image}`} alt={product.pname} loading="lazy" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'; }} />
                    </Link>
                  </div>

                  <div class="product-title-premium">
                    <Link to={`/product/${product.pid}`} style={{ color: 'var(--text-heading)', textDecoration: 'none' }}>
                      {product.pname}
                    </Link>
                  </div>

                  <div class="product-desc-premium">
                    {product.pinfo.length > 90 ? `${product.pinfo.substring(0, 90)}...` : product.pinfo}
                  </div>

                  <div class="product-price-row">
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>Price</span>
                      <span class="product-price-amount">
                        <span class="product-price-currency">Rs.</span>{product.pprice.toFixed(2)}
                      </span>
                    </div>
                    <div style={{ color: 'var(--warning)', fontSize: '13px', fontWeight: 600 }}>
                      <i class="fas fa-star"></i> 4.8
                    </div>
                  </div>

                  <div class="product-btn-group">
                    {qty === 0 ? (
                      <>
                        <button onClick={() => onAddToCart(product.pid, 1)} class="btn-premium-secondary">
                          <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <Link to="/cart" onClick={() => onAddToCart(product.pid, 1)} class="btn-premium-primary" style={{ textAlign: 'center', lineHeight: '2.4' }}>
                          <i class="fas fa-bolt"></i> Buy Now
                        </Link>
                      </>
                    ) : (
                      <>
                        <button onClick={() => onRemoveFromCart(product.pid)} class="btn-premium-danger">
                          <i class="fas fa-trash-alt"></i> Remove
                        </button>
                        <Link to="/cart" class="btn-premium-primary" style={{ textAlign: 'center', lineHeight: '2.4' }}>
                          <i class="fas fa-shopping-bag"></i> Checkout
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
