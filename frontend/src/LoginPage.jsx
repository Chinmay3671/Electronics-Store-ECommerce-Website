import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === 'admin' && username === 'admin@gmail.com' && password === 'admin') {
      onLoginSuccess({ username, usertype: 'admin' });
      navigate('/admin');
    } else if (username && password) {
      onLoginSuccess({ username, usertype: 'customer' });
      navigate('/');
    } else {
      setErrorMsg('Invalid Username or Password');
    }
  };

  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div className="glass-card" style={{ padding: '40px', background: 'rgba(15, 23, 42, 0.9)', color: '#fff', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(37, 99, 235, 0.15)', borderRadius: '50%', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '15px' }}>
                <i className="fas fa-user-lock"></i>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#fff' }}>Welcome Back</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>Sign in to continue to Electronics Store</p>
            </div>

            {errorMsg && (
              <div className="alert alert-danger" style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', borderRadius: '12px', fontSize: '14px' }}>
                <i className="fas fa-exclamation-triangle"></i> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Login As</label>
                <div style={{ display: 'flex', gap: '15px', marginTop: '6px' }}>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 400 }}>
                    <input type="radio" name="usertype" value="customer" checked={userType === 'customer'} onChange={() => setUserType('customer')} />
                    Customer
                  </label>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 400 }}>
                    <input type="radio" name="usertype" value="admin" checked={userType === 'admin'} onChange={() => setUserType('admin')} />
                    Admin
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email / Username</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-envelope" style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }}></i>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', height: '48px', paddingLeft: '45px', borderRadius: '12px', fontSize: '15px' }}
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <i className="fas fa-key" style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--text-muted)' }}></i>
                  <input
                    type="password"
                    className="form-control"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', height: '48px', paddingLeft: '45px', borderRadius: '12px', fontSize: '15px' }}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-premium-primary" style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '16px' }}>
                <i className="fas fa-sign-in-alt"></i> Log In
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '14px', color: 'var(--text-muted)' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
