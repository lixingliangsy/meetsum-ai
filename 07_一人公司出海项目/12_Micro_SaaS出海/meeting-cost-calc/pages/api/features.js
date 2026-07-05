
// pages/api/features.js
// 功能列表API - 更新为反映已实现的功能

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({
    product: 'meeting-cost-calc',
    version: '1.0.0',
    status: 'active',
    features: [
      {
        id: 'feature_001',
        name: 'Meeting Cost Calculator',
        status: 'implemented',
        description: 'Calculate meeting costs based on attendee count, average salary, and meeting duration',
        implementedAt: '2026-07-01'
      },
      {
        id: 'feature_002',
        name: 'Real-Time Timer',
        status: 'implemented',
        description: 'Start, pause, and reset timer to track meeting costs in real-time',
        implementedAt: '2026-07-01'
      },
      {
        id: 'feature_003',
        name: 'Cost Visualization Charts',
        status: 'implemented',
        description: 'Interactive charts showing cost accumulation over time and cost distribution by attendee using Chart.js',
        implementedAt: '2026-07-01'
      },
      {
        id: 'feature_004',
        name: 'Meeting Type Selection',
        status: 'implemented',
        description: 'Support for different meeting types (internal, client, interview, training)',
        implementedAt: '2026-07-01'
      },
      {
        id: 'feature_005',
        name: 'Meeting Insights',
        status: 'implemented',
        description: 'Display cost per minute, annual cost projection, and potential savings calculations',
        implementedAt: '2026-07-01'
      },
      {
        id: 'feature_006',
        name: 'Cost History Tracking',
        status: 'implemented',
        description: 'Track and display cost history during real-time timer sessions',
        implementedAt: '2026-07-01'
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Slack Integration',
        status: 'planned',
        expectedRelease: '2026-Q3',
        description: 'Integrate with Slack to automatically track meeting costs from Slack calls'
      },
      {
        id: 'upcoming_002',
        name: 'Team Analytics Dashboard',
        status: 'in_development',
        expectedRelease: '2026-Q4',
        description: 'Full analytics dashboard showing team meeting costs, trends, and optimization suggestions'
      },
      {
        id: 'upcoming_003',
        name: 'AI-Powered Meeting Suggestions',
        status: 'planned',
        expectedRelease: '2027-Q1',
        description: 'Get AI suggestions on which meetings could be async or cancelled'
      }
    ],
    technologies: [
      'Next.js 14',
      'React 18',
      'Chart.js 4',
      'react-chartjs-2',
      'Tailwind CSS'
    ]
  });
}
