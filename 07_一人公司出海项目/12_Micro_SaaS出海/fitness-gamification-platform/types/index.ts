// 用户档案
export interface UserProfile {
  id: string
  name: string
  avatar: string
  level: number
  points: number
  streak: number
  lastActiveDate: string
  joinedAt: string
}

// 徽章成就
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: 'beginner' | 'intermediate' | 'advanced' | 'special'
  pointsRequired: number
  unlockedAt?: string
}

// 用户徽章关联
export interface UserBadge {
  userId: string
  badgeId: string
  unlockedAt: string
}

// 挑战任务
export interface Challenge {
  id: string
  title: string
  description: string
  points: number
  type: 'daily' | 'weekly' | 'monthly'
  difficulty: 'easy' | 'medium' | 'hard'
  requirement: {
    type: 'workouts' | 'steps' | 'calories' | 'streak'
    target: number
  }
  expiresAt: string
}

// 用户挑战进度
export interface UserChallenge {
  userId: string
  challengeId: string
  progress: number
  completed: boolean
  completedAt?: string
}

// 排行榜条目
export interface LeaderboardEntry {
  rank: number
  user: UserProfile
  points: number
  badges: number
  workoutsCompleted: number
}

// 训练记录
export interface WorkoutLog {
  id: string
  userId: string
  type: string
  duration: number
  calories: number
  points: number
  completedAt: string
}
