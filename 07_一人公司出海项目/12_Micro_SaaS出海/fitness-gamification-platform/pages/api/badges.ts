import { NextApiRequest, NextApiResponse } from 'next'
import { Badge, UserProfile, Challenge, UserChallenge, WorkoutLog } from '../../types'

// 徽章数据
let badges: Badge[] = [
  {
    id: 'badge-001',
    name: '初学者',
    description: '完成第一次训练',
    icon: '🌟',
    category: 'beginner',
    pointsRequired: 0,
    unlockedAt: '2023-06-01',
  },
  {
    id: 'badge-002',
    name: '坚持者',
    description: '连续打卡7天',
    icon: '🔥',
    category: 'beginner',
    pointsRequired: 500,
    unlockedAt: '2023-06-10',
  },
  {
    id: 'badge-003',
    name: '健身爱好者',
    description: '完成50次训练',
    icon: '💪',
    category: 'intermediate',
    pointsRequired: 1000,
    unlockedAt: '2023-08-15',
  },
  {
    id: 'badge-004',
    name: '挑战者',
    description: '完成10个每日挑战',
    icon: '🎯',
    category: 'intermediate',
    pointsRequired: 1500,
    unlockedAt: '2023-09-20',
  },
  {
    id: 'badge-005',
    name: '马拉松跑者',
    description: '累计跑步100公里',
    icon: '🏃',
    category: 'advanced',
    pointsRequired: 3000,
    unlockedAt: undefined,
  },
  {
    id: 'badge-006',
    name: '铁人',
    description: '连续打卡30天',
    icon: '🏆',
    category: 'advanced',
    pointsRequired: 5000,
    unlockedAt: undefined,
  },
  {
    id: 'badge-007',
    name: '健身大师',
    description: '达到等级10',
    icon: '👑',
    category: 'special',
    pointsRequired: 10000,
    unlockedAt: undefined,
  },
  {
    id: 'badge-008',
    name: '社区之星',
    description: '在排行榜上进入前3名',
    icon: '⭐',
    category: 'special',
    pointsRequired: 8000,
    unlockedAt: undefined,
  },
]

// 检查并自动解锁徽章
function checkAndUnlockBadges(
  userId: string,
  user: UserProfile,
  userChallenges: UserChallenge[],
  workoutLogs: WorkoutLog[],
  leaderboardRank: number | null
): Badge[] {
  const updatedBadges = [...badges]
  const now = new Date().toISOString().split('T')[0]
  
  // 1. 初学者 - 已完成第一次训练（检查训练记录）
  if (workoutLogs.filter(w => w.userId === userId).length >= 1) {
    const badge = updatedBadges.find(b => b.id === 'badge-001')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 2. 坚持者 - 连续打卡7天
  if (user.streak >= 7) {
    const badge = updatedBadges.find(b => b.id === 'badge-002')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 3. 健身爱好者 - 完成50次训练
  const totalWorkouts = workoutLogs.filter(w => w.userId === userId).length
  if (totalWorkouts >= 50) {
    const badge = updatedBadges.find(b => b.id === 'badge-003')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 4. 挑战者 - 完成10个每日挑战
  const completedDailyChallenges = userChallenges.filter(
    uc => uc.completed && uc.challengeId.startsWith('challenge-')
  ).length
  if (completedDailyChallenges >= 10) {
    const badge = updatedBadges.find(b => b.id === 'badge-004')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 5. 马拉松跑者 - 累计跑步100公里（假设跑步训练记录在workoutLogs中）
  const totalRunningDistance = workoutLogs
    .filter(w => w.userId === userId && w.type === 'running')
    .reduce((sum, w) => sum + (w.duration || 0), 0) // 简化：使用duration作为距离
  if (totalRunningDistance >= 100000) { // 100公里 = 100000米
    const badge = updatedBadges.find(b => b.id === 'badge-005')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 6. 铁人 - 连续打卡30天
  if (user.streak >= 30) {
    const badge = updatedBadges.find(b => b.id === 'badge-006')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 7. 健身大师 - 达到等级10
  if (user.level >= 10) {
    const badge = updatedBadges.find(b => b.id === 'badge-007')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  // 8. 社区之星 - 在排行榜上进入前3名
  if (leaderboardRank !== null && leaderboardRank <= 3) {
    const badge = updatedBadges.find(b => b.id === 'badge-008')
    if (badge && !badge.unlockedAt) {
      badge.unlockedAt = now
    }
  }
  
  badges = updatedBadges
  return updatedBadges
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    // 返回徽章列表
    const userId = req.query.userId as string || 'user-001'
    
    // 这里应该从数据库获取用户数据、挑战进度、训练记录、排行榜排名
    // 为了简化，我们使用模拟数据
    const mockUser: UserProfile = {
      id: userId,
      name: '健身达人小王',
      avatar: '🏋️',
      level: 5,
      points: 3750,
      streak: 12,
      lastActiveDate: '2024-01-15',
      joinedAt: '2023-06-01',
    }
    
    // 自动检查并解锁徽章
    const updatedBadges = checkAndUnlockBadges(
      userId,
      mockUser,
      [], // userChallenges - 应该从数据库获取
      [], // workoutLogs - 应该从数据库获取
      null // leaderboardRank - 应该从排行榜计算
    )
    
    res.status(200).json(updatedBadges)
  } else if (req.method === 'POST') {
    // 手动解锁徽章（用于测试或管理）
    const { badgeId, userId } = req.body
    
    if (!badgeId || !userId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    
    const badge = badges.find(b => b.id === badgeId)
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' })
    }
    
    if (badge.unlockedAt) {
      return res.status(400).json({ message: 'Badge already unlocked' })
    }
    
    badge.unlockedAt = new Date().toISOString().split('T')[0]
    
    res.status(200).json(badge)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
