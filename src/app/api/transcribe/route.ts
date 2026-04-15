import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { transcribeAudio } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { meetingId } = await request.json()
    
    if (!meetingId) {
      return NextResponse.json({ error: 'Meeting ID required' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Fetch meeting record
    const { data: meeting, error: fetchError } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', meetingId)
      .single()

    if (fetchError || !meeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 })
    }

    if (!meeting.audio_url) {
      return NextResponse.json({ error: 'No audio file found' }, { status: 400 })
    }

    // Update status to processing
    await supabase
      .from('meetings')
      .update({ status: 'processing' })
      .eq('id', meetingId)

    try {
      // Download audio file
      const audioResponse = await fetch(meeting.audio_url)
      const audioBuffer = await audioResponse.arrayBuffer()

      // Transcribe
      const transcript = await transcribeAudio(Buffer.from(audioBuffer))

      // Update meeting with transcript
      await supabase
        .from('meetings')
        .update({ 
          transcript,
          status: 'completed',
        })
        .eq('id', meetingId)

      // Create summary record
      await supabase
        .from('summaries')
        .insert({
          meeting_id: meetingId,
        })

      return NextResponse.json({ success: true, transcript })
    } catch (aiError) {
      console.error('AI processing error:', aiError)
      
      await supabase
        .from('meetings')
        .update({ status: 'failed' })
        .eq('id', meetingId)

      return NextResponse.json(
        { error: 'Transcription failed' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Transcribe API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
