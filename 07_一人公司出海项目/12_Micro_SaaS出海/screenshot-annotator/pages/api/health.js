// pages/api/health.js
// 健康检查API

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({
    status: 'healthy',
    product: 'screenshot-annotator',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
