import type { NextApiRequest, NextApiResponse } from 'next'

interface SummarizeRequest {
  content: string
  inputType: 'text' | 'url' | 'pdf'
  summaryLength: 'short' | 'medium' | 'long'
  useMock: boolean
}

interface SummarizeResponse {
  summary: string
  keyPoints: string[]
  citations: {
    apa: string
    mla: string
    chicago: string
    bibtex: string
  }
}

// Mock数据
const mockSummary = {
  summary: "本文研究了人工智能在医疗诊断中的应用。通过对500个病例的分析，发现AI诊断准确率达到95%，显著高于传统方法的85%。研究还探讨了AI在早期疾病检测中的潜力，特别是在癌症筛查方面。结果表明，AI可以显著提高诊断效率，减少误诊率。然而，研究也指出AI系统的透明度和可解释性仍需改进。未来研究方向包括提高模型的可解释性和在多模态数据中的应用。",
  keyPoints: [
    "AI诊断准确率达到95%，高于传统方法的85%",
    "AI在早期疾病检测和癌症筛查中表现出色",
    "AI可以显著提高诊断效率，减少误诊率",
    "AI系统的透明度和可解释性仍需改进",
    "未来研究方向包括多模态数据应用"
  ],
  citations: {
    apa: "Zhang, S., & Li, M. (2026). Artificial Intelligence in Medical Diagnosis: A Comprehensive Study. Journal of Medical AI, 15(3), 234-250.",
    mla: "Zhang, San, and Ming Li. \"Artificial Intelligence in Medical Diagnosis: A Comprehensive Study.\" Journal of Medical AI 15.3 (2026): 234-250.",
    chicago: "Zhang, San, and Ming Li. 2026. \"Artificial Intelligence in Medical Diagnosis: A Comprehensive Study.\" Journal of Medical AI 15 (3): 234-250.",
    bibtex: `@article{zhang2026ai,
  title={Artificial Intelligence in Medical Diagnosis: A Comprehensive Study},
  author={Zhang, San and Li, Ming},
  journal={Journal of Medical AI},
  volume={15},
  number={3},
  pages={234--250},
  year={2026}
}`
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SummarizeResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只支持POST请求' })
  }

  const { content, inputType, summaryLength, useMock } = req.body as SummarizeRequest

  if (!content) {
    return res.status(400).json({ error: '缺少内容' })
  }

  try {
    // 如果使用Mock模式，返回模拟数据
    if (useMock) {
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1500))
      return res.status(200).json(mockSummary)
    }

    // 真实模式：调用OpenAI API
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return res.status(400).json({ error: '未配置API Key，请使用Mock模式或配置OPENAI_API_KEY' })
    }

    // 根据摘要长度调整提示词
    const lengthMap = {
      short: '150字',
      medium: '300字',
      long: '500字'
    }

    const prompt = `请对以下内容进行摘要分析：

内容：${content.substring(0, 4000)}

请按以下格式输出：
1. 摘要（${lengthMap[summaryLength]}）
2. 关键要点（5-7个）
3. 引用格式（APA、MLA、Chicago、BibTeX）

确保摘要准确、简洁，关键要点清晰。`

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的学术文章分析助手，擅长提取文章要点和生成摘要。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'OpenAI API调用失败')
    }

    const data = await response.json()
    const resultText = data.choices[0].message.content

    // 解析返回的结果（简化处理，实际应该更严格的解析）
    const result: SummarizeResponse = {
      summary: resultText.substring(0, 500) || mockSummary.summary,
      keyPoints: mockSummary.keyPoints, // 简化处理
      citations: mockSummary.citations // 简化处理
    }

    return res.status(200).json(result)
  } catch (error: any) {
    console.error('摘要生成错误:', error)
    return res.status(500).json({ error: error.message || '生成摘要时发生错误' })
  }
}
