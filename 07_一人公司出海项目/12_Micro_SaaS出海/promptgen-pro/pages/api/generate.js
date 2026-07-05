// pages/api/generate.js
// 提示词生成 API - 输入简单描述，自动生成优化后的提示词

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-key',
});

const anthropic = null; // 如果使用 Claude API

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const {
      description,
      model = 'gpt-4',
      templateId,
      variables,
      outputFormat = 'detailed'
    } = req.body;
    
    if (!description) {
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      });
    }
    
    // 如果提供了模板ID，使用模板
    let prompt = description;
    if (templateId) {
      // 从模板生成提示词（这里应该从数据库获取，简化版使用硬编码）
      const templates = {
        'tpl_001': `请写一篇关于 ${description} 的文章，要求：\n1. 字数：1500字\n2. 风格：专业但易懂\n3. 包含引言、主体和结论\n4. 使用清晰的语言和生动的例子`,
        'tpl_002': `请生成 Python 代码来实现 ${description}。\n要求：\n1. 代码清晰易懂\n2. 包含详细注释\n3. 遵循最佳实践\n4. 包含使用示例\n5. 考虑错误处理`,
        'tpl_003': `请分析以下数据并生成报告：\n数据：${description}\n分析要求：\n1. 识别关键趋势和模式\n2. 提供统计摘要\n3. 给出可行的见解\n4. 使用可视化建议\n5. 包含结论和建议`
      };
      prompt = templates[templateId] || description;
    }
    
    // 调用 AI 模型生成优化后的提示词
    let generatedPrompt = '';
    let modelUsed = model;
    
    if (model === 'gpt-4' || model === 'gpt-3.5-turbo') {
      // 使用 OpenAI API
      const completion = await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are a prompt engineering expert. Your task is to optimize and enhance the given prompt to get the best possible results from AI models. Make the prompt clear, specific, and effective.'
          },
          {
            role: 'user',
            content: `Please optimize this prompt for best results: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      generatedPrompt = completion.choices[0].message.content;
    } else if (model === 'claude') {
      // 使用 Claude API（需要配置）
      generatedPrompt = `Optimized prompt for Claude:\n\n${prompt}\n\nNote: For best results with Claude, be specific about desired output format and include examples if possible.`;
    } else {
      // 模拟生成（演示模式）
      generatedPrompt = `**Optimized Prompt:**\n\n${prompt}\n\n**Tips for best results:**\n1. Be specific about output format\n2. Include examples if possible\n3. Specify constraints and requirements clearly\n4. Use step-by-step instructions for complex tasks`;
    }
    
    // 生成多个变体
    const variants = [
      {
        name: 'Standard',
        prompt: generatedPrompt,
        description: 'Balanced prompt suitable for most use cases'
      },
      {
        name: 'Detailed',
        prompt: `${generatedPrompt}\n\nPlease provide a comprehensive and detailed response.`,
        description: 'Enhanced for more detailed and thorough responses'
      },
      {
        name: 'Concise',
        prompt: `${generatedPrompt}\n\nPlease be concise and to the point.`,
        description: 'Optimized for brief and focused responses'
      }
    ];
    
    return res.status(200).json({
      success: true,
      originalDescription: description,
      generatedPrompt,
      variants,
      model: modelUsed,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Generate API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate prompt',
      details: error.message
    });
  }
}
