export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      academies: {
        Row: {
          id: string
          name: string
          business_type: string
          status: string
          subscription_plan: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          business_type: string
          status?: string
          subscription_plan?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          business_type?: string
          status?: string
          subscription_plan?: string | null
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'superadmin' | 'admin' | 'teacher' | 'student'
          academy_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role: 'superadmin' | 'admin' | 'teacher' | 'student'
          academy_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'superadmin' | 'admin' | 'teacher' | 'student'
          academy_id?: string | null
          updated_at?: string
        }
      }
      // Add other tables following the same pattern
    }
  }
}