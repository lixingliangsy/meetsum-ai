'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
          Freelancer Portal
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          Client portal software for freelancers & agencies. 
          Share files, track projects, and get paid — all in one place.
        </p>
      </header>

      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '60px 40px', borderRadius: '16px', color: 'white', marginBottom: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
          impress Clients. Get Paid Faster.
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
          Professional client portals that make you look like a pro.
        </p>
        <button 
          onClick={() => window.location.href = '/api/checkout?plan=pro'}
          style={{ 
            padding: '16px 32px', 
            background: 'white', 
            color: '#667eea', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '18px', 
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Start Free Trial →
        </button>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '40px' }}>
          Everything You Need to Wow Clients
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
          {[
            { icon: '📁', title: 'File Sharing', desc: 'Secure file sharing with version control and comments' },
            { icon: '📊', title: 'Project Tracking', desc: 'Real-time progress tracking with milestones and deadlines' },
            { icon: '💳', title: 'Invoicing', desc: 'Professional invoices and payment tracking built-in' },
            { icon: '💬', title: 'Client Messaging', desc: 'Dedicated client communication channel (no more email chains)' },
            { icon: '📝', title: 'Approval Workflow', desc: 'Get formal approvals on deliverables with one click' },
            { icon: '🎨', title: 'White Label', desc: 'Add your branding — it looks like your own software' }
          ].map(feature => (
            <div key={feature.title} style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{feature.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ background: '#f9fafb', padding: '40px', borderRadius: '16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
          Simple, Transparent Pricing
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '30px' }}>
          Start free, upgrade when your business grows
        </p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', flex: '1', maxWidth: '300px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Starter</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>$0</p>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Up to 3 clients</p>
            <ul style={{ textAlign: 'left', color: '#6b7280', fontSize: '14px', lineHeight: '2' }}>
              <li>✅ 1 Portal</li>
              <li>✅ Basic file sharing</li>
              <li>✅ Email support</li>
            </ul>
            <button 
              onClick={() => window.location.href = '/api/checkout?plan=starter'}
              style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '20px' }}
            >
              Start Free
            </button>
          </div>
          <div style={{ background: 'white', padding: '30px', borderRadius: '12px', flex: '1', maxWidth: '300px', border: '2px solid #667eea' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Pro</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>$49<span style={{ fontSize: '16px', color: '#6b7280' }}>/mo</span></p>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>Unlimited clients</p>
            <ul style={{ textAlign: 'left', color: '#6b7280', fontSize: '14px', lineHeight: '2' }}>
              <li>✅ Unlimited portals</li>
              <li>✅ Advanced features</li>
              <li>✅ Priority support</li>
              <li>✅ White label</li>
            </ul>
            <button 
              onClick={() => window.location.href = '/api/checkout?plan=pro'}
              style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '20px' }}
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '60px', padding: '40px 20px', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>Freelancer Portal</h4>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
              Client portal software for freelancers & agencies.<br />Share files, track projects, and get paid — all in one place.
            </p>
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="/pricing.html" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Pricing</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/#features" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Features</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/faq.html" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="/terms.html" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/privacy.html" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li style={{ marginBottom: '8px' }}><a href="/refund-policy.html" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Refund Policy</a></li>
            </ul>
          </div>
          <div style={{ flex: '1', minWidth: '150px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="/support.html" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Help Center</a></li>
              <li style={{ marginBottom: '8px' }}><a href="mailto:support@freelancer-portal.com" style={{ color: '#6b7280', fontSize: '14px', textDecoration: 'none' }}>Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>© 2026 Freelancer Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
