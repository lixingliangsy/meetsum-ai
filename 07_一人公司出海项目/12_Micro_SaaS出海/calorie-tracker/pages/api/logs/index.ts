import type { NextApiRequest, NextApiResponse } from 'next'

interface FoodLog {
  id: string
  foodId: string
  foodName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  mealType: string
  date: string
  servings: number
}

// 模拟数据库
let foodLogs: FoodLog[] = [
  {
    id: '1',
    foodId: '1',
    foodName: '燕麦粥',
    calories: 300,
    protein: 10,
    carbs: 54,
    fat: 5,
    mealType: 'breakfast',
    date: '2026-01-01',
    servings: 1
  }
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FoodLog[] | FoodLog | { error: string }>
) {
  if (req.method === 'GET') {
    const { date } = req.query
    
    if (date && typeof date === 'string') {
      const logs = foodLogs.filter(log => log.date === date)
      return res.status(200).json(logs)
    }
    
    return res.status(200).json(foodLogs)
  }
  
  if (req.method === 'POST') {
    const { foodId, foodName, calories, protein, carbs, fat, mealType, date, servings } = req.body
    
    if (!foodId || !foodName || !calories || !mealType || !date) {
      return res.status(400).json({ error: '缺少必需字段' })
    }
    
    const newLog: FoodLog = {
      id: Date.now().toString(),
      foodId,
      foodName,
      calories: calories * (servings || 1),
      protein: protein * (servings || 1),
      carbs: carbs * (servings || 1),
      fat: fat * (servings || 1),
      mealType,
      date,
      servings: servings || 1
    }
    
    foodLogs.push(newLog)
    
    return res.status(201).json(newLog)
  }
  
  if (req.method === 'DELETE') {
    const { id } = req.query
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: '缺少ID' })
    }
    
    foodLogs = foodLogs.filter(log => log.id !== id)
    
    return res.status(204).end()
  }
  
  return res.status(405).json({ error: '方法不支持' })
}
