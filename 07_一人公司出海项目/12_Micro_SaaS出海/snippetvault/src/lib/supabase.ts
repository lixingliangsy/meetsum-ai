import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Snippet {
  id: string
  title: string
  code: string
  language: string
  description?: string
  tags: string[]
  is_public: boolean
  user_id: string
  created_at: string
  updated_at: string
}

export async function getSnippets(userId: string): Promise<Snippet[]> {
  const { data, error } = await supabase
    .from('snippets')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createSnippet(snippet: Omit<Snippet, 'id' | 'created_at' | 'updated_at'>): Promise<Snippet> {
  const { data, error } = await supabase
    .from('snippets')
    .insert(snippet)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSnippet(id: string, updates: Partial<Snippet>): Promise<Snippet> {
  const { data, error } = await supabase
    .from('snippets')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSnippet(id: string): Promise<void> {
  const { error } = await supabase
    .from('snippets')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function searchSnippets(userId: string, query: string): Promise<Snippet[]> {
  const { data, error } = await supabase
    .from('snippets')
    .select('*')
    .eq('user_id', userId)
    .or(`title.ilike.%${query}%,code.ilike.%${query}%,description.ilike.%${query}%`)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data || []
}