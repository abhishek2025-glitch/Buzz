import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (supabaseClient) return supabaseClient
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

export const supabase = {
  get client() { return getSupabase() }
}

export interface Lead {
  id?: number
  email: string
  name: string
  company: string
  qualification_score: number
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  created_at?: string
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead | null> {
  const { data, error } = await supabase.client
    .from('leads')
    .insert([lead])
    .select()
    .single()

  if (error) {
    console.error('Error saving lead:', error)
    return null
  }

  return data
}
