
// pages/api/features.js
// 功能列表API

export default function handler(req, res) {
  res.status(200).json({
    product: 'articlesumm-pro',
    features: [
      {
        id: 'feature_001',
        name: '多格式输入支持',
        status: 'implemented',
        description: '支持PDF、URL和纯文本输入，自动解析内容'
      },
      {
        id: 'feature_002',
        name: 'AI智能摘要',
        status: 'implemented',
        description: '使用OpenAI API生成准确、简洁的文章摘要'
      },
      {
        id: 'feature_003',
        name: '多种摘要长度',
        status: 'implemented',
        description: '支持短摘要（150字）、中摘要（300字）、长摘要（500字）'
      },
      {
        id: 'feature_004',
        name: '关键要点提取',
        status: 'implemented',
        description: '自动提取文章关键发现和结论（5-7个要点）'
      },
      {
        id: 'feature_005',
        name: '引用格式生成',
        status: 'implemented',
        description: '自动生成APA、MLA、Chicago、BibTeX格式引用'
      },
      {
        id: 'feature_006',
        name: 'Mock模式',
        status: 'implemented',
        description: '无需API密钥即可测试功能，使用模拟数据'
      },
      {
        id: 'feature_007',
        name: '响应式设计',
        status: 'implemented',
        description: '支持桌面端和移动端，提供最佳用户体验'
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: '批量处理',
        status: 'in_development',
        expectedRelease: '2026-Q3'
      },
      {
        id: 'upcoming_002',
        name: '历史记录',
        status: 'in_development',
        expectedRelease: '2026-Q3'
      },
      {
        id: 'upcoming_003',
        name: '导出选项',
        status: 'in_development',
        expectedRelease: '2026-Q4'
      }
    ]
  });
}
