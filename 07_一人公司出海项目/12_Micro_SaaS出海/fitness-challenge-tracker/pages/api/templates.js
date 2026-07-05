// pages/api/templates.js
// 挑战模板 API - 提供预设挑战模板（减脂、增肌、耐力等）

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { category, difficulty } = req.query

    // 获取所有模板
    let templates = getAllTemplates()

    // 按类别过滤
    if (category) {
      templates = templates.filter(t => t.category === category)
    }

    // 按难度过滤
    if (difficulty) {
      templates = templates.filter(t => t.difficulty === difficulty)
    }

    res.status(200).json({
      success: true,
      total: templates.length,
      templates: templates,
    })
  } catch (error) {
    console.error('Templates error:', error)
    res.status(500).json({ error: 'Failed to get templates', details: error.message })
  }
}

// 获取所有模板
function getAllTemplates() {
  return [
    {
      id: 'tpl-001',
      title: '30天减脂挑战',
      description: '通过有氧运动和饮食控制，30天减脂5-8公斤',
      category: '减脂',
      difficulty: 'medium',
      duration: 30,
      dailyWorkout: '45分钟有氧 + 20分钟力量训练',
      caloriesBurn: '400-600/天',
      tips: ['控制饮食', '多喝水', '保证睡眠'],
      image: '/templates/weight-loss.jpg',
    },
    {
      id: 'tpl-002',
      title: '30天增肌挑战',
      description: '通过力量训练和蛋白质补充，30天增肌2-3公斤',
      category: '增肌',
      difficulty: 'hard',
      duration: 30,
      dailyWorkout: '60分钟力量训练 + 15分钟有氧',
      caloriesBurn: '300-400/天',
      tips: ['增加蛋白质摄入', '渐进超负荷', '充足休息'],
      image: '/templates/muscle-gain.jpg',
    },
    {
      id: 'tpl-003',
      title: '30天耐力挑战',
      description: '通过长跑和游泳，30天提升耐力，完成首个10K',
      category: '耐力',
      difficulty: 'medium',
      duration: 30,
      dailyWorkout: '30-60分钟有氧运动',
      caloriesBurn: '500-800/天',
      tips: ['循序渐进', '注意跑步姿势', '拉伸放松'],
      image: '/templates/endurance.jpg',
    },
    {
      id: 'tpl-004',
      title: '30天柔韧性挑战',
      description: '通过瑜伽和拉伸，30天提升身体柔韧性',
      category: '柔韧',
      difficulty: 'easy',
      duration: 30,
      dailyWorkout: '30分钟瑜伽/拉伸',
      caloriesBurn: '150-250/天',
      tips: ['不要勉强', '保持呼吸', '坚持每天练习'],
      image: '/templates/flexibility.jpg',
    },
    {
      id: 'tpl-005',
      title: '30天核心挑战',
      description: '强化核心肌群，改善体态，减少腰背疼痛',
      category: '力量',
      difficulty: 'medium',
      duration: 30,
      dailyWorkout: '20分钟核心训练',
      caloriesBurn: '200-300/天',
      tips: ['保持正确姿势', '控制呼吸', '逐步增加难度'],
      image: '/templates/core.jpg',
    },
    {
      id: 'tpl-006',
      title: '7天快速启动挑战',
      description: '适合初学者的短期挑战，建立运动习惯',
      category: '通用',
      difficulty: 'easy',
      duration: 7,
      dailyWorkout: '30分钟全身训练',
      caloriesBurn: '200-350/天',
      tips: ['不要放弃', '记录进度', '寻找伙伴'],
      image: '/templates/starter.jpg',
    },
  ]
}
