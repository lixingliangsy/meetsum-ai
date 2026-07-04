
// pages/api/export.js
// 数据导出API - social-proof-widget

export default async function handler(req, res) {
  // Set UTF-8 charset for all responses
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // TODO: 添加认证
    // const session = await getSession({ req });
    // if (!session) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    // 模拟：获取用户数据
    const userData = await fetchUserData();
    
    const format = req.query.format || 'json';
    
    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="social-proof-widget-data-${Date.now()}.json"`);
      res.status(200).json(userData);
    } else if (format === 'csv') {
      const csv = convertToCSV(userData);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="social-proof-widget-data-${Date.now()}.csv"`);
      res.status(200).send(csv);
    } else {
      res.status(400).json({ error: 'Invalid format. Use json or csv.' });
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchUserData() {
  // TODO: 从数据库获取实际数据
  return {
    product: 'social-proof-widget',
    exportDate: new Date().toISOString(),
    data: []
  };
}

function convertToCSV(data) {
  // TODO: 根据实际数据格式生成CSV
  return 'ID,Name,Created At\n';
}
