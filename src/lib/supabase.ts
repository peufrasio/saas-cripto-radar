import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          role: 'free' | 'pro' | 'elite' | 'admin'
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          role?: 'free' | 'pro' | 'elite' | 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          role?: 'free' | 'pro' | 'elite' | 'admin'
          created_at?: string
        }
      }
      alerts: {
        Row: {
          id: string
          token: string
          impact_score: number
          category: 'ALTA PROBABILIDADE' | 'ESPECULATIVO' | 'EVITAR'
          summary: string
          created_at: string
        }
        Insert: {
          id?: string
          token: string
          impact_score: number
          category: 'ALTA PROBABILIDADE' | 'ESPECULATIVO' | 'EVITAR'
          summary: string
          created_at?: string
        }
        Update: {
          id?: string
          token?: string
          impact_score?: number
          category?: 'ALTA PROBABILIDADE' | 'ESPECULATIVO' | 'EVITAR'
          summary?: string
          created_at?: string
        }
      }
    }
  }
}