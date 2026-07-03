
// pages/api/features.js
// 功能列表API

export default function handler(req, res) {
  res.status(200).json({
    product: 'ai-changelog',
    features: [
      // TODO: 列出所有已实现的功能
      {
        id: 'feature_001',
        name: 'Example Feature',
        status: 'implemented',
        description: 'Description of the feature'
      }
    ],
    upcoming: [
      // TODO: 列出即将推出的功能
      {
        id: 'upcoming_001',
        name: 'Upcoming Feature',
        status: 'in_development',
        expectedRelease: '2026-Q3'
      }
    ]
  });
}
