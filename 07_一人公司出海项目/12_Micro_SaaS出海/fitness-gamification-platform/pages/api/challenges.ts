import { NextApiRequest, NextApiResponse } from 'next'
import { Challenge, UserChallenge } from '../../types'

// 挑战任务数据
let challenges: Challenge[] = [
  {
    id: 'challenge-001',
    title: '完成一次力量训练',
    description: '完成至少30分钟的力量训练，锻炼主要肌群',
    points: 100,
    type: 'daily',
    difficulty: 'easy',
    requirement: {
      type: 'workouts',
      target: 1,
    },
    expiresAt: '2024-01-16',
  },
  {
    id: 'challenge-002',
    title: '跑步5公里',
    description: '完成5公里跑步，配速不限',
    points: 150,
    type: 'daily',
    difficulty: 'medium',
    requirement: {
      type: 'steps',
      target: 5000,
    },
    expiresAt: '2024-01-16',
  },
  {
    id: 'challenge-003',
    title: '本周训练3次',
    description: '在一周内完成至少3次训练',
    points: 500,
    type: 'weekly',
    difficulty: 'medium',
    requirement: {
      type: 'workouts',
      target: 3,
    },
    expiresAt: '2024-01-21',
  },
  {
    id: 'challenge-004',
    title: '连续打卡7天',
    description: '保持连续7天训练打卡',
    points: 1000,
    type: 'weekly',
    difficulty: 'hard',
    requirement: {
      type: 'streak',
      target: 7,
    },
    expiresAt: '2024-01-21',
  },
  {
    id: 'challenge-005',
    title: '本月消耗10000卡路里',
    description: '在一个月内通过训练消耗至少10000卡路里',
    points: 2000,
    type: 'monthly',
    difficulty: 'hard',
    requirement: {
      type: 'calories',
      target: 10000,
    },
    expiresAt: '2024-01-31',
  },
]

// 用户挑战进度
let userChallenges: UserChallenge[] = [
  {
    userId: 'user-001',
    challengeId: 'challenge-001',
    progress: 0,
    completed: false,
  },
  {
    userId: 'user-001',
    challengeId: 'challenge-002',
    progress: 3200,
    completed: false,
  },
  {
    userId: 'user-001',
    challengeId: 'challenge-003',
    progress: 2,
    completed: false,
  },
]

// 模拟用户数据存储（实际应该 from 共享存储或数据库）
let users: any[] = [
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
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET') {
    // 返回挑战列表和用户进度
    res.status(200).json({
      challenges: challenges,
      userChallenges: userChallenges.filter(uc => uc.userId === (req.query.userId || 'user-001')),
    })
  } else if (req.method === 'POST') {
    // 完成挑战
    const { challengeId, userId } = req.body
    
    if (!challengeId || !userId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    
    const challenge = challenges.find(c => c.id === challengeId)
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' })
    }
    
    // 查找或创建用户挑战记录
    let userChallenge = userChallenges.find(
      uc => uc.userId === userId && uc.challengeId === challengeId
    )
    
    if (!userChallenge) {
      userChallenge = {
        userId: userId,
        challengeId: challengeId,
        progress: 0,
        completed: false,
      }
      userChallenges.push(userChallenge)
    }
    
    // 更新进度
    userChallenge.progress = challenge.requirement.target
    userChallenge.completed = true
    userChallenge.completedAt = new Date().toISOString()
    
    // 授予积分给用户
    const userIndex = users.findIndex(u => u.id === userId)
    if (userIndex >= 0) {
      users[userIndex].points += challenge.points
      users[userIndex].level = Math.floor(users[userIndex].points / 1000) + 1
      users[userIndex].lastActiveDate = new Date().toISOString().split('T')[0]
    }
    
    // 返回更新后的数据
    res.status(200).json({
      challenges: challenges,
      userChallenges: userChallenges.filter(uc => uc.userId === userId),
      pointsEarned: challenge.points,
      totalPoints: userIndex >= 0 ? users[userIndex].points : 0,
    })
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
