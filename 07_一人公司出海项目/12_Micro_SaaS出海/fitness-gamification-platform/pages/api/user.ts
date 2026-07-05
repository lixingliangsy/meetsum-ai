import { NextApiRequest, NextApiResponse } from 'next'
import { UserProfile, WorkoutLog } from '../../types'

// 用户数据存储（生产环境应使用数据库）
let users: UserProfile[] = [
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
]

// 训练记录存储
let workoutLogs: WorkoutLog[] = []

// 计算等级
function calculateLevel(points: number): number {
  return Math.floor(points / 1000) + 1
}

// 计算连续打卡天数
function calculateStreak(lastActiveDate: string): number {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  
  if (lastActiveDate === today || lastActiveDate === yesterday) {
    return 1 // 至少需要进一步逻辑来真正计算连续天数
  }
  return 0
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    // 返回用户档案
    const userId = req.query.userId as string || 'user-001'
    const user = users.find(u => u.id === userId)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    res.status(200).json(user)
  } else if (req.method === 'POST') {
    // 记录训练并完成训练后获得积分
    const { userId, workoutType, duration, calories } = req.body
    
    if (!userId || !workoutType) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    
    const user = users.find(u => u.id === userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    
    // 计算获得的积分
    // 基础积分：每次训练100分
    // 时长奖励：每分钟1分
    // 卡路里奖励：每消耗1卡路里0.5分
    const basePoints = 100
    const durationPoints = duration ? Math.floor(duration / 60) : 0 // 每分钟1分
    const caloriesPoints = calories ? Math.floor(calories * 0.5) : 0
    const totalPoints = basePoints + durationPoints + caloriesPoints
    
    // 更新用户积分
    user.points += totalPoints
    user.level = calculateLevel(user.points)
    user.lastActiveDate = new Date().toISOString().split('T')[0]
    
    // 更新连续打卡天数
    const lastActive = new Date(user.lastActiveDate)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (user.lastActiveDate === yesterday.toISOString().split('T')[0] || 
        user.lastActiveDate === today.toISOString().split('T')[0]) {
      user.streak += 1
    } else {
      user.streak = 1
    }
    
    // 记录训练日志
    const workoutLog: WorkoutLog = {
      id: `workout-${Date.now()}`,
      userId: userId,
      type: workoutType,
      duration: duration || 0,
      calories: calories || 0,
      points: totalPoints,
      completedAt: new Date().toISOString(),
    }
    
    workoutLogs.push(workoutLog)
    
    // 返回更新后的用户数据和训练记录
    res.status(200).json({
      user,
      workoutLog,
      pointsEarned: totalPoints,
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
