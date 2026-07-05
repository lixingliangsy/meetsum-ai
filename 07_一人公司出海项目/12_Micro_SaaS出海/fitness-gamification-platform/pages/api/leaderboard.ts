import { NextApiRequest, NextApiResponse } from 'next'
import { LeaderboardEntry, UserProfile } from '../../types'

// 用户数据存储（应该 from 数据库，这里为了演示使用共享数据）
// 注意：实际应该在 user.ts 和 leaderboard.ts 之间共享数据存储层
// 为了演示，我们在这里维护一个用户列表的副本

let users: UserProfile[] = [
  {
    id: 'user-002',
    name: '健身王者',
    avatar: '🏋️♂️',
    level: 10,
    points: 12500,
    streak: 45,
    lastActiveDate: '2024-01-15',
    joinedAt: '2023-01-15',
  },
  {
    id: 'user-003',
    name: '瑜伽女神',
    avatar: '🧘♀️',
    level: 8,
    points: 9800,
    streak: 30,
    lastActiveDate: '2024-01-15',
    joinedAt: '2023-03-20',
  },
  {
    id: 'user-001',
    name: '健身达人小王',
    avatar: '🏋️',
    level: 5,
    points: 3750,
    streak: 12,
    lastActiveDate: '2024-01-15',
    joinedAt: '2023-06-01',
  },
  {
    id: 'user-004',
    name: '跑步狂人',
    avatar: '🏃♂️',
    level: 7,
    points: 8200,
    streak: 25,
    lastActiveDate: '2024-01-14',
    joinedAt: '2023-04-10',
  },
  {
    id: 'user-005',
    name: '减脂达人',
    avatar: '💪',
    level: 6,
    points: 6500,
    streak: 18,
    lastActiveDate: '2024-01-15',
    joinedAt: '2023-05-15',
  },
]

// 计算用户的徽章数量（模拟数据）
function getBadgeCount(userId: string): number {
  // 模拟：根据用户ID返回徽章数量
  const badgeCounts: Record<string, number> = {
    'user-001': 4,
    'user-002': 8,
    'user-003': 6,
    'user-004': 5,
    'user-005': 5,
  }
  return badgeCounts[userId] || 0
}

// 计算用户完成的训练次数（模拟数据）
function getWorkoutsCompleted(userId: string): number {
  // 模拟：根据用户ID返回训练次数
  const workoutCounts: Record<string, number> = {
    'user-001': 120,
    'user-002': 320,
    'user-003': 280,
    'user-004': 250,
    'user-005': 180,
  }
  return workoutCounts[userId] || 0
}

// 更新用户数据（从user.ts调用）
export function updateUserPoints(userId: string, newPoints: number) {
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex >= 0) {
    users[userIndex].points = newPoints
    users[userIndex].level = Math.floor(newPoints / 1000) + 1
  }
}

// 获取排行榜数据
function getLeaderboard(): LeaderboardEntry[] {
  // 按积分排序
  const sortedUsers = [...users].sort((a, b) => b.points - a.points)
  
  // 生成排行榜条目
  const leaderboard: LeaderboardEntry[] = sortedUsers.map((user, index) => ({
    rank: index + 1,
    user: user,
    points: user.points,
    badges: getBadgeCount(user.id),
    workoutsCompleted: getWorkoutsCompleted(user.id),
  }))
  
  return leaderboard
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    // 返回排行榜
    const leaderboard = getLeaderboard()
    res.status(200).json(leaderboard)
  } else if (req.method === 'POST') {
    // 更新排行榜（当用户完成训练后调用）
    const { userId, pointsEarned } = req.body
    
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' })
    }
    
    // 更新用户积分
    const user = users.find(u => u.id === userId)
    if (user) {
      user.points += pointsEarned || 0
      user.level = Math.floor(user.points / 1000) + 1
      user.lastActiveDate = new Date().toISOString().split('T')[0]
    }
    
    // 返回更新后的排行榜
    const leaderboard = getLeaderboard()
    res.status(200).json(leaderboard)
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
