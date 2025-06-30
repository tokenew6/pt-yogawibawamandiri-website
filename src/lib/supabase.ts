import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          thumbnail: string | null
          slug: string
          author: string
          published: boolean
          created_at: string
          updated_at: string
          tags: string[] | null
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          thumbnail?: string | null
          slug: string
          author: string
          published?: boolean
          created_at?: string
          updated_at?: string
          tags?: string[] | null
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          thumbnail?: string | null
          slug?: string
          author?: string
          published?: boolean
          created_at?: string
          updated_at?: string
          tags?: string[] | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          images: string[]
          date: string
          category: string
          location: string | null
          status: 'completed' | 'ongoing' | 'planned'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          images: string[]
          date: string
          category: string
          location?: string | null
          status?: 'completed' | 'ongoing' | 'planned'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          images?: string[]
          date?: string
          category?: string
          location?: string | null
          status?: 'completed' | 'ongoing' | 'planned'
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          features: string[]
          active: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          features: string[]
          active?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          features?: string[]
          active?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      files: {
        Row: {
          id: string
          name: string
          type: string
          url: string
          size: number
          uploaded_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          url: string
          size: number
          uploaded_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          url?: string
          size?: number
          uploaded_by?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'editor' | 'viewer' | 'client'
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer' | 'client'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'editor' | 'viewer' | 'client'
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          type: 'text' | 'json' | 'image' | 'boolean'
          description: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          type?: 'text' | 'json' | 'image' | 'boolean'
          description?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          type?: 'text' | 'json' | 'image' | 'boolean'
          description?: string | null
          updated_at?: string
        }
      }
    }
  }
}
