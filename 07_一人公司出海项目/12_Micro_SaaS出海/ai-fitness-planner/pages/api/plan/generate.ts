import type { NextApiRequest, NextApiResponse } from 'next'

interface GenerateRequest {
  goal: string
  fitnessLevel: string
  availableDays: string
  equipment: string
  limitations: string
}

interface GenerateResponse {
  plan: string
  tips: string[]
}

interface ErrorResponse {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' })
  }

  const { goal, fitnessLevel, availableDays, equipment, limitations } = req.body as GenerateRequest

  // 验证必需字段
  if (!goal || !fitnessLevel || !availableDays) {
    return res.status(400).json({ error: '缺少必需字段' })
  }

  // 检查API密钥（优先NVIDIA，然后OpenAI）
  const nvidiaApiKey = process.env.NVIDIA_API_KEY
  const openaiApiKey = process.env.OPENAI_API_KEY
  const useNvidia = !!nvidiaApiKey
  
  if (!nvidiaApiKey && !openaiApiKey) {
    // Mock模式：返回模拟数据
    const mockPlan = generateMockPlan(goal, fitnessLevel, availableDays, equipment, limitations)
    return res.status(200).json({
      plan: mockPlan,
      tips: ['训练前请充分热身', '注意动作标准性，避免受伤', '循序渐进，不要急于求成']
    })
  }
  
  try {
    // 构建提示词
    const prompt = `作为一个专业的健身教练，请为用户生成一个详细的健身计划。

用户需求：
- 健身目标：${getGoalText(goal)}
- 健身水平：${getFitnessLevelText(fitnessLevel)}
- 每周可用天数：${availableDays}天
- 可用设备：${getEquipmentText(equipment)}
- 身体限制：${limitations || '无'}

请生成一个包含以下内容的健身计划：
1. 每周训练安排（具体哪天练什么）
2. 每次训练的具体内容（动作、组数、次数）
3. 热身和拉伸建议
4. 饮食建议
5. 进度追踪方法

请用中文回复，格式清晰，易于理解。`

    let planText: string
    
    if (useNvidia) {
      // 调用NVIDIA API
      const nvidiaModel = process.env.NVIDIA_MODEL || 'meta/llama-3.1-8b-instruct'
      const nvidiaBaseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1'
      
      console.log('Calling NVIDIA API...', { model: nvidiaModel, baseUrl: nvidiaBaseUrl })
      
      try {
        const response = await fetch(`${nvidiaBaseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${nvidiaApiKey}`
          },
          body: JSON.stringify({
            model: nvidiaModel,
            messages: [
              {
                role: 'system',
                content: '你是一个专业的健身教练，擅长制定个性化健身计划。'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 2000
          })
        })
        
        console.log('NVIDIA API response status:', response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.error('NVIDIA API error:', errorText)
          throw new Error(`NVIDIA API调用失败: ${response.status} ${errorText}`)
        }
        
        const data = await response.json()
        planText = data.choices[0].message.content
        console.log('NVIDIA API success, plan length:', planText.length)
      } catch (error) {
        console.error('NVIDIA API call failed:', error)
        throw error
      }
    } else {
      // 调用OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的健身教练，擅长制定个性化健身计划。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'OpenAI API调用失败')
      }
      
      const data = await response.json()
      planText = data.choices[0].message.content
    }

    // 提取提示（简单处理：从计划中提取关键点作为提示）
    const tips = extractTips(planText)

    return res.status(200).json({
      plan: planText,
      tips: tips
    })
  } catch (error: any) {
    console.error('生成计划错误:', error)
    return res.status(500).json({ 
      error: error.message || '生成计划时发生错误' 
    })
  }
}

// 辅助函数
function getGoalText(goal: string): string {
  const goalMap: Record<string, string> = {
    'weight_loss': '减脂',
    'muscle_gain': '增肌',
    'endurance': '增强耐力',
    'strength': '增强力量',
    'flexibility': '提高柔韧性',
    'general_fitness': '整体健身'
  }
  return goalMap[goal] || goal
}

function getFitnessLevelText(level: string): string {
  const levelMap: Record<string, string> = {
    'beginner': '初学者',
    'intermediate': '中级',
    'advanced': '高级'
  }
  return levelMap[level] || level
}

function getEquipmentText(equipment: string): string {
  const equipmentMap: Record<string, string> = {
    'none': '无设备（徒手训练）',
    'dumbbells': '哑铃',
    'barbell': '杠铃',
    'resistance_bands': '弹力带',
    'pull_up_bar': '引体向上杆',
    'full_gym': '全套健身房设备'
  }
  return equipmentMap[equipment] || '无'
}

function extractTips(planText: string): string[] {
  // 简单提取提示：查找包含"提示"、"注意"、"建议"等关键词的句子
  const tips: string[] = []
  const sentences = planText.split(/[。！？\n]/)
  
  for (const sentence of sentences) {
    if (sentence.includes('提示') || sentence.includes('注意') || sentence.includes('建议') || sentence.includes('重要')) {
      const trimmed = sentence.trim()
      if (trimmed.length > 10 && trimmed.length < 200) {
        tips.push(trimmed)
      }
    }
  }
  
  // 如果没有提取到提示，返回默认提示
  if (tips.length === 0) {
    tips.push('训练前请充分热身', '注意动作标准性，避免受伤', '循序渐进，不要急于求成', '保持充足睡眠和营养摄入')
  }
  
  return tips.slice(0, 5) // 最多返回5个提示
}

// Mock计划生成函数（无API Key时使用）
function generateMockPlan(goal: string, fitnessLevel: string, availableDays: string, equipment: string, limitations: string): string {
  const goalText = getGoalText(goal)
  const levelText = getFitnessLevelText(fitnessLevel)
  const equipmentText = getEquipmentText(equipment)
  
  return `# ${goalText}训练计划

## 训练安排

**每周训练${availableDays}天**

### 星期一：上肢训练
- 热身：5-10分钟有氧
- 主训练：
  - 俯卧撑 3组 x 10-15次
  - 哑铃卧推 3组 x 12次
  - 划船 3组 x 12次
- 拉伸：5-10分钟

### 星期三：下肢训练
- 热身：5-10分钟有氧
- 主训练：
  - 深蹲 3组 x 15次
  - 箭步蹲 3组 x 12次（每腿）
  - 提踵 3组 x 20次
- 拉伸：5-10分钟

### 星期五：核心训练
- 热身：5-10分钟有氧
- 主训练：
  - 平板支撑 3组 x 30-60秒
  - 卷腹 3组 x 20次
  - 俄罗斯转体 3组 x 20次
- 拉伸：5-10分钟

## 饮食建议
- 蛋白质摄入：1.5-2g/kg体重
- 碳水化合物：训练前后适量补充
- 水分：每天至少2L水

## 注意事项
- 渐进超负荷：逐步增加重量或次数
- 休息：每晚7-8小时睡眠
- 记录：追踪训练进度

---
*这是模拟计划。配置NVIDIA API或OpenAI API后可生成个性化计划。*`
}
