import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer class="footer-premium">
      <div class="container">
        <div class="row">
          {/* Brand & Mission */}
          <div class="col-md-4 col-sm-6 mb-4">
            <h3 style={{ color: '#FFFFFF', fontSize: '22px', marginTop: 0, fontWeight: 800 }}>
              <i class="fas fa-bolt" style={{ color: '#60A5FA' }}></i> Electronics Store
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', marginTop: '15px', maxWidth: '320px' }}>
              Next-generation electronic devices, laptops, smartphones, and audio gear built for speed, performance, and modern lifestyle.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i class="fab fa-facebook-f"></i></a>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i class="fab fa-twitter"></i></a>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i class="fab fa-instagram"></i></a>
              <a href="#" style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div class="col-md-2 col-sm-6 mb-4">
            <h4 class="footer-heading">Categories</h4>
            <ul class="footer-links">
              <li><Link to="/?type=mobile"><i class="fas fa-chevron-right" style={{ fontSize: '10px' }}></i> Smart Phones</Link></li>
              <li><Link to="/?type=laptop"><i class="fas fa-chevron-right" style={{ fontSize: '10px' }}></i> Laptops & PCs</Link></li>
              <li><Link to="/?type=tv"><i class="fas fa-chevron-right" style={{ fontSize: '10px' }}></i> Smart TVs</Link></li>
              <li><Link to="/?type=speaker"><i class="fas fa-chevron-right" style={{ fontSize: '10px' }}></i> Audio & Speakers</Link></li>
              <li><Link to="/?type=camera"><i class="fas fa-chevron-right" style={{ fontSize: '10px' }}></i> Digital Cameras</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div class="col-md-3 col-sm-6 mb-4">
            <h4 class="footer-heading">Store Location</h4>
            <p style={{ color: '#94A3B8', fontSize: '14px' }}>
              <i class="fas fa-map-marker-alt" style={{ color: '#60A5FA', marginRight: '8px' }}></i> Electronics Store HQ, Tech Park
            </p>
            <p style={{ color: '#94A3B8', fontSize: '14px' }}>
              <i class="fas fa-phone-alt" style={{ color: '#60A5FA', marginRight: '8px' }}></i> +91 XXXXXXXXXX
            </p>
            <p style={{ color: '#94A3B8', fontSize: '14px' }}>
              <i class="fas fa-envelope" style={{ color: '#60A5FA', marginRight: '8px' }}></i> support@electronicsstore.com
            </p>
          </div>

          {/* Customer Feedback */}
          <div class="col-md-3 col-sm-6 mb-4">
            <h4 class="footer-heading">Customer Feedback</h4>
            <form onSubmit={(e) => { e.preventDefault(); alert('Feedback sent successfully!'); }}>
              <div class="form-group" style={{ marginBottom: '10px' }}>
                <input class="form-control" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px' }} placeholder="Your Name" type="text" required />
              </div>
              <div class="form-group" style={{ marginBottom: '10px' }}>
                <input class="form-control" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px' }} placeholder="Your Email" type="email" required />
              </div>
              <div class="form-group" style={{ marginBottom: '10px' }}>
                <textarea class="form-control" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px' }} placeholder="Message or Feedback" rows="2" required></textarea>
              </div>
              <button class="btn-premium-primary" type="submit" style={{ width: '100%', borderRadius: '8px' }}>
                <i class="fas fa-paper-plane"></i> Send Feedback
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div class="footer-bottom">
          <div>
            &copy; 2026 <strong>Electronics Store</strong>. All rights reserved. Built with React & Java.
          </div>
          <div style={{ display: 'flex', gap: '15px', fontSize: '20px', color: '#94A3B8' }}>
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-paypal"></i>
            <i class="fab fa-cc-apple-pay"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
