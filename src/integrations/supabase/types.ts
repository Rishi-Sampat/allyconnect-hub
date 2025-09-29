export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alumni_verification: {
        Row: {
          created_at: string | null
          department: string
          full_name: string
          graduation_year: number
          id: string
          phone: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          department: string
          full_name: string
          graduation_year: number
          id?: string
          phone: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          department?: string
          full_name?: string
          graduation_year?: number
          id?: string
          phone?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
          points_required: number
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          name: string
          points_required: number
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          points_required?: number
        }
        Relationships: []
      }
      doubts: {
        Row: {
          assigned_alumni_id: string | null
          attachments: string[] | null
          created_at: string | null
          description: string
          domain_tags: string[] | null
          id: string
          rating: number | null
          rating_comment: string | null
          resolved_at: string | null
          status: Database["public"]["Enums"]["doubt_status"] | null
          student_id: string
          title: string
          updated_at: string | null
          urgency: number | null
        }
        Insert: {
          assigned_alumni_id?: string | null
          attachments?: string[] | null
          created_at?: string | null
          description: string
          domain_tags?: string[] | null
          id?: string
          rating?: number | null
          rating_comment?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["doubt_status"] | null
          student_id: string
          title: string
          updated_at?: string | null
          urgency?: number | null
        }
        Update: {
          assigned_alumni_id?: string | null
          attachments?: string[] | null
          created_at?: string | null
          description?: string
          domain_tags?: string[] | null
          id?: string
          rating?: number | null
          rating_comment?: string | null
          resolved_at?: string | null
          status?: Database["public"]["Enums"]["doubt_status"] | null
          student_id?: string
          title?: string
          updated_at?: string | null
          urgency?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "doubts_assigned_alumni_id_fkey"
            columns: ["assigned_alumni_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doubts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_attendees: {
        Row: {
          event_id: string
          id: string
          registered_at: string | null
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          registered_at?: string | null
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          registered_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_attendees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          current_attendees: number | null
          description: string
          event_date: string
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string | null
          max_attendees: number | null
          organizer_id: string
          status: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_attendees?: number | null
          description: string
          event_date: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer_id: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_attendees?: number | null
          description?: string
          event_date?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer_id?: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string
          sender_id: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id: string
          sender_id: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          alumni_id: string
          application_deadline: string | null
          company: string
          created_at: string | null
          description: string
          domain_tags: string[] | null
          id: string
          is_active: boolean | null
          location: string | null
          requirements: string | null
          title: string
          type: Database["public"]["Enums"]["opportunity_type"]
          updated_at: string | null
        }
        Insert: {
          alumni_id: string
          application_deadline?: string | null
          company: string
          created_at?: string | null
          description: string
          domain_tags?: string[] | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          title: string
          type: Database["public"]["Enums"]["opportunity_type"]
          updated_at?: string | null
        }
        Update: {
          alumni_id?: string
          application_deadline?: string | null
          company?: string
          created_at?: string | null
          description?: string
          domain_tags?: string[] | null
          id?: string
          is_active?: boolean | null
          location?: string | null
          requirements?: string | null
          title?: string
          type?: Database["public"]["Enums"]["opportunity_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "opportunities_alumni_id_fkey"
            columns: ["alumni_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      otp_verification: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          otp_code: string
          phone: string
          used: boolean | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          otp_code: string
          phone: string
          used?: boolean | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          otp_code?: string
          phone?: string
          used?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          current_company: string | null
          department: string | null
          email: string
          enrollment_number: string | null
          full_name: string
          graduation_year: number | null
          headline: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          phone: string | null
          points: number | null
          portfolio_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
          username: string
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_company?: string | null
          department?: string | null
          email: string
          enrollment_number?: string | null
          full_name: string
          graduation_year?: number | null
          headline?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          points?: number | null
          portfolio_url?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
          username: string
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          current_company?: string | null
          department?: string | null
          email?: string
          enrollment_number?: string | null
          full_name?: string
          graduation_year?: number | null
          headline?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          points?: number | null
          portfolio_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
          username?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      student_verification: {
        Row: {
          batch_year: number
          created_at: string | null
          department: string
          email: string
          enrollment_number: string
          full_name: string
          id: string
          verified: boolean | null
        }
        Insert: {
          batch_year: number
          created_at?: string | null
          department: string
          email: string
          enrollment_number: string
          full_name: string
          id?: string
          verified?: boolean | null
        }
        Update: {
          batch_year?: number
          created_at?: string | null
          department?: string
          email?: string
          enrollment_number?: string
          full_name?: string
          id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      doubt_status: "open" | "assigned" | "in_progress" | "resolved"
      event_status: "upcoming" | "ongoing" | "completed" | "cancelled"
      opportunity_type: "internship" | "job" | "volunteer" | "project"
      user_role: "admin" | "alumni" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      doubt_status: ["open", "assigned", "in_progress", "resolved"],
      event_status: ["upcoming", "ongoing", "completed", "cancelled"],
      opportunity_type: ["internship", "job", "volunteer", "project"],
      user_role: ["admin", "alumni", "student"],
    },
  },
} as const
