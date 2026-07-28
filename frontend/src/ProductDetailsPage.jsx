import React from 'react';
import { useParams, Link } from 'react-router-dom';

const MOCK_PRODUCTS = [
  { pid: 'P20230423084161', pname: 'MacBook Pro M3 Max 16-inch', ptype: 'laptop', pinfo: 'Apple M3 Max chip with 16-core CPU and 40-core GPU, 48GB Unified Memory, 1TB SSD Storage. Features Liquid Retina XDR display, up to 22 hours of battery life, and 1080p FaceTime HD camera.', pprice: 249999.00, pquantity: 15 },
  { pid: 'P20230423084162', pname: 'iPhone 15 Pro Max 256GB Titanium', ptype: 'mobile', pinfo: 'Titanium design with A17 Pro chip, Action Button, 48MP Main Camera, 5x Telephoto lens, Super Retina XDR display with ProMotion.', pprice: 149900.00, pquantity: 25 },
  { pid: 'P20230423084163', pname: 'Samsung 65-inch Neo QLED 4K Smart TV', ptype: 'tv', pinfo: 'Quantum Matrix Technology with Mini LED, Neural Quantum Processor 4K, Dolby Atmos audio, Motion Xcelerator Turbo+ for gaming.', pprice: 119990.00, pquantity: 10 },
  { pid: 'P20230423084164', pname: 'Sony Alpha 7 IV Full-Frame Camera', ptype: 'camera', pinfo: '33MP Exmor R CMOS Sensor, BIONZ XR Processor, 4K 60p Video Recording, Real-time Eye AF for humans, animals, and birds.', pprice: 214990.00, pquantity: 8 },
  { pid: 'P20230423084165', pname: 'Bose QuietComfort Ultra Headphones', ptype: 'speaker', pinfo: 'World-class noise cancellation, Immersive Audio, CustomTune technology, 24-hour battery life, plush ear cushions.', pprice: 34900.00, pquantity: 30 },
  { pid: 'P20230423084166', pname: 'Apple iPad Pro 12.9-inch M2 256GB', ptype: 'tablet', pinfo: 'Liquid Retina XDR display, M2 chip, Pro camera system, Thunderbolt port, Apple Pencil hover feature.', pprice: 112900.00, pquantity: 12 }
];

export default function ProductDetailsPage({ cart, onAddToCart, onRemoveFromCart }) {
  const { id } = useParams();
  const product = MOCK_PRODUCTS.find(p => p.pid === id) || MOCK_PRODUCTS[0];
  const qty = cart[product.pid] || 0;

  const relatedProducts = MOCK_PRODUCTS.filter(p => p.ptype === product.ptype && p.pid !== product.pid).slice(0, 3);

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '60px' }}>
      {/* Breadcrumb Navigation */}
      <ul className="breadcrumb" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' }}>
        <li><Link to="/" style={{ color: 'var(--primary)' }}><i className="fas fa-home"></i> Home</Link></li>
        <li><Link to={`/?type=${product.ptype}`} style={{ color: 'var(--primary)', textTransform: 'capitalize' }}>{product.ptype}</Link></li>
        <li className="active" style={{ color: 'var(--text-muted)' }}>{product.pname}</li>
      </ul>

      <div className="row">
        {/* Product Image Section */}
        <div className="col-md-6 col-sm-12">
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <span className="product-tag-category" style={{ top: '20px', left: '20px', fontSize: '13px', padding: '6px 14px' }}>{product.ptype}</span>
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80" alt={product.pname} style={{ maxHeight: '380px', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px', margin: '20px 0' }} />
          </div>
        </div>

        {/* Product Details Info Section */}
        <div className="col-md-6 col-sm-12">
          <div style={{ padding: '10px 0' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-heading)', marginTop: 0, lineHeight: 1.3 }}>
              {product.pname}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '15px 0' }}>
              <div style={{ color: 'var(--warning)', fontSize: '15px', fontWeight: 600 }}>
                <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i> 4.8 (128 reviews)
              </div>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '14px' }}>
                <i className="fas fa-check-circle"></i> In Stock ({product.pquantity} units)
              </span>
            </div>

            <div style={{ margin: '25px 0', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Price</span>
              <div style={{ fontSize: '36px', fontWeight: 800, color: 'var(--accent)' }}>
                <span style={{ fontSize: '22px', marginRight: '4px' }}>Rs.</span>{product.pprice.toFixed(2)}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Inclusive of all taxes. Free shipping included.</p>
            </div>

            {/* Product Description */}
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '10px' }}>Technical Overview</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7 }}>
                {product.pinfo}
              </p>
            </div>

            {/* Action Buttons */}
            <div>
              {qty === 0 ? (
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button onClick={() => onAddToCart(product.pid, 1)} className="btn-premium-primary" style={{ padding: '14px 32px !important', fontSize: '16px !important', flex: 1 }}>
                    <i className="fas fa-cart-plus"></i> Add to Cart
                  </button>
                  <Link to="/cart" onClick={() => onAddToCart(product.pid, 1)} className="btn-premium-secondary" style={{ padding: '14px 28px !important', fontSize: '16px !important', textAlign: 'center', lineHeight: '2.2' }}>
                    <i className="fas fa-bolt"></i> Buy Now
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button onClick={() => onRemoveFromCart(product.pid)} className="btn-premium-danger" style={{ padding: '14px 28px !important', fontSize: '16px !important' }}>
                    <i className="fas fa-trash-alt"></i> Remove from Cart
                  </button>
                  <Link to="/cart" className="btn-premium-primary" style={{ padding: '14px 32px !important', fontSize: '16px !important', flex: 1, textAlign: 'center', lineHeight: '2.2' }}>
                    <i className="fas fa-shopping-bag"></i> Proceed to Checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '60px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>
            <i className="fas fa-tags" style={{ color: 'var(--secondary)' }}></i> Similar {product.ptype} Devices
          </h3>

          <div className="row">
            {relatedProducts.map(rel => (
              <div key={rel.pid} className="col-md-4 col-sm-6">
                <div className="product-card-premium">
                  <div className="product-img-wrapper">
                    <span className="product-tag-category">{rel.ptype}</span>
                    <Link to={`/product/${rel.pid}`}>
                      <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" alt={rel.pname} />
                    </Link>
                  </div>
                  <div className="product-title-premium">
                    <Link to={`/product/${rel.pid}`} style={{ color: 'var(--text-heading)', textDecoration: 'none' }}>
                      {rel.pname}
                    </Link>
                  </div>
                  <div className="product-price-row">
                    <span className="product-price-amount">Rs. {rel.pprice.toFixed(2)}</span>
                    <Link to={`/product/${rel.pid}`} className="btn-premium-secondary" style={{ padding: '6px 14px !important', fontSize: '12px !important' }}>
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
