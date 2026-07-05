// pages/api/progress.js
// 进度追踪 API - 记录每日完成情况，显示进度条和统计数据

export default function handler(req, res) {
  if (req.method === 'GET') {
    // 获取用户的挑战进度
    const { userId, challengeId } = req.query

    if (!userId || !challengeId) {
      return res.status(400).json({ error: 'Missing userId or challengeId' })
    }

    // 模拟：获取进度数据
    const progress = getProgress(userId, challengeId)

    return res.status(200).json(progress)
  }

  if (req.method === 'POST') {
    // 记录每日完成情况
    const { userId, challengeId, day, completed, notes } = req.body

    if (!userId || !challengeId || !day) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // 模拟：记录进度
    const result = recordProgress(userId, challengeId, day, completed, notes)

    return res.status(200).json(result)
  }

  if (req.method === 'GET' && req.query.stats === 'true') {
    // 获取统计数据
    const { userId, challengeId } = req.query
    const stats = calculateStats(userId, challengeId)

    return res.status(200).json(stats)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

// 获取进度数据
function getProgress(userId, challengeId) {
  // 模拟数据库查询
  const mockProgress = {
    userId: userId,
    challengeId: challengeId,
    startDate: '2026-01-15',
    currentDay: 12,
    totalDays: 30,
    completedDays: 8,
    missedDays: 4,
    streak: 3,
    completionRate: 27, // 百分比
    dailyLogs: [
      { day: 1, completed: true, date: '2026-01-15', notes: '' },
      { day: 2, completed: true, date: '2026-01-16', notes: '' },
      { day: 3, completed: false, date: '2026-01-17', notes: '太累了' },
      { day: 4, completed: true, date: '2026-01-18', notes: '' },
      // ... 更多数据
    ],
    statistics: {
      totalWorkouts: 8,
      totalCalories: 2400,
      averagePace: '5:30',
      bestStreak: 5,
    }
  }

  return mockProgress
}

// 记录进度
function recordProgress(userId, challengeId, day, completed, notes) {
  // 模拟：保存到数据库
  console.log(`Recording progress: User ${userId}, Challenge ${challengeId}, Day ${day}, Completed: ${completed}`)

  return {
    success: true,
    progress: {
      userId: userId,
      challengeId: challengeId,
      day: day,
      completed: completed,
      notes: notes || '',
      recordedAt: new Date().toISOString(),
    }
  }
}

// 计算统计数据
function calculateStats(userId, challengeId) {
  // 模拟统计数据
  return {
    userId: userId,
    challengeId: challengeId,
    overview: {
      totalDays: 30,
      completedDays: 18,
      missedDays: 12,
      completionRate: 60, // 百分比
      currentStreak: 4,
      bestStreak: 7,
    },
    charts: {
      weeklyProgress: [
        { week: 1, planned: 7, completed: 5 },
        { week: 2, planned: 7, completed: 6 },
        { week: 3, planned: 7, completed: 4 },
        { week: 4, planned: 7, completed: 3 },
      ],
      completionTrend: [
        { date: '2026-01-15', count: 1 },
        { date: '2026-01-16', count: 2 },
        { date: '2026-01-17', count: 2 },
        { date: '2026-01-18', count: 3 },
        // ... 更多数据
      ],
    },
    insights: {
      strongestDay: 'Wednesday',
      weakestDay: 'Monday',
      averageWorkoutTime: '45 mins',
      improvementRate: '+12%',
    }
  }
}
