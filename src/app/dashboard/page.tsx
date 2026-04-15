'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/auth/auth-provider'
import { supabase } from '@/lib/supabase'
import { Meeting, Profile } from '@/types'
import { UploadCard } from '@/components/dashboard/upload-card'
import { MeetingCard } from '@/components/dashboard/meeting-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2, Plus, Mic } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchMeetings()
      fetchProfile()
    }
  }, [user])

  const fetchMeetings = async () => {
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (!error && data) {
      setMeetings(data)
    }
    setLoading(false)
  }

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single()

    if (data) {
      setProfile(data)
    }
  }

  const handleUpload = async (file: File) => {
    if (!user) return

    // Create meeting record
    const { data: meeting, error: createError } = await supabase
      .from('meetings')
      .insert({
        user_id: user.id,
        title: file.name.replace(/\.[^/.]+$/, ''),
        status: 'pending',
      })
      .select()
      .single()

    if (createError || !meeting) {
      console.error('Failed to create meeting:', createError)
      return
    }

    // Upload audio file
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/${meeting.id}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Failed to upload audio:', uploadError)
      return
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('audio')
      .getPublicUrl(filePath)

    // Update meeting with audio URL and trigger processing
    await supabase
      .from('meetings')
      .update({ 
        audio_url: publicUrl,
        status: 'processing',
      })
      .eq('id', meeting.id)

    // Trigger transcription via API
    await fetch('/api/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingId: meeting.id }),
    })

    // Refresh meetings list
    fetchMeetings()
  }

  const handleDelete = async (meeting: Meeting) => {
    if (!confirm('Are you sure you want to delete this meeting?')) return

    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', meeting.id)

    if (!error) {
      setMeetings(meetings.filter(m => m.id !== meeting.id))
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="font-bold text-xl">MeetSum AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {profile?.meetings_used || 0} / {profile?.meetings_limit || 10} meetings used
            </span>
            <Button variant="outline" size="sm" onClick={() => router.push('/settings')}>
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Upload */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  New Meeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <UploadCard 
                  onUpload={handleUpload}
                  disabled={(profile?.meetings_used || 0) >= (profile?.meetings_limit || 10)}
                />
                
                {(profile?.meetings_used || 0) >= (profile?.meetings_limit || 10) && (
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    You&apos;ve reached your monthly limit.{' '}
                    <a href="/pricing" className="text-primary hover:underline">
                      Upgrade to Pro
                    </a>
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Meetings</span>
                  <span className="font-semibold">{profile?.meetings_used || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-semibold capitalize">{profile?.plan || 'Free'}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Meeting History */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Meetings</h2>
            </div>
            
            {meetings.length === 0 ? (
              <Card className="flex flex-col items-center justify-center py-12">
                <Mic className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">No meetings yet</p>
                <p className="text-sm text-muted-foreground">
                  Upload your first meeting recording to get started
                </p>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {meetings.map((meeting) => (
                  <MeetingCard
                    key={meeting.id}
                    meeting={meeting}
                    onView={setSelectedMeeting}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Meeting Detail Dialog */}
      <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMeeting?.title}</DialogTitle>
          </DialogHeader>
          {selectedMeeting?.status === 'completed' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Transcript</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedMeeting.transcript || 'No transcript available'}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
