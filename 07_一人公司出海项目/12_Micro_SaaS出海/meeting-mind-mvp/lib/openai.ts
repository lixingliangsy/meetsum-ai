import OpenAI from 'openai'

// 懒初始化 DeepSeek 客户端
function getDeepSeekClient(): OpenAI {
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY or OPENAI_API_KEY is required for DeepSeek client')
  }
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.deepseek.com',
  })
}

// 懒初始化 OpenAI 客户端（用于 Whisper）
function getOpenAIClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required for OpenAI Whisper client')
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

// =============================================================================
// 方案A：使用 OpenAI Whisper（需要 OpenAI API Key）
// =============================================================================
export async function transcribeWithWhisper(audioBuffer: Buffer): Promise<string> {
  try {
    const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mp3' })
    const openai = getOpenAIClient()
    
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: 'whisper-1',
      response_format: 'text',
    })
    
    return transcription.text
  } catch (error) {
    console.error('Whisper transcription error:', error)
    throw new Error('Failed to transcribe audio with Whisper')
  }
}

// =============================================================================
// 方案B：使用免费本地 Whisper（无需 API Key，推荐用于 MVP）
// =============================================================================
export async function transcribeWithLocalWhisper(audioUrl: string): Promise<string> {
  try {
    // 调用本地 Whisper 服务（需要部署 whisper-api-server）
    // 或者使用第三方免费服务
    const response = await fetch('https://api.deepinfra.com/v1/inference/openai/whisper-large-v3', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + (process.env.DEEPINFRA_API_KEY || ''),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio: audioUrl, // 支持 URL 或 base64
      }),
    })
    
    const data = await response.json()
    return data.text || ''
  } catch (error) {
    console.error('Local Whisper transcription error:', error)
    throw new Error('Failed to transcribe audio with local Whisper')
  }
}

// =============================================================================
// 方案C：用户手动输入文本（MVP 最简方案，无需 API Key）
// =============================================================================
export function createMockTranscription(): string {
  return `Welcome to the team meeting. Today we are discussing the Q2 product roadmap and feature priorities.

Key topics covered:
1. AI integration timeline - we agreed to prioritize the summarization feature
2. Mobile app launch - target date is June 15th
3. Budget allocation - 40% for R&D, 30% for marketing
4. Team expansion - we need 2 more engineers

Action items assigned:
- Sarah will prepare the product requirements document by April 20
- Mike will set up the CI/CD pipeline by April 18
- Marketing team will create launch materials by May 30

Next meeting scheduled for April 25th to review progress.`
}

// =============================================================================
// 使用 DeepSeek 生成会议摘要
// =============================================================================
export async function generateSummary(transcript: string): Promise<{
  summary: string
  keyPoints: string[]
  actionItems: Array<{
    task: string
    assignee?: string
    dueDate?: string
  }>
  decisions: string[]
}> {
  try {
    const deepseek = getDeepSeekClient()
    const response = await deepseek.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that analyzes meeting transcripts and generates structured summaries.
          
Your task is to analyze the provided meeting transcript and generate a comprehensive summary with the following structure:

1. Summary: A brief overview of the meeting (2-3 sentences)
2. Key Points: 3-5 main discussion points
3. Action Items: Tasks assigned during the meeting with optional assignees
4. Decisions: Key decisions made during the meeting

Format your response as JSON with the following structure:
{
  "summary": "string",
  "keyPoints": ["string"],
  "actionItems": [{"task": "string", "assignee": "string", "dueDate": "string"}],
  "decisions": ["string"]
}

Be concise and focus on actionable insights.`
        },
        {
          role: 'user',
          content: `Please analyze this meeting transcript and provide a structured summary:

${transcript}`
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    })

    const content = response.choices[0].message.content
    return JSON.parse(content || '{}')
  } catch (error) {
    console.error('DeepSeek summary generation error:', error)
    throw new Error('Failed to generate summary with DeepSeek')
  }
}

// =============================================================================
// 演示模式：无需 API Key
// =============================================================================
export function generateDemoSummary(transcript: string): {
  summary: string
  keyPoints: string[]
  actionItems: Array<{
    task: string
    assignee?: string
    dueDate?: string
  }>
  decisions: string[]
} {
  // Mock implementation for demo purposes
  return {
    summary: `This meeting covered important topics related to product development and team coordination. The discussion was productive with clear outcomes defined.`,
    keyPoints: [
      'Product roadmap discussion for Q2 2026',
      'Team capacity and resource allocation',
      'Customer feedback review and prioritization',
      'Technical debt management strategy',
      'Upcoming feature launch timeline'
    ],
    actionItems: [
      { task: 'Prepare Q2 roadmap presentation', assignee: 'Product Team', dueDate: '2026-04-20' },
      { task: 'Schedule follow-up with engineering', assignee: 'Tech Lead', dueDate: '2026-04-18' },
      { task: 'Create customer feedback report', assignee: 'Customer Success', dueDate: '2026-04-15' }
    ],
    decisions: [
      'Focus on AI features for next quarter',
      'Allocate 40% of budget to R&D',
      'Launch mobile app by June 2026',
      'Implement weekly team syncs'
    ]
  }
}

// =============================================================================
// 统一入口：根据配置选择方案
// =============================================================================
export async function transcribeAudio(
  audioBuffer: Buffer, 
  options: {
    useLocalWhisper?: boolean
    mockText?: string
  } = {}
): Promise<string> {
  // 方案C：直接使用提供的文本（MVP 最简方案）
  if (options.mockText) {
    return options.mockText
  }
  
  // 方案B：使用免费本地 Whisper
  if (options.useLocalWhisper) {
    // 需要先将音频上传到云存储获取 URL
    throw new Error('Local Whisper requires audio URL. Use mockText for MVP.')
  }
  
  // 方案A：使用 OpenAI Whisper（需要 OPENAI_API_KEY）
  if (process.env.OPENAI_API_KEY) {
    return transcribeWithWhisper(audioBuffer)
  }
  
  // 默认：使用演示文本
  return createMockTranscription()
}
