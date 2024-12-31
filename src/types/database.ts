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
      // Otras tablas se agregarán aquí
    }
  }
}