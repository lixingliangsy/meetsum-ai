
// pages/api/features.js
// 功能列表API

export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({
    product: 'fitness-gamification-platform',
    version: '1.0.0',
    features: [
      {
        id: 'feature_001',
        name: 'Points System (积分系统)',
        status: 'implemented',
        description: 'Users earn points by completing workouts and challenges. Base points: 100 per workout. Bonus points for duration and calories burned.',
        endpoints: ['/api/user (POST)']
      },
      {
        id: 'feature_002',
        name: 'Achievement Badges (徽章成就系统)',
        status: 'implemented',
        description: 'Auto-unlock achievement bades when conditions are met. 8 bades total across 4 categories (Beginner, Intermediate, Advanced, Special).',
        endpoints: ['/api/badges (GET, POST)']
      },
      {
        id: 'feature_003',
        name: 'Leaderboard (排行榜)',
        status: 'implemented',
        description: 'Real-time leaderboard ranked by total points. Shows user rank, points, bades count, and workouts completed. Top 3 get special medals.',
        endpoints: ['/api/leaderboard (GET, POST)']
      },
      {
        id: 'feature_004',
        name: 'Challenge Tasks (挑战任务)',
        status: 'implemented',
        description: 'Daily, weekly, and monthly challenges with bonus points. Three difficulty levels (Easy, Medium, Hard).',
        endpoints: ['/api/challenges (GET, POST)']
      },
      {
        id: 'feature_005',
        name: 'User Profile (用户档案)',
        status: 'implemented',
        description: 'Track user level, points, streak, and progress to next level. View workout history and unlocked bades.',
        endpoints: ['/api/user (GET, POST)']
      }
    ],
    upcoming: [
      {
        id: 'upcoming_001',
        name: 'Social Guilds (社交公会)',
        status: 'in_development',
        expectedRelease: '2024-Q2',
        description: 'Join fitness communities and collaborate with friends.'
      },
      {
        id: 'upcoming_002',
        name: 'Workout Plans (训练计划)',
        status: 'planned',
        expectedRelease: '2024-Q3',
        description: 'Personalized workout plans based on your goals and progress.'
      }
    ]
  });
}
