// pages/api/health.js
// 健康检查API

export default function handler(req, res) {
  // Ensure UTF-8 encoding
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  res.status(200).json({
    status: 'healthy',
    product: 'social-proof-widget',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
