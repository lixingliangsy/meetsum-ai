// pages/index.tsx
// Main page for Screenshot Annotator (Pages Router)

import Annotator from '@/components/Annotator';

export default function Home() {
  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
          Screenshot Annotator
        </h1>
        <p style={{ fontSize: '20px', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
          Add annotations, arrows, and callouts to screenshots. 
          Perfect for bug reports, tutorials, and design feedback.
        </p>
      </header>

      {/* Main Tool */}
      <div style={{ marginBottom: '60px' }}>
        <Annotator />
      </div>

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '60px' }}>
        {[
          {
            icon: '📸',
            title: 'Upload & Annotate',
            description: 'Upload screenshots or paste image URLs. Support for PNG, JPG, WebP.',
          },
          {
            icon: '✏️',
            title: '7 Annotation Tools',
            description: 'Text, arrows, rectangles, circles, freehand drawing, and callouts.',
          },
          {
            icon: '🎨',
            title: 'Customize Style',
            description: 'Choose colors, stroke width, and customize each annotation.',
          },
          {
            icon: '↩️',
            title: 'Undo & Redo',
            description: 'Made a mistake? Undo and redo with unlimited history.',
          },
          {
            icon: '📥',
            title: 'Export as PNG',
            description: 'Download annotated screenshots as PNG files.',
          },
          {
            icon: '🔒',
            title: 'Privacy First',
            description: 'All processing happens in your browser. Images are not uploaded to servers.',
          },
        ].map((feature, index) => (
          <div key={index} style={{ 
            padding: '30px', 
            background: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>
              {feature.title}
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing */}
      <div style={{ background: '#f9fafb', padding: '60px 40px', borderRadius: '16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
          Simple Pricing
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px' }}>
          Start for free, upgrade when you need more
        </p>
        
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ 
            background: 'white', 
            padding: '40px', 
            borderRadius: '16px', 
            flex: '1', 
            maxWidth: '350px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Free</h3>
            <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#1f2937' }}>
              $0
            </p>
            <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>
              Perfect for getting started
            </p>
            <ul style={{ textAlign: 'left', marginBottom: '30px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Unlimited annotations</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ All drawing tools</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Export as PNG</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Undo/Redo</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Privacy-first (local processing)</li>
            </ul>
            <button style={{ 
              width: '100%', 
              padding: '14px', 
              background: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '18px', 
              fontWeight: '600', 
              cursor: 'pointer',
            }}>
              Start Free
            </button>
          </div>

          <div style={{ 
            background: 'white', 
            padding: '40px', 
            borderRadius: '16px', 
            flex: '1', 
            maxWidth: '350px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
            border: '2px solid #3b82f6',
            position: 'relative',
          }}>
            <div style={{ 
              position: 'absolute', 
              top: '-15px', 
              left: '50%', 
              transform: 'translateX(-50%)',
              background: '#3b82f6',
              color: 'white',
              padding: '5px 20px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600',
            }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Pro</h3>
            <p style={{ fontSize: '48px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#1f2937' }}>
              $19<span style={{ fontSize: '18px', color: '#6b7280' }}>/mo</span>
            </p>
            <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '16px' }}>
              For teams and power users
            </p>
            <ul style={{ textAlign: 'left', marginBottom: '30px', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Everything in Free</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Cloud storage (100 screenshots)</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Team collaboration</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Export as JPG, PDF</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Custom branding</li>
              <li style={{ marginBottom: '10px', color: '#374151' }}>✅ Priority support</li>
            </ul>
            <button style={{ 
              width: '100%', 
              padding: '14px', 
              background: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '18px', 
              fontWeight: '600', 
              cursor: 'pointer',
            }}>
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '80px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
        <p>© 2026 Screenshot Annotator. Built for teams & creators.</p>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="./faq.html" style={{ color: '#6b7280', textDecoration: 'none' }}>FAQ</a>
          <a href="./support.html" style={{ color: '#6b7280', textDecoration: 'none' }}>Support</a>
          <a href="./privacy.html" style={{ color: '#6b7280', textDecoration: 'none' }}>Privacy</a>
          <a href="./terms.html" style={{ color: '#6b7280', textDecoration: 'none' }}>Terms</a>
          <a href="./pricing.html" style={{ color: '#6b7280', textDecoration: 'none' }}>Pricing</a>
          <a href="./refund-policy.html" style={{ color: '#6b7280', textDecoration: 'none' }}>Refund</a>
        </div>
      </footer>
    </div>
  );
}
