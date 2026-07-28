import React from 'react';
import { Link } from 'react-router-dom';

const MOCK_ORDERS = [
  { oid: 'ORD9021841', date: '2026-07-28', pname: 'MacBook Pro M3 Max 16-inch', pprice: 249999.00, qty: 1, status: 'Shipped', tracking: 'TRK8920194' },
  { oid: 'ORD9021840', date: '2026-07-20', pname: 'iPhone 15 Pro Max 256GB Titanium', pprice: 149900.00, qty: 1, status: 'Delivered', tracking: 'TRK8920110' }
];

export default function OrdersPage() {
  return (
    <div className="container" style={{ marginTop: '100px', marginBottom: '80px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '25px' }}>
        <i className="fas fa-box" style={{ color: 'var(--primary)' }}></i> Order History
      </h2>

      <div className="glass-card" style={{ padding: '20px', borderRadius: '20px', overflowX: 'auto' }}>
        <table className="table" style={{ color: 'var(--text-body)', margin: 0 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-heading)' }}>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Tracking Number</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map(ord => (
              <tr key={ord.oid} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', verticalAlign: 'middle' }}>
                <td style={{ padding: '16px 8px', fontWeight: 700, color: 'var(--primary)' }}>{ord.oid}</td>
                <td style={{ padding: '16px 8px' }}>{ord.date}</td>
                <td style={{ padding: '16px 8px', fontWeight: 600 }}>{ord.pname}</td>
                <td style={{ padding: '16px 8px' }}>{ord.qty}</td>
                <td style={{ padding: '16px 8px', fontWeight: 700, color: 'var(--accent)' }}>Rs. {ord.pprice.toFixed(2)}</td>
                <td style={{ padding: '16px 8px' }}>
                  <span className={`badge ${ord.status === 'Shipped' ? 'badge-info' : 'badge-success'}`} style={{ background: ord.status === 'Shipped' ? 'rgba(6,182,212,0.2)' : 'rgba(16,185,129,0.2)', color: ord.status === 'Shipped' ? '#06B6D4' : '#10B981', padding: '6px 12px', borderRadius: '6px' }}>
                    {ord.status}
                  </span>
                </td>
                <td style={{ padding: '16px 8px', fontFamily: 'monospace' }}>{ord.tracking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
