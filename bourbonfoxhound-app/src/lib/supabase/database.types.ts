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
          username: string
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          updated_at?: string
        }
      }
      bourbons: {
        Row: {
          id: string
          name: string
          distillery: string | null
          proof: number | null
          age: number | null
          mashbill: string | null
          msrp: number | null
          image_url: string | null
          description: string | null
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          distillery?: string | null
          proof?: number | null
          age?: number | null
          mashbill?: string | null
          msrp?: number | null
          image_url?: string | null
          description?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          distillery?: string | null
          proof?: number | null
          age?: number | null
          mashbill?: string | null
          msrp?: number | null
          image_url?: string | null
          description?: string | null
          tags?: string[]
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          bourbon_id: string
          rating: number
          notes: string | null
          location_name: string | null
          location_lat: number | null
          location_lng: number | null
          photo_urls: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bourbon_id: string
          rating: number
          notes?: string | null
          location_name?: string | null
          location_lat?: number | null
          location_lng?: number | null
          photo_urls?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          rating?: number
          notes?: string | null
          location_name?: string | null
          location_lat?: number | null
          location_lng?: number | null
          photo_urls?: string[]
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string | null
          lat: number
          lng: number
          type: 'bar' | 'store' | 'distillery' | 'restaurant' | 'other'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          lat: number
          lng: number
          type?: 'bar' | 'store' | 'distillery' | 'restaurant' | 'other'
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
