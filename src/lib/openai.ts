import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Whisper transcription
export async function transcribeAudio(audioBuffer: Buffer): Promise<string> {
  const uint8Array = new Uint8Array(audioBuffer)
  const file = new File([uint8Array], 'audio.webm', { type: 'audio/webm' })
  
  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: 'whisper-1',
    response_format: 'text',
    language: 'en',
  }) as unknown as string
  
  return transcription
}

// GPT-4 Turbo summarization
export async function generateSummary(
  transcript: string,
  template: 'default' | 'bullet' | 'narrative' = 'default'
): Promise<{
  executive_summary: string
  key_decisions: string[]
  action_items: { task: string; assignee?: string; deadline?: string }[]
  participants: string[]
  sentiment_score: number
}> {
  const systemPrompt = template === 'bullet'
    ? `You are a meeting summarizer. Extract key information from the transcript.
       Return a JSON object with:
       - executive_summary: 2-3 sentence summary
       - key_decisions: array of decisions made
       - action_items: array of {task, assignee, deadline}
       - participants: array of participant names
       - sentiment_score: -1 to 1 scale`
    : `You are a professional meeting summarizer. Create a clear, structured summary.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Meeting transcript:\n${transcript}` },
    ],
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content!)
}
