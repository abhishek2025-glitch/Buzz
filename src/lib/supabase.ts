import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  const { data, error } = await supabase
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
