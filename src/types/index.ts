export type MeetingStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface Meeting {
  id: string
  user_id: string
  title: string
  description?: string
  platform?: 'zoom' | 'google_meet' | 'teams' | 'in_person' | 'other'
  started_at?: string
  ended_at?: string
  duration_seconds?: number
  status: MeetingStatus
  audio_url?: string
  transcript?: string
  created_at: string
  updated_at: string
}

export interface Summary {
  id: string
  meeting_id: string
  executive_summary?: string
  key_decisions: string[]
  action_items: ActionItem[]
  participants: string[]
  sentiment_score?: number
  template_type: 'default' | 'bullet' | 'narrative'
  created_at: string
}

export interface ActionItem {
  task: string
  assignee?: string
  deadline?: string
  completed?: boolean
}

export interface Profile {
  id: string
  name?: string
  company?: string
  avatar_url?: string
  plan: 'free' | 'pro' | 'team'
  meetings_used: number
  meetings_limit: number
  stripe_customer_id?: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id?: string
  stripe_customer_id?: string
  plan: 'free' | 'pro' | 'team'
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start?: string
  current_period_end?: string
  cancel_at_period_end: boolean
}
