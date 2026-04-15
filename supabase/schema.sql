-- MeetSum AI Database Schema
-- Run this in Supabase SQL Editor

-- ===================
-- User Profiles
-- ===================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  company text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'pro', 'team')),
  meetings_used int default 0,
  meetings_limit int default 10,
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ===================
-- Meetings
-- ===================
create table if not exists meetings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text,
  platform text check (platform in ('zoom', 'google_meet', 'teams', 'in_person', 'other')),
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds int,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  audio_url text,
  transcript text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===================
-- Summaries
-- ===================
create table if not exists summaries (
  id uuid default gen_random_uuid() primary key,
  meeting_id uuid references meetings(id) on delete cascade not null,
  executive_summary text,
  key_decisions jsonb default '[]',
  action_items jsonb default '[]',
  participants jsonb default '[]',
  sentiment_score float,
  template_type text default 'default',
  raw_response jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===================
-- Subscriptions (for Stripe)
-- ===================
create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  stripe_subscription_id text unique,
  stripe_customer_id text,
  plan text not null check (plan in ('free', 'pro', 'team')),
  status text not null check (status in ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now()
);

-- ===================
-- Row Level Security
-- ===================
alter table profiles enable row level security;
alter table meetings enable row level security;
alter table summaries enable row level security;
alter table subscriptions enable row level security;

-- Profiles: users can read/update their own profile
create policy "Profiles: users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Profiles: users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Meetings: users can only access their own meetings
create policy "Meetings: users can view own meetings"
  on meetings for select using (auth.uid() = user_id);

create policy "Meetings: users can insert own meetings"
  on meetings for insert with check (auth.uid() = user_id);

create policy "Meetings: users can update own meetings"
  on meetings for update using (auth.uid() = user_id);

create policy "Meetings: users can delete own meetings"
  on meetings for delete using (auth.uid() = user_id);

-- Summaries: users can access through meeting ownership
create policy "Summaries: users can view own summaries"
  on summaries for select
  using (
    exists (
      select 1 from meetings
      where meetings.id = summaries.meeting_id
      and meetings.user_id = auth.uid()
    )
  );

create policy "Summaries: users can insert own summaries"
  on summaries for insert
  with check (
    exists (
      select 1 from meetings
      where meetings.id = summaries.meeting_id
      and meetings.user_id = auth.uid()
    )
  );

create policy "Summaries: users can update own summaries"
  on summaries for update
  using (
    exists (
      select 1 from meetings
      where meetings.id = summaries.meeting_id
      and meetings.user_id = auth.uid()
    )
  );

-- Subscriptions: users can only access their own
create policy "Subscriptions: users can view own subscriptions"
  on subscriptions for select using (auth.uid() = user_id);

create policy "Subscriptions: users can insert own subscriptions"
  on subscriptions for insert with check (auth.uid() = user_id);

create policy "Subscriptions: users can update own subscriptions"
  on subscriptions for update using (auth.uid() = user_id);

-- ===================
-- Storage (for audio files)
-- ===================
insert into storage.buckets (id, name, public) values ('audio', 'audio', false);

create policy "Users can upload own audio"
  on storage.objects for insert
  with check (bucket_id = 'audio' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can view own audio"
  on storage.objects for select
  using (bucket_id = 'audio' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own audio"
  on storage.objects for delete
  using (bucket_id = 'audio' and auth.uid()::text = (storage.foldername(name))[1]);

-- ===================
-- Indexes
-- ===================
create index if not exists idx_meetings_user_id on meetings(user_id);
create index if not exists idx_meetings_status on meetings(status);
create index if not exists idx_summaries_meeting_id on summaries(meeting_id);
create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create index if not exists idx_subscriptions_stripe_id on subscriptions(stripe_subscription_id);

-- ===================
-- Functions
-- ===================
-- Update meetings_used count
create or replace function update_meetings_count()
returns trigger as $$
begin
  update profiles
  set meetings_used = (
    select count(*) from meetings
    where user_id = auth.uid()
    and status = 'completed'
  )
  where id = auth.uid();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_meeting_completed on meetings;
create trigger on_meeting_completed
  after update of status on meetings
  for each row execute procedure update_meetings_count();
