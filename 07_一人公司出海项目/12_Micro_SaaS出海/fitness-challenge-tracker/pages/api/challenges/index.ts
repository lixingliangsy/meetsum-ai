import type { NextApiRequest, NextApiResponse } from 'next'

interface Challenge {
  id: string
  title: string
  description: string
  duration: number
  participants: number
  difficulty: string
  category: string
  createdAt: string
}

// 模拟数据库
let challenges: Challenge[] = [
  {
    id: '1',
    title: '30天俯卧撑挑战',
    description: '从每天10个俯卧撑开始，逐步增加到每天100个',
    duration: 30,
    participants: 156,
    difficulty: 'medium',
    category: '力量',
    createdAt: '2026-01-01'
  },
  {
    id: '2',
    title: '30天跑步挑战',
    description: '从每天1公里开始，逐步增加到每天5公里',
    duration: 30,
    participants: 89,
    difficulty: 'easy',
    category: '有氧',
    createdAt: '2026-01-02'
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Challenge[] | Challenge | { error: string }>
) {
  if (req.method === 'GET') {
    // 获取所有挑战
    return res.status(200).json(challenges)
  }
  
  if (req.method === 'POST') {
    // 创建新挑战
    const { title, description, duration, difficulty, category } = req.body
    
    if (!title || !description || !duration || !difficulty || !category) {
      return res.status(400).json({ error: '缺少必需字段' })
    }
    
    const newChallenge: Challenge = {
      id: Date.now().toString(),
      title,
      description,
      duration: parseInt(duration),
      participants: 0,
      difficulty,
      category,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    challenges.push(newChallenge)
    
    return res.status(201).json(newChallenge)
  }
  
  return res.status(405).json({ error: '方法不支持' })
}
