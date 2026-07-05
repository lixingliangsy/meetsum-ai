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

// 模拟数据库（应该从index.ts导入，这里为了简化重复定义）
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
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Challenge | { error: string }>
) {
  const { id } = req.query
  
  const challengeIndex = challenges.findIndex(c => c.id === id)
  
  if (challengeIndex === -1) {
    return res.status(404).json({ error: '挑战不存在' })
  }
  
  if (req.method === 'GET') {
    // 获取单个挑战
    return res.status(200).json(challenges[challengeIndex])
  }
  
  if (req.method === 'PUT') {
    // 更新挑战
    const { title, description, duration, difficulty, category } = req.body
    
    if (title) challenges[challengeIndex].title = title
    if (description) challenges[challengeIndex].description = description
    if (duration) challenges[challengeIndex].duration = parseInt(duration)
    if (difficulty) challenges[challengeIndex].difficulty = difficulty
    if (category) challenges[challengeIndex].category = category
    
    return res.status(200).json(challenges[challengeIndex])
  }
  
  if (req.method === 'DELETE') {
    // 删除挑战
    challenges = challenges.filter(c => c.id !== id)
    return res.status(204).end()
  }
  
  return res.status(405).json({ error: '方法不支持' })
}
