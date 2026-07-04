import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Social Proof Widget - Boost Conversions</title>
        <meta name="description" content="Boost conversions with real-time social proof widgets" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div style={styles.container}>
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <span style={styles.logoText}>Social Proof Widget</span>
            <div style={styles.navLinks}>
              <a href="/pricing.html" style={styles.navLink}>Pricing</a>
              <a href="/support.html" style={styles.navLink}>Support</a>
            </div>
          </div>
        </nav>

        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>Boost Conversions with Real-Time Social Proof</h1>
          <p style={styles.heroSubtitle}>Display live purchase notifications, signups, and reviews to build trust and increase sales.</p>
          <a href="/pricing.html" style={styles.ctaButton}>Start Free Trial</a>
        </section>

        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <div style={styles.footerLinks}>
              <a href="/terms.html" style={styles.footerLink}>Terms</a>
              <a href="/privacy.html" style={styles.footerLink}>Privacy</a>
              <a href="/refund-policy.html" style={styles.footerLink}>Refund</a>
              <a href="/pricing.html" style={styles.footerLink}>Pricing</a>
              <a href="/support.html" style={styles.footerLink}>Support</a>
            </div>
            <p style={styles.copyright}>© 2026 Social Proof Widget</p>
          </div>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', color: '#333' },
  nav: { background: '#fff', padding: '15px 0', borderBottom: '1px solid #eee' },
  navInner: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between' },
  logoText: { fontSize: '1.3rem', fontWeight: 'bold', color: '#667eea' },
  navLinks: { display: 'flex', gap: '20px' },
  navLink: { color: '#666', textDecoration: 'none' },
  hero: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '100px 20px', textAlign: 'center', color: 'white' },
  heroTitle: { fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' },
  heroSubtitle: { fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 },
  ctaButton: { background: 'white', color: '#667eea', padding: '15px 40px', borderRadius: '10px', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' },
  footer: { background: '#1a1a2e', color: 'white', padding: '40px 0' },
  footerInner: { maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' },
  footerLink: { color: '#aaa', textDecoration: 'none' },
  copyright: { textAlign: 'center', color: '#aaa' }
};

export async function getStaticProps() {
  return { props: {} };
}
