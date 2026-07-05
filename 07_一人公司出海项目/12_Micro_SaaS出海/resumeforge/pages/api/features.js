
// pages/api/features.js
// 功能列表API

export default function handler(req, res) {
  res.status(200).json({
    product: 'resumeforge',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'Resume Parsing (简历解析)',
        status: 'implemented',
        description: 'Parse PDF and Word resumes to extract key information including personal info, experience, education, and skills.',
        endpoints: ['/api/parse (POST)']
      },
      {
        id: 'feature_002',
        name: 'AI Optimization (AI 优化建议)',
        status: 'implemented',
        description: 'Analyze resume content and provide optimization suggestions for keywords, format, and structure. Includes ATS compatibility check.',
        endpoints: ['/api/optimize (POST)']
      },
      {
        id: 'feature_003',
        name: 'PDF Export (PDF 导出)',
        status: 'implemented',
        description: 'Export optimized resume to PDF format with professional templates.',
        endpoints: ['/api/export-pdf (POST)']
      },
      {
        id: 'feature_004',
        name: 'Word Export (Word 导出)',
        status: 'implemented',
        description: 'Export optimized resume to Word (.docx) format for easy editing.',
        endpoints: ['/api/export-word (POST)']
      },
      {
        id: 'feature_005',
        name: 'ATS Compatibility Check (ATS 兼容性检查)',
        status: 'implemented',
        description: 'Check resume compatibility with Applicant Tracking Systems (ATS) and provide optimization tips.',
        endpoints: ['/api/optimize (POST)']
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Multiple Templates (多模板支持)',
        status: 'planned',
        expectedRelease: '2024-Q2',
        description: 'Support multiple professional resume templates.'
      },
      {
        id: 'upcoming_002',
        name: 'Cover Letter Generator (求职信生成器)',
        status: 'planned',
        expectedRelease: '2024-Q2',
        description: 'Generate customized cover letters based on job description.'
      }
    ]
  });
}
