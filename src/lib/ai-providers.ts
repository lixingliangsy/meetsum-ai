/**
 * AI Providers - 统一AI服务，支持多个提供商
 * 支持: OpenAI, DeepSeek, 智谱AI, 豆包, 硅基流动, Ollama, OpenRouter
 */

// 类型定义
export type AIProvider = 'openai' | 'deepseek' | 'zhipu' | 'doubao' | 'jina' | 'ollama' | 'openrouter'

export interface AIConfig {
  provider: AIProvider
  model: string
  apiKey: string
  baseURL?: string
}

// 模型配置
export const AI_MODELS = {
  // OpenRouter 免费模型
  openrouter: {
    'openai/gpt-oss-20b:free': 'GPT-Oss 20B (Free)',
    'qwen/qwen3-next-80b-a3b-instruct:free': 'Qwen3-Next 80B (Free)',
    'nousresearch/hermes-3-llama-3.1-405b:free': 'Hermes-3 405B (Free)',
  },
  // 硅基流动免费模型
  jina: {
    'jina-clip-text-v2': 'Jina-CLIP Text V2',
    'jina-embeddings-v3': 'Jina Embeddings V3',
  },
  // DeepSeek
  deepseek: {
    'deepseek-chat': 'DeepSeek Chat',
    'deepseek-coder': 'DeepSeek Coder',
  },
  // 智谱
  zhipu: {
    'glm-4-flash': 'GLM-4 Flash (免费)',
    'glm-4-plus': 'GLM-4 Plus',
  },
  // 豆包
  doubao: {
    'doubao-pro-32k': '豆包 Pro 32K',
    'doubao-lite-32k': '豆包 Lite 32K (免费)',
  },
  // Ollama本地
  ollama: {
    'llama3': 'Llama3',
    'qwen2.5': 'Qwen2.5',
    'deepseek-v2': 'DeepSeek V2',
  },
}

// 获取提供商配置
export function getProviderConfig(provider: AIProvider): Partial<AIConfig> {
  const configs: Record<AIProvider, Partial<AIConfig>> = {
    openai: {
      baseURL: 'https://openrouter.ai/api/v1',
      model: 'openai/gpt-oss-20b:free',
    },
    deepseek: {
      baseURL: 'https://api.deepseek.com/v1',
      model: 'deepseek-chat',
    },
    zhipu: {
      baseURL: 'https://open.bigmodel.cn/api/paas/v4',
      model: 'glm-4-flash',
    },
    doubao: {
      baseURL: 'https://ark.cn-beijing.volces.com/api/v3',
      model: 'doubao-lite-32k',
    },
    jina: {
      baseURL: 'https://gptapi.jinaai.cn/v1',
      model: 'jina-clip-text-v2',
    },
    ollama: {
      baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
      model: 'llama3',
    },
    openrouter: {
      baseURL: 'https://openrouter.ai/api/v1',
      model: 'qwen/qwen3-next-80b-a3b-instruct:free',
    },
  }
  return configs[provider]
}

// AI对话接口
export async function chatCompletion(
  messages: { role: string; content: string }[],
  options?: {
    provider?: AIProvider
    model?: string
    temperature?: number
    maxTokens?: number
  }
): Promise<{ content: string; usage?: any }> {
  const provider = options?.provider || (process.env.DEFAULT_AI_PROVIDER as AIProvider) || 'deepseek'
  const providerConfig = getProviderConfig(provider)
  const model = options?.model || providerConfig.model

  // 构建请求头
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // 设置API密钥
  switch (provider) {
    case 'openai':
      headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`
      break
    case 'deepseek':
      headers['Authorization'] = `Bearer ${process.env.DEEPSEEK_API_KEY}`
      break
    case 'zhipu':
      headers['Authorization'] = `Bearer ${process.env.ZHIPU_API_KEY}`
      break
    case 'doubao':
      headers['Authorization'] = `Bearer ${process.env.DOUBAO_API_KEY}`
      break
    case 'jina':
      headers['Authorization'] = `Bearer ${process.env.JINA_API_KEY}`
      break
    case 'ollama':
      headers['Authorization'] = `Bearer ${process.env.OLLAMA_API_KEY || 'ollama'}`
      break
    case 'openrouter':
      headers['Authorization'] = `Bearer ${process.env.OPENROUTER_API_KEY}`
      headers['HTTP-Referer'] = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
      headers['X-Title'] = 'MeetSum AI'
      break
  }

  // 构建请求体
  const body: any = {
    model,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.maxTokens ?? 2048,
  }

  // OpenRouter/OpenAI兼容格式
  if (provider === 'openrouter' || provider === 'ollama') {
    body.stream = false
  }

  try {
    const response = await fetch(`${providerConfig.baseURL}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`AI API Error (${provider}): ${response.status} - ${error}`)
    }

    const data = await response.json()
    
    return {
      content: data.choices?.[0]?.message?.content || '',
      usage: data.usage,
    }
  } catch (error: any) {
    console.error(`AI ${provider} Error:`, error)
    throw error
  }
}

// Whisper转录 (使用OpenAI兼容API)
export async function transcribeAudio(
  audioBuffer: Buffer,
  provider: AIProvider = 'deepseek'
): Promise<string> {
  const formData = new FormData()
  const blob = new Blob([audioBuffer], { type: 'audio/webm' })
  formData.append('file', blob, 'audio.webm')
  formData.append('model', 'whisper-1')
  formData.append('response_format', 'text')

  const headers: Record<string, string> = {}
  let url = ''

  switch (provider) {
    case 'deepseek':
      headers['Authorization'] = `Bearer ${process.env.DEEPSEEK_API_KEY}`
      // DeepSeek不支持Whisper，回退到模拟
      return `[Transcription placeholder - Configure OpenAI for Whisper]`
    case 'openai':
      headers['Authorization'] = `Bearer ${process.env.OPENAI_API_KEY}`
      url = 'https://api.openai.com/v1/audio/transcriptions'
      break
    case 'openrouter':
      headers['Authorization'] = `Bearer ${process.env.OPENROUTER_API_KEY}`
      // OpenRouter部分支持Whisper
      url = 'https://openrouter.ai/api/v1/audio/transcriptions'
      break
    default:
      return `[Transcription placeholder - Configure OpenAI for Whisper]`
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.status}`)
    }

    const data = await response.json()
    return data.text
  } catch (error: any) {
    console.error('Transcription Error:', error)
    throw error
  }
}

// 会议摘要生成
export async function generateMeetingSummary(
  transcript: string,
  options?: {
    provider?: AIProvider
    model?: string
    template?: 'default' | 'bullet' | 'narrative'
  }
): Promise<{
  executive_summary: string
  key_decisions: string[]
  action_items: { task: string; assignee?: string; deadline?: string }[]
  participants: string[]
  sentiment_score: number
}> {
  const template = options?.template || 'bullet'
  
  const systemPrompt = `You are a professional meeting summarizer. Analyze the meeting transcript and extract key information.
Return a JSON object with this exact structure:
{
  "executive_summary": "2-3 sentence summary of the meeting",
  "key_decisions": ["decision 1", "decision 2"],
  "action_items": [{"task": "task description", "assignee": "person name", "deadline": "date if mentioned"}],
  "participants": ["name1", "name2"],
  "sentiment_score": number between -1 (negative) and 1 (positive)
}`

  const { content } = await chatCompletion(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Meeting transcript:\n${transcript}` },
    ],
    {
      provider: options?.provider,
      model: options?.model,
      temperature: 0.3,
      maxTokens: 2048,
    }
  )

  try {
    // 尝试提取JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    console.error('JSON parse error:', e)
  }

  // Fallback
  return {
    executive_summary: content.substring(0, 500),
    key_decisions: [],
    action_items: [],
    participants: [],
    sentiment_score: 0,
  }
}

// 获取可用的AI提供商列表
export function getAvailableProviders(): { id: AIProvider; name: string; models: string[] }[] {
  return [
    { 
      id: 'deepseek', 
      name: 'DeepSeek (推荐)', 
      models: Object.keys(AI_MODELS.deepseek) 
    },
    { 
      id: 'openrouter', 
      name: 'OpenRouter (免费模型)', 
      models: Object.keys(AI_MODELS.openrouter) 
    },
    { 
      id: 'zhipu', 
      name: '智谱AI (免费额度)', 
      models: Object.keys(AI_MODELS.zhipu) 
    },
    { 
      id: 'doubao', 
      name: '豆包/火山引擎', 
      models: Object.keys(AI_MODELS.doubao) 
    },
    { 
      id: 'openai', 
      name: 'OpenAI (付费)', 
      models: ['gpt-4-turbo', 'gpt-4'] 
    },
    { 
      id: 'ollama', 
      name: 'Ollama (本地)', 
      models: Object.keys(AI_MODELS.ollama) 
    },
  ]
}
