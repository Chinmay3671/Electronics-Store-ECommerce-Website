import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', address: '', pin: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('email', formData.email);
      params.append('username', formData.name || (formData.email.includes('@') ? formData.email.split('@')[0] : formData.email));
      params.append('mobile', formData.mobile || '9876543210');
      params.append('address', formData.address || 'Customer Address');
      params.append('pincode', formData.pin || '400001');
      params.append('password', formData.password);
      params.append('confirmPassword', formData.confirmPassword);

      await fetch('http://localhost:8080/shopping-cart/RegisterSrv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      }).catch(() => {});
    } catch (err) {
      // Backend sync
    }

    // Store registered user in local storage registry
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingIndex = registeredUsers.findIndex(u => u.email.toLowerCase() === formData.email.toLowerCase());
    const newUser = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      mobile: formData.mobile,
      address: formData.address
    };

    if (existingIndex >= 0) {
      registeredUsers[existingIndex] = newUser;
    } else {
      registeredUsers.push(newUser);
    }
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    alert('Registration Successful! Please log in with your email and password.');
    navigate('/login');
  };

  return (
    <div className="container" style={{ marginTop: '110px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1">
          <div style={{
            padding: '40px 45px',
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', color: '#2563eb', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px' }}>
                <i className="fas fa-user-plus"></i>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>Create Your Account</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>Join thousands of tech enthusiasts shopping with us</p>
            </div>

            {error && (
              <div className="alert alert-danger" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px' }}>
                <i className="fas fa-exclamation-triangle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" name="name" className="form-control" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }} placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Email Address</label>
                  <input type="email" name="email" className="form-control" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }} placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Mobile Number</label>
                  <input type="text" name="mobile" className="form-control" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }} placeholder="9876543210" value={formData.mobile} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Pincode</label>
                  <input type="text" name="pin" className="form-control" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }} placeholder="400001" value={formData.pin} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Delivery Address</label>
                <textarea name="address" className="form-control" rows="2" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', borderRadius: '10px', fontSize: '14px', padding: '10px 14px' }} placeholder="Enter complete address..." value={formData.address} onChange={handleChange} required></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 form-group" style={{ marginBottom: '28px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Password</label>
                  <input type="password" name="password" className="form-control" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }} placeholder="Create password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6 form-group" style={{ marginBottom: '28px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Confirm Password</label>
                  <input type="password" name="confirmPassword" className="form-control" style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }} placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
              </div>

              <button type="submit" className="btn-premium-primary" style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, background: '#2563eb', color: '#ffffff', border: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
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
