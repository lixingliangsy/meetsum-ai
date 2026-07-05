
// pages/api/features.js
// 功能列表API

export default function handler(req, res) {
  res.status(200).json({
    product: 'ai-fitness-planner',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'AI Plan Generation (AI 计划生成)',
        status: 'implemented',
        description: 'Generate personalized fitness plans using AI (NVIDIA API or OpenAI API). Supports multiple goals, fitness levels, equipment options, and limitations.',
        endpoints: ['/api/plan/generate (POST)']
      },
      {
        id: 'feature_002',
        name: 'Multiple Goal Support (多目标支持)',
        status: 'implemented',
        description: 'Support for multiple fitness goals: weight loss, muscle gain, endurance, strength, flexibility, and general fitness.',
        endpoints: ['/api/plan/generate (POST)']
      },
      {
        id: 'feature_003',
        name: 'Equipment Adaptation (设备适配)',
        status: 'implemented',
        description: 'Adapt plans based on available equipment: none (bodyweight), dumbbells, barbell, resistance bands, pull-up bar, or full gym.',
        endpoints: ['/api/plan/generate (POST)']
      },
      {
        id: 'feature_004',
        name: 'Limitation-Aware Planning (考虑身体限制)',
        status: 'implemented',
        description: 'Generate plans that account for physical limitations or injuries, ensuring safe and effective workouts.',
        endpoints: ['/api/plan/generate (POST)']
      },
      {
        id: 'feature_005',
        name: 'Mock Mode (测试模式)',
        status: 'implemented',
        description: 'Generate sample fitness plans without API key for testing and demonstration purposes.',
        endpoints: ['/api/plan/generate (POST)']
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Progress Tracking (进度追踪)',
        status: 'planned',
        expectedRelease: '2024-Q2',
        description: 'Track workout completion and progress over time.'
      },
      {
        id: 'upcoming_002',
        name: 'Exercise Video Library (动作视频库)',
        status: 'planned',
        expectedRelease: '2024-Q2',
        description: 'Access video demonstrations for each exercise in the plan.'
      }
    ]
  });
}
