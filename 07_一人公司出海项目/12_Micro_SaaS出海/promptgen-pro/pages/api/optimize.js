// pages/api/optimize.js
// 提示词优化 API - 优化现有提示词以获得更好的结果

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const {
      prompt,
      optimizationLevel = 'standard', // 'basic', 'standard', 'advanced'
      targetModel = 'gpt-4',
      includeExamples = true
    } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      });
    }
    
    // 优化策略
    const optimizationStrategies = {
      basic: {
        steps: ['Add clear instructions', 'Specify output format', 'Remove ambiguity'],
        improvedPrompt: `${prompt}\n\nPlease provide a clear and well-structured response.`
      },
      standard: {
        steps: [
          'Add role definition',
          'Specify output format',
          'Include examples',
          'Add constraints',
          'Use step-by-step instructions'
        ],
        improvedPrompt: `You are an expert in this task. ${prompt}\n\n**Output Format:**\nPlease provide your response in a clear, structured format with headings and bullet points where appropriate.\n\n**Constraints:**\n- Be accurate and factual\n- Provide actionable insights\n- Use clear and concise language`
      },
      advanced: {
        steps: [
          'Add detailed role definition',
          'Include few-shot examples',
          'Specify chain-of-thought reasoning',
          'Add output validation criteria',
          'Include error handling instructions',
          'Use XML tags for structure',
          'Add self-reflection instructions'
        ],
        improvedPrompt: `You are an expert assistant with deep knowledge in this domain. Your task is to provide the highest quality response possible.\n\n**Task:**\n${prompt}\n\n**Instructions:**\n1. Think through this step-by-step\n2. Provide specific examples where helpful\n3. Anticipate potential misunderstandings\n4. Validate your response for accuracy\n\n**Output Structure:**\n<response>\n  <summary> Brief overview </summary>\n  <detailed_analysis> In-depth explanation </detailed_analysis>\n  <examples> Relevant examples </examples>\n  <recommendations> Actionable recommendations </recommendations>\n</response>\n\n**Quality Criteria:**\n- Accuracy: Ensure all facts are correct\n- Completeness: Address all aspects of the question\n- Clarity: Use clear, unambiguous language\n- Actionability: Provide practical, usable insights`
      }
    };
    
    const strategy = optimizationStrategies[optimizationLevel] || optimizationStrategies.standard;
    
    // 根据目标模型调整优化
    let modelSpecificTips = '';
    if (targetModel === 'gpt-4' || targetModel === 'gpt-3.5-turbo') {
      modelSpecificTips = '\n\n**OpenAI Model Tips:**\n- Use delimiters like """ or --- to separate parts\n- Specify temperature and other parameters if using API\n- Consider using system messages for persistent instructions';
    } else if (targetModel === 'claude') {
      modelSpecificTips = '\n\n**Claude Tips:**\n- Use XML tags for structure\n- Put instructions at the beginning and end\n- Be specific about desired output format';
    } else if (targetModel === 'gemini') {
      modelSpecificTips = '\n\n**Gemini Tips:**\n- Use clear section headings\n- Specify if you want bullet points or paragraphs\n- Include examples for complex tasks';
    }
    
    const optimizedPrompt = strategy.improvedPrompt + modelSpecificTips;
    
    // 评分原始提示词和优化后的提示词
    const scorePrompt = (p) => {
      let score = 0;
      const criteria = [
        { name: 'Clarity', check: p.length > 50 && !p.includes('maybe') && !p.includes('might') },
        { name: 'Specificity', check: p.includes('Please') || p.includes('具体') || p.includes('详细') },
        { name: 'Structure', check: p.includes('**') || p.includes('#') || p.includes('1.') },
        { name: 'Examples', check: p.includes('example') || p.includes('例如') || p.includes('比如') },
        { name: 'Constraints', check: p.includes('constraint') || p.includes('限制') || p.includes('要求') }
      ];
      
      criteria.forEach(c => {
        if (c.check) score += 20;
      });
      
      return Math.min(score, 100);
    };
    
    const originalScore = scorePrompt(prompt);
    const optimizedScore = scorePrompt(optimizedPrompt);
    
    return res.status(200).json({
      success: true,
      originalPrompt: prompt,
      optimizedPrompt,
      optimizationLevel,
      targetModel,
      improvements: strategy.steps,
      scores: {
        original: originalScore,
        optimized: optimizedScore,
        improvement: optimizedScore - originalScore
      },
      analysis: {
        originalLength: prompt.length,
        optimizedLength: optimizedPrompt.length,
        addedStructures: strategy.steps.length
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Optimize API Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to optimize prompt',
      details: error.message
    });
  }
}
