// pages/api/templates.js
// 提示词模板 API - 提供多种场景的提示词模板（CRUD）

let templates = [
  {
    id: 'tpl_001',
    name: '文章写作',
    category: 'writing',
    description: '生成高质量文章内容的提示词模板',
    template: '请写一篇关于 [主题] 的文章，要求：\n1. 字数：[字数]\n2. 风格：[风格]\n3. 目标读者：[读者群体]\n4. 包含引言、主体和结论\n5. 使用清晰的语言和生动的例子',
    variables: ['主题', '字数', '风格', '读者群体'],
    example: '请写一篇关于人工智能在医疗领域应用的文章，要求：\n1. 字数：1500字\n2. 风格：专业但易懂\n3. 目标读者：医疗行业从业者\n4. 包含引言、主体和结论\n5. 使用清晰的语言和生动的例子',
    createdAt: '2026-01-01',
    usageCount: 1250
  },
  {
    id: 'tpl_002',
    name: '代码生成',
    category: 'programming',
    description: '生成特定功能的代码',
    template: '请生成 [编程语言] 代码来实现 [功能描述]。\n要求：\n1. 代码清晰易懂\n2. 包含详细注释\n3. 遵循最佳实践\n4. 包含使用示例\n5. 考虑错误处理',
    variables: ['编程语言', '功能描述'],
    example: '请生成 Python 代码来实现一个文件上传功能。\n要求：\n1. 代码清晰易懂\n2. 包含详细注释\n3. 遵循最佳实践\n4. 包含使用示例\n5. 考虑错误处理',
    createdAt: '2026-01-02',
    usageCount: 980
  },
  {
    id: 'tpl_003',
    name: '数据分析',
    category: 'analysis',
    description: '分析数据并生成报告',
    template: '请分析以下数据并生成报告：\n数据：[数据描述]\n分析要求：\n1. 识别关键趋势和模式\n2. 提供统计摘要\n3. 给出可行的见解\n4. 使用可视化建议\n5. 包含结论和建议',
    variables: ['数据描述'],
    example: '请分析以下数据并生成报告：\n数据：2025年Q1-Q4的销售额数据，分别为450万、520万、480万、610万\n分析要求：\n1. 识别关键趋势和模式\n2. 提供统计摘要\n3. 给出可行的见解\n4. 使用可视化建议\n5. 包含结论和建议',
    createdAt: '2026-01-03',
    usageCount: 750
  },
  {
    id: 'tpl_004',
    name: '创意写作',
    category: 'creative',
    description: '生成创意内容（故事、诗歌等）',
    template: '请创作一个 [类型] 作品。\n主题：[主题]\n要求：\n1. 风格：[风格]\n2. 长度：[长度]\n3. 包含生动的描写\n4. 有吸引力的开头和结尾\n5. 传达情感或信息',
    variables: ['类型', '主题', '风格', '长度'],
    example: '请创作一个短篇故事作品。\n主题：时间旅行的后果\n要求：\n1. 风格：科幻、悬疑\n2. 长度：2000字\n3. 包含生动的描写\n4. 有吸引力的开头和结尾\n5. 传达关于选择重要性的信息',
    createdAt: '2026-01-04',
    usageCount: 620
  },
  {
    id: 'tpl_005',
    name: '邮件撰写',
    category: 'business',
    description: '撰写专业邮件',
    template: '请帮我撰写一封 [邮件类型] 邮件。\n收件人：[收件人角色]\n目的：[邮件目的]\n要求：\n1. 语气：[语气]\n2. 长度：[长度]\n3. 包含明确的行动号召\n4. 保持专业和礼貌',
    variables: ['邮件类型', '收件人角色', '邮件目的', '语气', '长度'],
    example: '请帮我撰写一封会议邀请邮件。\n收件人：团队成员\n目的：讨论Q2项目计划\n要求：\n1. 语气：友好但专业\n2. 长度：简洁\n3. 包含明确的行动号召\n4. 保持专业和礼貌',
    createdAt: '2026-01-05',
    usageCount: 1100
  },
  {
    id: 'tpl_006',
    name: '学习助手',
    category: 'education',
    description: '解释复杂概念或帮助学习',
    template: '请用简单易懂的方式解释 [概念/主题]。\n目标读者：[知识水平]\n要求：\n1. 使用类比和例子\n2. 分步骤解释\n3. 包含关键点总结\n4. 提供练习问题\n5. 推荐进一步学习资源',
    variables: ['概念/主题', '知识水平'],
    example: '请用简单易懂的方式解释区块链概念。\n目标读者：非技术背景的商务人士\n要求：\n1. 使用类比和例子\n2. 分步骤解释\n3. 包含关键点总结\n4. 提供练习问题\n5. 推荐进一步学习资源',
    createdAt: '2026-01-06',
    usageCount: 890
  },
  {
    id: 'tpl_007',
    name: '产品描述',
    category: 'marketing',
    description: '生成吸引人的产品描述',
    template: '请为 [产品名称] 撰写产品描述。\n产品信息：[产品基本信息]\n目标客户：[目标客户群体]\n要求：\n1. 突出关键特性和优势\n2. 使用吸引人的语言\n3. 包含社会证明（如适用）\n4. 呼吁行动\n5. 适合 [发布平台] 平台',
    variables: ['产品名称', '产品基本信息', '目标客户群体', '发布平台'],
    example: '请为 SmartFit Pro 智能手环 撰写产品描述。\n产品信息：续航7天、心率监测、睡眠追踪、50米防水\n目标客户：健身爱好者\n要求：\n1. 突出关键特性和优势\n2. 使用吸引人的语言\n3. 包含社会证明（如适用）\n4. 呼吁行动\n5. 适合电商网站平台',
    createdAt: '2026-01-07',
    usageCount: 720
  },
  {
    id: 'tpl_008',
    name: '问题解答',
    category: 'general',
    description: '详细解答问题',
    template: '请详细回答以下问题：\n问题：[问题内容]\n回答要求：\n1. 提供准确和全面的信息\n2. 如果适用，包含例子\n3. 考虑不同的观点\n4. 指出任何限制或例外\n5. 使用清晰的结构',
    variables: ['问题内容'],
    example: '请详细回答以下问题：\n问题：如何有效地管理时间？\n回答要求：\n1. 提供准确和全面的信息\n2. 如果适用，包含例子\n3. 考虑不同的观点\n4. 指出任何限制或例外\n5. 使用清晰的结构',
    createdAt: '2026-01-08',
    usageCount: 1350
  }
];

export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  
  switch (method) {
    case 'GET':
      if (id) {
        // 获取单个模板
        const template = templates.find(t => t.id === id);
        if (!template) {
          return res.status(404).json({ success: false, error: 'Template not found' });
        }
        return res.status(200).json({ success: true, template });
      } else {
        // 获取所有模板（支持分类筛选）
        const { category } = req.query;
        let filtered = templates;
        
        if (category) {
          filtered = templates.filter(t => t.category === category);
        }
        
        return res.status(200).json({
          success: true,
          templates: filtered,
          categories: [...new Set(templates.map(t => t.category))]
        });
      }
      
    case 'POST':
      // 创建新模板
      const newTemplate = {
        id: `tpl_${Date.now()}`,
        ...req.body,
        createdAt: new Date().toISOString().split('T')[0],
        usageCount: 0
      };
      templates.push(newTemplate);
      return res.status(201).json({ success: true, template: newTemplate });
      
    case 'PUT':
      // 更新模板
      if (!id) {
        return res.status(400).json({ success: false, error: 'Template ID required' });
      }
      const updateIndex = templates.findIndex(t => t.id === id);
      if (updateIndex === -1) {
        return res.status(404).json({ success: false, error: 'Template not found' });
      }
      templates[updateIndex] = { ...templates[updateIndex], ...req.body };
      return res.status(200).json({ success: true, template: templates[updateIndex] });
      
    case 'DELETE':
      // 删除模板
      if (!id) {
        return res.status(400).json({ success: false, error: 'Template ID required' });
      }
      const deleteIndex = templates.findIndex(t => t.id === id);
      if (deleteIndex === -1) {
        return res.status(404).json({ success: false, error: 'Template not found' });
      }
      templates.splice(deleteIndex, 1);
      return res.status(200).json({ success: true, message: 'Template deleted' });
      
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
