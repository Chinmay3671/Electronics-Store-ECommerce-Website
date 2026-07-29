import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage({ onPaymentComplete }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handlePay = (e) => {
    e.preventDefault();
    onPaymentComplete();
    alert('Payment Successful! Your order has been placed.');
    navigate('/orders');
  };

  return (
    <div className="container" style={{ marginTop: '110px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div style={{
            padding: '40px 45px',
            background: '#ffffff',
            color: '#0f172a',
            borderRadius: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
          }}>
            
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.12)', borderRadius: '50%', color: '#10b981', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px' }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#0f172a' }}>Secure Checkout</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginTop: '6px' }}>256-Bit SSL Encrypted Payment Portal</p>
            </div>

            <form onSubmit={handlePay}>
              <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Cardholder Name</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }}
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <i className="far fa-credit-card" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '15px' }}></i>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', paddingLeft: '42px', borderRadius: '10px', fontSize: '14px' }}
                    placeholder="4532 •••• •••• 8921"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6 form-group" style={{ marginBottom: '28px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }}
                    placeholder="MM/YY"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-xs-6 form-group" style={{ marginBottom: '28px', textAlign: 'left' }}>
                  <label style={{ color: '#475569', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>CVV Code</label>
                  <input
                    type="password"
                    maxLength="4"
                    className="form-control"
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', height: '46px', borderRadius: '10px', fontSize: '14px', paddingLeft: '14px' }}
                    placeholder="•••"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-premium-primary" style={{ width: '100%', height: '48px', borderRadius: '12px', fontSize: '15px', fontWeight: 600, background: '#2563eb', color: '#ffffff', border: 'none', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}>
                <i className="fas fa-check-circle"></i> Pay Now & Complete Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
