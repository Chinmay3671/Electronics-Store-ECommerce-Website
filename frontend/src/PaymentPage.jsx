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
    <div className="container" style={{ marginTop: '100px', marginBottom: '80px' }}>
      <div className="row">
        <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div className="glass-card" style={{ padding: '40px', background: 'rgba(15, 23, 42, 0.9)', color: '#fff', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', color: 'var(--success)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '15px' }}>
                <i className="fas fa-lock"></i>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, color: '#fff' }}>Secure Checkout</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>256-Bit SSL Encrypted Payment Portal</p>
            </div>

            <form onSubmit={handlePay}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase' }}>Cardholder Name</label>
                <input type="text" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', height: '46px', borderRadius: '10px' }} placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase' }}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <i className="far fa-credit-card" style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }}></i>
                  <input type="text" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', height: '46px', paddingLeft: '45px', borderRadius: '10px' }} placeholder="4532 •••• •••• 8921" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6 form-group" style={{ marginBottom: '25px' }}>
                  <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase' }}>Expiry Date</label>
                  <input type="text" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', height: '46px', borderRadius: '10px' }} placeholder="MM/YY" value={expDate} onChange={(e) => setExpDate(e.target.value)} required />
                </div>
                <div className="col-xs-6 form-group" style={{ marginBottom: '25px' }}>
                  <label style={{ color: '#E2E8F0', fontSize: '13px', textTransform: 'uppercase' }}>CVV Code</label>
                  <input type="password" maxLength="4" className="form-control" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', height: '46px', borderRadius: '10px' }} placeholder="•••" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>

              <button type="submit" className="btn-premium-primary" style={{ width: '100%', height: '50px', borderRadius: '12px', fontSize: '16px' }}>
                <i className="fas fa-check-circle"></i> Pay Now & Complete Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
