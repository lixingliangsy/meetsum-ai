// pages/api/features.js
// Feature list API for social-proof-widget

export default function handler(req, res) {
  // Ensure UTF-8 encoding
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  res.status(200).json({
    product: 'social-proof-widget',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'Notification System',
        status: 'implemented',
        description: 'Support for multiple notification types: sales, signups, reviews, visits, and custom events. Each type has customizable templates.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_002',
        name: 'Widget Configuration',
        status: 'implemented',
        description: 'Full widget customization: position, colors, animation, timing, and display options. Save and retrieve configurations via API.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_003',
        name: 'Embed Code Generation',
        status: 'implemented',
        description: 'Generate JavaScript embed code to add the widget to any website. Configurable via API with custom styling options.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_004',
        name: 'REST API',
        status: 'implemented',
        description: 'Complete REST API for managing notifications, widget configuration, and analytics. Supports GET, POST, PUT, DELETE operations.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_005',
        name: 'Analytics Dashboard',
        status: 'implemented',
        description: 'Track notification impressions, clicks, and CTR. View time-series data for different periods (day, week, month).',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_006',
        name: 'Demo Mode',
        status: 'implemented',
        description: 'Generate fake notifications for testing and demonstration purposes. Useful for showcasing the widget before real data is available.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_007',
        name: 'Notification Formatting',
        status: 'implemented',
        description: 'Automatic formatting of notifications with avatars, time ago strings, and customizable templates. Supports Markdown in messages.',
        implementedIn: 'v1.0.0',
      },
      {
        id: 'feature_008',
        name: 'Multi-Widget Support',
        status: 'implemented',
        description: 'Support multiple widget IDs for managing different websites or pages from a single dashboard. Each widget has independent config and notifications.',
        implementedIn: 'v1.0.0',
      },
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Database Persistence',
        status: 'planned',
        description: 'Replace in-memory storage with a proper database (PostgreSQL/MongoDB) for production use',
        expectedRelease: '2026-Q3',
      },
      {
        id: 'upcoming_002',
        name: 'Real-time Updates',
        status: 'planned',
        description: 'Use WebSockets or Server-Sent Events for real-time notification updates without polling',
        expectedRelease: '2026-Q3',
      },
      {
        id: 'upcoming_003',
        name: 'A/B Testing',
        status: 'planned',
        description: 'Test different widget configurations to optimize conversion rates',
        expectedRelease: '2026-Q4',
      },
      {
        id: 'upcoming_004',
        name: 'Integrations',
        status: 'planned',
        description: 'Pre-built integrations with Stripe, Shopify, WooCommerce, and other platforms',
        expectedRelease: '2026-Q4',
      },
      {
        id: 'upcoming_005',
        name: 'Custom Templates',
        status: 'planned',
        description: 'Allow users to create and save custom notification templates',
        expectedRelease: '2026-Q4',
      },
    ],
    limitations: [
      {
        note: 'Currently uses in-memory storage. Data will be lost on server restart. Database integration is planned.',
      },
      {
        note: 'Widget JavaScript is a basic implementation. Production version should include more features and optimizations.',
      },
      {
        note: 'Analytics data is mock data for demonstration. Real analytics tracking requires database integration.',
      },
    ],
  });
}
