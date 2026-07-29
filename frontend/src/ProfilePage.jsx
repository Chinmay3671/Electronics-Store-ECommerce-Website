import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="container" style={{ marginTop: '140px', marginBottom: '80px', textAlign: 'center' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '20px', border: '1px solid #e2e8f0', maxWidth: '500px', margin: '0 auto' }}>
          <i className="fas fa-user-slash" style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '16px' }}></i>
          <h2>Please Log In</h2>
          <p style={{ color: '#64748b' }}>You need to be logged in to view your account details.</p>
          <Link to="/login" className="btn-premium-primary" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px' }}>
            <i className="fas fa-sign-in-alt"></i> Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const name = user.name || (user.email ? user.email.split('@')[0] : user.username || 'Customer');
  const email = user.email || user.username || 'N/A';
  const mobile = user.mobile || '9876543210';
  const address = user.address || 'Standard Delivery Address';
  const pinCode = user.pinCode || user.pin || '400001';

  return (
    <div className="container" style={{ marginTop: '110px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
            overflow: 'hidden'
          }}>
            
            {/* Header Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              padding: '35px 40px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  fontSize: '32px',
                  fontWeight: 800,
                  boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
                }}>
                  {name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>{name}</h2>
                  <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '14px' }}>
                    <i className="fas fa-check-circle" style={{ color: '#10b981', marginRight: '6px' }}></i>
                    Registered Customer Account
                  </p>
                </div>
              </div>

              <button
                onClick={() => { onLogout(); navigate('/login'); }}
                className="btn-premium-outline"
                style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '8px 18px', borderRadius: '12px', fontWeight: 600 }}
              >
                <i className="fas fa-sign-out-alt"></i> Log Out
              </button>
            </div>

            {/* Account Details Body */}
            <div style={{ padding: '40px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-id-card" style={{ color: '#2563eb' }}></i> Account Details & Profile
              </h3>

              <div className="row" style={{ rowGap: '20px' }}>
                
                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name</span>
                    <strong style={{ color: '#0f172a', fontSize: '16px' }}>{name}</strong>
                  </div>
                </div>

                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address</span>
                    <strong style={{ color: '#0f172a', fontSize: '16px' }}>{email}</strong>
                  </div>
                </div>

                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Mobile Number</span>
                    <strong style={{ color: '#0f172a', fontSize: '16px' }}>{mobile}</strong>
                  </div>
                </div>

                <div className="col-md-6" style={{ marginBottom: '20px' }}>
                  <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Pincode</span>
                    <strong style={{ color: '#0f172a', fontSize: '16px' }}>{pinCode}</strong>
                  </div>
                </div>

                <div className="col-md-12">
                  <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Delivery Address</span>
                    <strong style={{ color: '#0f172a', fontSize: '15px' }}>{address}</strong>
                  </div>
                </div>

              </div>

              {/* Quick Actions */}
              <div style={{ marginTop: '30px', paddingTop: '25px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <Link to="/orders" className="btn-premium-primary" style={{ padding: '10px 20px', borderRadius: '10px', textDecoration: 'none' }}>
                  <i className="fas fa-box"></i> View My Orders
                </Link>
                <Link to="/" style={{ background: '#f1f5f9', color: '#334155', padding: '10px 20px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none' }}>
                  <i className="fas fa-store"></i> Continue Shopping
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
