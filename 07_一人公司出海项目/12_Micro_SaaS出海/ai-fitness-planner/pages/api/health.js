
// pages/api/health.js
// 健康检查API

export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    product: 'ai-fitness-planner',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
