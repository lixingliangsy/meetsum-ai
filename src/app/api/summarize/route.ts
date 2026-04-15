import { NextRequest, NextResponse } from 'next/server'
import { generateMeetingSummary, AIProvider } from '@/lib/ai-providers'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const { transcript, provider, model, template } = await request.json()

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    const summary = await generateMeetingSummary(transcript, {
      provider: provider as AIProvider,
      model,
      template,
    })

    return NextResponse.json({
      success: true,
      data: summary,
    })
  } catch (error: any) {
    console.error('Summarize API Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate summary',
        details: error.message 
      },
      { status: 500 }
    )
  }
}
