import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', address: '', pin: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    onLoginSuccess({ username: formData.email, usertype: 'customer' });
    alert('Registration Successful! Welcome to Electronics Store.');
    navigate('/');
  };

  return (
    <div className="container" style={{ marginTop: '60px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
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
                <i className="fas fa-user-plus"></i>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>Create Your Account</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Join thousands of tech enthusiasts shopping with us</p>
            </div>

            {error && (
              <div className="alert alert-danger" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px' }}>
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Full Name</label>
                  <input type="text" name="name" className="form-control" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', marginTop: '6px' }} placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</label>
                  <input type="email" name="email" className="form-control" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', marginTop: '6px' }} placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Mobile Number</label>
                  <input type="text" name="mobile" className="form-control" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', marginTop: '6px' }} placeholder="9876543210" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group" style={{ marginBottom: '20px' }}>
                  <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Pincode</label>
                  <input type="text" name="pin" className="form-control" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', marginTop: '6px' }} placeholder="400001" value={formData.pin} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Delivery Address</label>
                <textarea name="address" className="form-control" rows="2" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '10px', marginTop: '6px' }} placeholder="Enter complete address..." value={formData.address} onChange={handleChange} required></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 form-group" style={{ marginBottom: '25px' }}>
                  <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Password</label>
                  <input type="password" name="password" className="form-control" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', marginTop: '6px' }} placeholder="Create password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group" style={{ marginBottom: '25px' }}>
                  <label style={{ color: '#334155', fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Confirm Password</label>
                  <input type="password" name="confirmPassword" className="form-control" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', marginTop: '6px' }} placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="btn-premium-primary" style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, background: '#2563eb', color: '#ffffff', border: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
                <i className="fas fa-check-circle"></i> Complete Registration
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '25px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', fontSize: '14px', color: '#64748b' }}>
              Already registered? <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Sign in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
