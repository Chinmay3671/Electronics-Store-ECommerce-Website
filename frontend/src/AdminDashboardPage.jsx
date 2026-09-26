import React, { useState } from 'react';

const INITIAL_PRODUCTS = [
  { pid: 'P20230423084161', pname: 'MacBook Pro M3 Max 16-inch', ptype: 'laptop', pprice: 249999.00, pquantity: 15 },
  { pid: 'P20230423084162', pname: 'iPhone 15 Pro Max 256GB Titanium', ptype: 'mobile', pprice: 149900.00, pquantity: 25 },
  { pid: 'P20230423084163', pname: 'Samsung 65-inch Neo QLED 4K Smart TV', ptype: 'tv', pprice: 119990.00, pquantity: 10 },
  { pid: 'P20230423084164', pname: 'Sony Alpha 7 IV Full-Frame Camera', ptype: 'camera', pprice: 214990.00, pquantity: 8 },
  { pid: 'P20230423084165', pname: 'Bose QuietComfort Ultra Headphones', ptype: 'speaker', pprice: 34900.00, pquantity: 30 },
  { pid: 'P20230423084166', pname: 'Apple iPad Pro 12.9-inch M2 256GB', ptype: 'tablet', pprice: 112900.00, pquantity: 12 }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'users'
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProd, setNewProd] = useState({ pname: '', ptype: 'mobile', pinfo: '', pprice: '', pquantity: '' });
  const [userSearch, setUserSearch] = useState('');

  const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

  const filteredUsers = registeredUsers.filter(u =>
    (u.name && u.name.toLowerCase().includes(userSearch.toLowerCase())) ||
    (u.email && u.email.toLowerCase().includes(userSearch.toLowerCase())) ||
    (u.mobile && u.mobile.includes(userSearch))
  );

  const handleAddProduct = (e) => {
    e.preventDefault();
    const pid = 'P' + Date.now();
    setProducts([...products, { ...newProd, pid: pid, pprice: parseFloat(newProd.pprice), pquantity: parseInt(newProd.pquantity) }]);
    setShowAddForm(false);
    setNewProd({ pname: '', ptype: 'mobile', pinfo: '', pprice: '', pquantity: '' });
    alert('Product added successfully!');
  };

  const handleDelete = (pid) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      setProducts(products.filter(p => p.pid !== pid));
    }
  };

  const handleDeleteUser = (email) => {
    if (window.confirm(`Are you sure you want to remove user ${email}?`)) {
      const updated = registeredUsers.filter(u => u.email !== email);
      localStorage.setItem('registeredUsers', JSON.stringify(updated));
      window.location.reload();
    }
  };

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '80px' }}>
      
      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            background: activeTab === 'products' ? '#2563eb' : 'transparent',
            color: '#fff',
            border: activeTab === 'products' ? 'none' : '1px solid rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-boxes"></i> Products Management ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          style={{
            background: activeTab === 'users' ? '#2563eb' : 'transparent',
            color: '#fff',
            border: activeTab === 'users' ? 'none' : '1px solid rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <i className="fas fa-users"></i> Registered Users ({registeredUsers.length})
        </button>
      </div>

      {activeTab === 'products' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#fff' }}>
              <i className="fas fa-boxes" style={{ color: 'var(--secondary)' }}></i> Admin Product Catalog
            </h2>
            <button onClick={() => setShowAddForm(!showAddForm)} className="btn-premium-primary" style={{ padding: '10px 22px' }}>
              <i className="fas fa-plus"></i> {showAddForm ? 'Close Form' : 'Add New Product'}
            </button>
          </div>

          {showAddForm && (
            <div className="glass-card" style={{ padding: '30px', borderRadius: '20px', marginBottom: '30px', background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ marginTop: 0, color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Add Product to Catalog</h3>
              <form onSubmit={handleAddProduct}>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label style={{ color: '#E2E8F0', fontSize: '13px' }}>Product Name</label>
                    <input type="text" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} value={newProd.pname} onChange={e => setNewProd({ ...newProd, pname: e.target.value })} required />
                  </div>
                  <div className="col-md-6 form-group">
                    <label style={{ color: '#E2E8F0', fontSize: '13px' }}>Category Type</label>
                    <select className="form-control" style={{ background: 'rgba(15,23,42,0.9)', color: '#fff' }} value={newProd.ptype} onChange={e => setNewProd({ ...newProd, ptype: e.target.value })}>
                      <option value="mobile">Mobile</option>
                      <option value="laptop">Laptop</option>
                      <option value="tv">TV</option>
                      <option value="speaker">Audio & Speaker</option>
                      <option value="camera">Camera</option>
                      <option value="tablet">Tablet</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label style={{ color: '#E2E8F0', fontSize: '13px' }}>Price (Rs.)</label>
                    <input type="number" step="0.01" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} value={newProd.pprice} onChange={e => setNewProd({ ...newProd, pprice: e.target.value })} required />
                  </div>
                  <div className="col-md-6 form-group">
                    <label style={{ color: '#E2E8F0', fontSize: '13px' }}>Quantity</label>
                    <input type="number" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }} value={newProd.pquantity} onChange={e => setNewProd({ ...newProd, pquantity: e.target.value })} required />
                  </div>
                </div>
                <button type="submit" className="btn-premium-primary" style={{ padding: '10px 28px', marginTop: '10px' }}>
                  <i className="fas fa-check"></i> Save Product
                </button>
              </form>
            </div>
          )}

          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', overflowX: 'auto', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}>
            <table className="table" style={{ color: '#e2e8f0', margin: 0 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th>Stock Qty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.pid} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', verticalAlign: 'middle' }}>
                    <td style={{ padding: '16px 8px', fontFamily: 'monospace', fontWeight: 600 }}>{p.pid}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 600 }}>{p.pname}</td>
                    <td style={{ padding: '16px 8px', textTransform: 'capitalize' }}>{p.ptype}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 700, color: '#60a5fa' }}>Rs. {p.pprice.toFixed(2)}</td>
                    <td style={{ padding: '16px 8px', fontWeight: 600, color: p.pquantity > 5 ? '#34d399' : '#f87171' }}>{p.pquantity} units</td>
                    <td style={{ padding: '16px 8px' }}>
                      <button onClick={() => handleDelete(p.pid)} className="btn-premium-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                        <i className="fas fa-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, color: '#fff' }}>
              <i className="fas fa-users" style={{ color: '#60a5fa' }}></i> Registered Accounts Registry
            </h2>
            <input
              type="text"
              placeholder="Search user by name, email, mobile..."
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              style={{
                width: '300px',
                height: '40px',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                padding: '0 14px',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', overflowX: 'auto', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}>
            {filteredUsers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                <i className="fas fa-user-slash" style={{ fontSize: '36px', marginBottom: '12px', display: 'block' }}></i>
                No registered user accounts found matching query.
              </div>
            ) : (
              <table className="table" style={{ color: '#e2e8f0', margin: 0 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Mobile</th>
                    <th>Address / Pincode</th>
                    <th>Registration Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, idx) => (
                    <tr key={u.email || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', verticalAlign: 'middle' }}>
                      <td style={{ padding: '16px 8px', fontWeight: 700 }}>{u.name || (u.email ? u.email.split('@')[0] : 'User')}</td>
                      <td style={{ padding: '16px 8px', fontFamily: 'monospace' }}>{u.email}</td>
                      <td style={{ padding: '16px 8px' }}>{u.mobile || 'N/A'}</td>
                      <td style={{ padding: '16px 8px', fontSize: '13px' }}>{u.address || 'N/A'} ({u.pin || u.pinCode || 'N/A'})</td>
                      <td style={{ padding: '16px 8px' }}>
                        <span style={{
                          background: u.source && u.source.includes('MySQL') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                          color: u.source && u.source.includes('MySQL') ? '#34d399' : '#60a5fa',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}>
                          {u.source || 'Local Session Registry'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 8px' }}>
                        <button onClick={() => handleDeleteUser(u.email)} className="btn-premium-danger" style={{ padding: '6px 12px', fontSize: '12px' }}>
                          <i className="fas fa-user-times"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

    </div>
  );
}
