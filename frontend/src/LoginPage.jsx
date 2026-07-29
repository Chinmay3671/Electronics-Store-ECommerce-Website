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
    <div className="container" style={{ marginTop: '60px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div style={{
            padding: '40px',
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', color: '#2563eb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '15px' }}>
                <i className="fas fa-user-lock"></i>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>Welcome Back</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Sign in to continue to Electronics Store</p>
            </div>

            {errorMsg && (
              <div className="alert alert-danger" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '12px', fontSize: '14px', padding: '12px 16px', marginBottom: '20px' }}>
                <i className="fas fa-exclamation-triangle"></i> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Login As</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 500 }}>
                    <input type="radio" name="usertype" value="customer" checked={userType === 'customer'} onChange={() => setUserType('customer')} />
                    Customer
                  </label>
                  <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a', fontWeight: 500 }}>
                    <input type="radio" name="usertype" value="admin" checked={userType === 'admin'} onChange={() => setUserType('admin')} />
                    Admin
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Email / Username</label>
                <div style={{ position: 'relative', marginTop: '6px' }}>
                  <i className="fas fa-envelope" style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }}></i>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '48px', paddingLeft: '45px', borderRadius: '12px', fontSize: '15px' }}
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Password</label>
                <div style={{ position: 'relative', marginTop: '6px' }}>
                  <i className="fas fa-key" style={{ position: 'absolute', left: '16px', top: '16px', color: '#94a3b8' }}></i>
                  <input
                    type="password"
                    className="form-control"
                    style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '48px', paddingLeft: '45px', borderRadius: '12px', fontSize: '15px' }}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-premium-primary" style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, background: '#2563eb', color: '#ffffff', border: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
                <i className="fas fa-sign-in-alt"></i> Log In
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b' }}>
              Don't have an account? <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
