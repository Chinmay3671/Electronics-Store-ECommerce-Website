import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_PRODUCTS = {
  'P20230423084161': { pid: 'P20230423084161', pname: 'MacBook Pro M3 Max 16-inch', ptype: 'laptop', pprice: 249999.00 },
  'P20230423084162': { pid: 'P20230423084162', pname: 'iPhone 15 Pro Max 256GB Titanium', ptype: 'mobile', pprice: 149900.00 },
  'P20230423084163': { pid: 'P20230423084163', pname: 'Samsung 65-inch Neo QLED 4K Smart TV', ptype: 'tv', pprice: 119990.00 },
  'P20230423084164': { pid: 'P20230423084164', pname: 'Sony Alpha 7 IV Full-Frame Camera', ptype: 'camera', pprice: 214990.00 },
  'P20230423084165': { pid: 'P20230423084165', pname: 'Bose QuietComfort Ultra Headphones', ptype: 'speaker', pprice: 34900.00 },
  'P20230423084166': { pid: 'P20230423084166', pname: 'Apple iPad Pro 12.9-inch M2 256GB', ptype: 'tablet', pprice: 112900.00 }
};

export default function CartPage({ cart, onUpdateQty, onRemove }) {
  const navigate = useNavigate();

  const cartEntries = Object.entries(cart).filter(([_, qty]) => qty > 0);

  let grandTotal = 0;
  cartEntries.forEach(([pid, qty]) => {
    const item = MOCK_PRODUCTS[pid];
    if (item) grandTotal += item.pprice * qty;
  });

  if (cartEntries.length === 0) {
    return (
      <div className="container" style={{ marginTop: '120px', marginBottom: '80px', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto', borderRadius: '24px' }}>
          <i className="fas fa-shopping-basket" style={{ fontSize: '72px', color: 'var(--text-muted)', marginBottom: '20px' }}></i>
          <h2 style={{ fontSize: '28px', fontWeight: 800 }}>Your Shopping Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '30px' }}>Looks like you haven't added any electronics to your cart yet.</p>
          <Link to="/" className="btn-premium-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
            <i className="fas fa-store"></i> Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '80px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '25px' }}>
        <i className="fas fa-shopping-bag" style={{ color: 'var(--primary)' }}></i> Shopping Cart ({cartEntries.length} Items)
      </h2>

      <div className="row">
        {/* Cart Items Table */}
        <div className="col-md-8 col-sm-12">
          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', overflowX: 'auto', marginBottom: '30px' }}>
            <table className="table" style={{ color: 'var(--text-body)', margin: 0 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-heading)' }}>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartEntries.map(([pid, qty]) => {
                  const item = MOCK_PRODUCTS[pid] || { pname: 'Device Item', pprice: 9999, ptype: 'gadget' };
                  const subtotal = item.pprice * qty;
                  return (
                    <tr key={pid} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', verticalAlign: 'middle' }}>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80" alt={item.pname} style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }} />
                          <div>
                            <Link to={`/product/${pid}`} style={{ color: 'var(--text-heading)', fontWeight: 600, textDecoration: 'none' }}>
                              {item.pname}
                            </Link>
                            <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{item.ptype}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 8px', fontWeight: 600 }}>Rs. {item.pprice.toFixed(2)}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '8px' }}>
                          <button onClick={() => onUpdateQty(pid, Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 'bold' }}>-</button>
                          <span style={{ fontWeight: 'bold', padding: '0 4px' }}>{qty}</span>
                          <button onClick={() => onUpdateQty(pid, qty + 1)} style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 'bold' }}>+</button>
                        </div>
                      </td>
                      <td style={{ padding: '16px 8px', fontWeight: 700, color: 'var(--accent)' }}>Rs. {subtotal.toFixed(2)}</td>
                      <td style={{ padding: '16px 8px' }}>
                        <button onClick={() => onRemove(pid)} className="btn-premium-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="col-md-4 col-sm-12">
          <div className="glass-card" style={{ padding: '30px', borderRadius: '20px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: 0, marginBottom: '20px', color: '#fff' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
              <span>Subtotal</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>Rs. {grandTotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
              <span>Shipping Fee</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-muted)', fontSize: '14px' }}>
              <span>Tax (GST)</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>Included</span>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>Grand Total</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent)' }}>Rs. {grandTotal.toFixed(2)}</span>
            </div>

            <button onClick={() => navigate('/payment')} className="btn-premium-primary" style={{ width: '100%', padding: '14px 0', fontSize: '16px', borderRadius: '12px' }}>
              <i className="fas fa-credit-card"></i> Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
