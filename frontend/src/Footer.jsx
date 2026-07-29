import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer-premium" style={{ width: '100%', overflow: 'hidden', background: '#0b1329', color: '#94a3b8', paddingTop: '50px', paddingBottom: '30px', marginTop: '60px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container">
        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          {/* Brand & Mission */}
          <div className="col-md-4 col-sm-6" style={{ marginBottom: '30px', paddingLeft: '15px', paddingRight: '15px' }}>
            <h3 style={{ color: '#FFFFFF', fontSize: '20px', marginTop: 0, fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-bolt" style={{ color: '#60A5FA' }}></i> Electronics Store
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginTop: '12px', lineHeight: '1.6', maxWidth: '300px' }}>
              Next-generation electronic devices, laptops, smartphones, and audio gear built for speed, performance, and modern lifestyle.
            </p>

            <div style={{ marginTop: '18px', display: 'flex', gap: '10px' }}>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i className="fab fa-facebook-f"></i></a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i className="fab fa-twitter"></i></a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i className="fab fa-instagram"></i></a>
              <a href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-sm-6" style={{ marginBottom: '30px', paddingLeft: '15px', paddingRight: '15px' }}>
            <h4 className="footer-heading" style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Categories</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link to="/?type=mobile" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}><i className="fas fa-chevron-right" style={{ fontSize: '10px', marginRight: '6px' }}></i> Smart Phones</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/?type=laptop" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}><i className="fas fa-chevron-right" style={{ fontSize: '10px', marginRight: '6px' }}></i> Laptops & PCs</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/?type=tv" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}><i className="fas fa-chevron-right" style={{ fontSize: '10px', marginRight: '6px' }}></i> Smart TVs</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/?type=speaker" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}><i className="fas fa-chevron-right" style={{ fontSize: '10px', marginRight: '6px' }}></i> Audio & Speakers</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/?type=camera" style={{ color: '#94A3B8', fontSize: '13px', textDecoration: 'none' }}><i className="fas fa-chevron-right" style={{ fontSize: '10px', marginRight: '6px' }}></i> Digital Cameras</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-md-3 col-sm-6" style={{ marginBottom: '30px', paddingLeft: '15px', paddingRight: '15px' }}>
            <h4 className="footer-heading" style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Store Location</h4>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '8px' }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#60A5FA', marginRight: '8px' }}></i> Electronics Store HQ, Tech Park
            </p>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '8px' }}>
              <i className="fas fa-phone-alt" style={{ color: '#60A5FA', marginRight: '8px' }}></i> +91 XXXXXXXXXX
            </p>
            <p style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '8px' }}>
              <i className="fas fa-envelope" style={{ color: '#60A5FA', marginRight: '8px' }}></i> support@electronicsstore.com
            </p>
          </div>

          {/* Customer Feedback */}
          <div className="col-md-3 col-sm-6" style={{ marginBottom: '30px', paddingLeft: '15px', paddingRight: '15px' }}>
            <h4 className="footer-heading" style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Customer Feedback</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert('Feedback sent successfully!'); }}>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <input className="form-control" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px', height: '38px', fontSize: '13px' }} placeholder="Your Name" type="text" required />
              </div>
              <div className="form-group" style={{ marginBottom: '8px' }}>
                <input className="form-control" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px', height: '38px', fontSize: '13px' }} placeholder="Your Email" type="email" required />
              </div>
              <div className="form-group" style={{ marginBottom: '10px' }}>
                <textarea className="form-control" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px', fontSize: '13px', resize: 'none' }} placeholder="Message or Feedback" rows="2" required></textarea>
              </div>
              <button className="btn-premium-primary" type="submit" style={{ width: '100%', borderRadius: '8px', height: '40px', fontSize: '13px', background: '#2563eb', color: '#ffffff', border: 'none' }}>
                <i className="fas fa-paper-plane"></i> Send Feedback
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '30px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '13px', color: '#94a3b8' }}>
          <div>
            &copy; 2026 <strong>Electronics Store</strong>. All rights reserved. Built with React & Java.
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '18px', color: '#94A3B8' }}>
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
