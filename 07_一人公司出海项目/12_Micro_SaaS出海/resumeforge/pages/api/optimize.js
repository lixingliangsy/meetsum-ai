// pages/api/optimize.js
// AI 优化建议 API - 分析简历内容，给出优化建议

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { resumeData, jobDescription } = req.body

    if (!resumeData) {
      return res.status(400).json({ error: 'Missing resume data' })
    }

    // 分析简历并生成优化建议
    const analysis = analyzeResume(resumeData, jobDescription)

    res.status(200).json({
      success: true,
      analysis: analysis,
    })
  } catch (error) {
    console.error('Optimize error:', error)
    res.status(500).json({ error: 'Failed to analyze resume', details: error.message })
  }
}

// 分析简历内容，生成优化建议
function analyzeResume(resumeData, jobDescription) {
  const suggestions = []
  const keywords = []
  const improvements = []
  let score = 0

  // 1. 检查个人信息完整性
  if (resumeData.personalInfo) {
    if (!resumeData.personalInfo.name) {
      suggestions.push({
        category: '个人信息',
        priority: 'high',
        issue: '缺少姓名',
        suggestion: '请添加您的姓名在简历顶部',
      })
    } else {
      score += 10
    }

    if (!resumeData.personalInfo.email) {
      suggestions.push({
        category: '个人信息',
        priority: 'high',
        issue: '缺少邮箱',
        suggestion: '请添加您的邮箱地址',
      })
    } else {
      score += 10
    }

    if (!resumeData.personalInfo.phone) {
      suggestions.push({
        category: '个人信息',
        priority: 'medium',
        issue: '缺少电话',
        suggestion: '建议添加您的联系电话',
      })
    } else {
      score += 5
    }
  }

  // 2. 检查摘要/个人简介
  if (!resumeData.summary || resumeData.summary.length < 50) {
    suggestions.push({
      category: '摘要',
      priority: 'high',
      issue: '缺少个人摘要或摘要过短',
      suggestion: '添加一个2-3句的专业摘要，突出您的核心竞争力和职业目标',
    })
  } else {
    score += 15
    if (resumeData.summary.length > 200) {
      suggestions.push({
        category: '摘要',
        priority: 'low',
        issue: '摘要过长',
        suggestion: '建议将摘要控制在2-3句话（约150-200字符）',
      })
    }
  }

  // 3. 检查工作经验
  if (!resumeData.experience || resumeData.experience.length === 0) {
    suggestions.push({
      category: '工作经验',
      priority: 'high',
      issue: '缺少工作经验',
      suggestion: '请添加您的工作经历，包括公司名称、职位、工作时间和主要职责',
    })
  } else {
    score += 20
    const expCount = resumeData.experience.length
    if (expCount < 2) {
      suggestions.push({
        category: '工作经验',
        priority: 'medium',
        issue: '工作经验较少',
        suggestion: '考虑添加实习、志愿者或项目经验来丰富您的工作经历',
      })
    }

    // 检查是否有量化成果
    const hasMetrics = JSON.stringify(resumeData.experience).match(/\d+%|\d+ 人|\d+ 万|\d+ 个/)
    if (!hasMetrics) {
      suggestions.push({
        category: '工作经验',
        priority: 'medium',
        issue: '缺少量化成果',
        suggestion: '在工作描述中添加量化成果，例如："提升销售额30%"、"管理10人团队"',
      })
    } else {
      score += 10
    }
  }

  // 4. 检查技能列表
  if (!resumeData.skills || resumeData.skills.length === 0) {
    suggestions.push({
      category: '技能',
      priority: 'high',
      issue: '缺少技能列表',
      suggestion: '请添加您的专业技能，包括编程语言、工具、框架等',
    })
  } else {
    score += 15
    if (resumeData.skills.length < 5) {
      suggestions.push({
        category: '技能',
        priority: 'medium',
        issue: '技能列表较少',
        suggestion: '建议列出8-12项相关技能，包括硬技能和软技能',
      })
    } else if (resumeData.skills.length >= 8) {
      score += 5
    }
  }

  // 5. 检查教育背景
  if (!resumeData.education || resumeData.education.length === 0) {
    suggestions.push({
      category: '教育背景',
      priority: 'medium',
      issue: '缺少教育背景',
      suggestion: '请添加您的教育经历，包括学位、学校名称和毕业年份',
    })
  } else {
    score += 10
  }

  // 6. 关键词分析（如果提供了职位描述）
  if (jobDescription) {
    const jobKeywords = extractKeywords(jobDescription)
    const resumeText = JSON.stringify(resumeData).toLowerCase()
    
    const matchedKeywords = jobKeywords.filter(kw => 
      resumeText.includes(kw.toLowerCase())
    )
    const missingKeywords = jobKeywords.filter(kw => 
      !resumeText.includes(kw.toLowerCase())
    )

    keywords.push({
      category: '匹配关键词',
      keywords: matchedKeywords,
    })
    keywords.push({
      category: '缺失关键词',
      keywords: missingKeywords.slice(0, 10),
      suggestion: '考虑在简历中添加这些关键词，以提高ATS系统的匹配度',
    })

    score += Math.min(matchedKeywords.length * 2, 15)
  }

  // 7. 格式和结构建议
  improvements.push({
    category: '格式优化',
    suggestions: [
      '使用清晰的标题和分段',
      '保持一致的日期格式',
      '使用项目符号列表而不是段落',
      '确保字体大小一致（正文10-12号）',
    ],
  })

  improvements.push({
    category: '内容优化',
    suggestions: [
      '使用行动动词开头（如"开发"、"管理"、"优化"）',
      '突出成就而不是职责',
      '针对每个职位定制简历内容',
      '删除过时或不相关的工作经历',
    ],
  })

  // 计算总分（满分100）
  score = Math.min(score, 100)

  return {
    score: score,
    rating: score >= 80 ? '优秀' : score >= 60 ? '良好' : score >= 40 ? '一般' : '需要改进',
    suggestions: suggestions,
    keywords: keywords,
    improvements: improvements,
    atsCompatibility: {
      score: calculateATSCompatibility(resumeData),
      tips: [
        '使用标准字体（Arial, Calibri, Times New Roman）',
        '避免使用表格、文本框或特殊字符',
        '使用标准的章节标题（Experience, Education, Skills）',
        '保存为PDF格式以确保格式不变',
      ],
    },
  }
}

// 提取关键词（简化版）
function extractKeywords(jobDescription) {
  const commonKeywords = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Node.js',
    'SQL', 'AWS', 'Docker', 'Kubernetes', 'Agile', 'Scrum',
    'Leadership', 'Communication', 'Problem Solving', 'Team Work',
    'Project Management', 'Data Analysis', 'Machine Learning',
  ]

  const found = commonKeywords.filter(kw => 
    jobDescription.toLowerCase().includes(kw.toLowerCase())
  )

  return found.length > 0 ? found : commonKeywords.slice(0, 5)
}

// 计算 ATS 兼容性分数
function calculateATSCompatibility(resumeData) {
  let score = 50 // 基础分

  // 有清晰的章节标题
  score += 10

  // 有标准联系方式
  if (resumeData.personalInfo && resumeData.personalInfo.email) {
    score += 10
  }

  // 有技能列表
  if (resumeData.skills && resumeData.skills.length > 0) {
    score += 10
  }

  // 有工作经验
  if (resumeData.experience && resumeData.experience.length > 0) {
    score += 10
  }

  // 有教育背景
  if (resumeData.education && resumeData.education.length > 0) {
    score += 10
  }

  return Math.min(score, 100)
}
