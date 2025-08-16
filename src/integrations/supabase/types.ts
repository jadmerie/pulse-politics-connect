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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      campaign_analytics: {
        Row: {
          campaign_id: string
          clicks: number | null
          comments: number | null
          created_at: string
          date_recorded: string
          engagement_count: number | null
          id: string
          impressions: number | null
          platform: string
          shares: number | null
          submission_id: string | null
        }
        Insert: {
          campaign_id: string
          clicks?: number | null
          comments?: number | null
          created_at?: string
          date_recorded?: string
          engagement_count?: number | null
          id?: string
          impressions?: number | null
          platform: string
          shares?: number | null
          submission_id?: string | null
        }
        Update: {
          campaign_id?: string
          clicks?: number | null
          comments?: number | null
          created_at?: string
          date_recorded?: string
          engagement_count?: number | null
          id?: string
          impressions?: number | null
          platform?: string
          shares?: number | null
          submission_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_analytics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_analytics_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "content_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_invitations: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          influencer_id: string
          message: string | null
          offered_amount: number | null
          status: string | null
          terms: string | null
          updated_at: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          influencer_id: string
          message?: string | null
          offered_amount?: number | null
          status?: string | null
          terms?: string | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          influencer_id?: string
          message?: string | null
          offered_amount?: number | null
          status?: string | null
          terms?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_invitations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_invitations_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number
          compliance_notes: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          pac_id: string
          start_date: string | null
          status: string | null
          target_demographics: Json | null
          updated_at: string
        }
        Insert: {
          budget?: number
          compliance_notes?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          pac_id: string
          start_date?: string | null
          status?: string | null
          target_demographics?: Json | null
          updated_at?: string
        }
        Update: {
          budget?: number
          compliance_notes?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          pac_id?: string
          start_date?: string | null
          status?: string | null
          target_demographics?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_pac_id_fkey"
            columns: ["pac_id"]
            isOneToOne: false
            referencedRelation: "pacs"
            referencedColumns: ["id"]
          },
        ]
      }
      content_submissions: {
        Row: {
          campaign_id: string
          caption: string | null
          compliance_checked: boolean | null
          content_type: string
          content_url: string | null
          created_at: string
          fec_disclosure: string | null
          id: string
          influencer_id: string
          platform: string
          review_notes: string | null
          status: string | null
          submission_date: string | null
          updated_at: string
        }
        Insert: {
          campaign_id: string
          caption?: string | null
          compliance_checked?: boolean | null
          content_type: string
          content_url?: string | null
          created_at?: string
          fec_disclosure?: string | null
          id?: string
          influencer_id: string
          platform: string
          review_notes?: string | null
          status?: string | null
          submission_date?: string | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          caption?: string | null
          compliance_checked?: boolean | null
          content_type?: string
          content_url?: string | null
          created_at?: string
          fec_disclosure?: string | null
          id?: string
          influencer_id?: string
          platform?: string
          review_notes?: string | null
          status?: string | null
          submission_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_submissions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_submissions_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          campaign_id: string
          created_at: string
          id: string
          influencer_user_id: string
          last_message_at: string | null
          pac_user_id: string
          updated_at: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          id?: string
          influencer_user_id: string
          last_message_at?: string | null
          pac_user_id: string
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          id?: string
          influencer_user_id?: string
          last_message_at?: string | null
          pac_user_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      influencers: {
        Row: {
          availability_status: string | null
          content_categories: string[] | null
          created_at: string
          engagement_rates: Json
          follower_counts: Json
          id: string
          platforms: Json
          political_affiliations: string[] | null
          rate_per_post: number | null
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          availability_status?: string | null
          content_categories?: string[] | null
          created_at?: string
          engagement_rates?: Json
          follower_counts?: Json
          id?: string
          platforms?: Json
          political_affiliations?: string[] | null
          rate_per_post?: number | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          availability_status?: string | null
          content_categories?: string[] | null
          created_at?: string
          engagement_rates?: Json
          follower_counts?: Json
          id?: string
          platforms?: Json
          political_affiliations?: string[] | null
          rate_per_post?: number | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "influencers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      messages: {
        Row: {
          campaign_id: string
          content: string
          created_at: string
          id: string
          read_at: string | null
          recipient_id: string
          sender_id: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          campaign_id: string
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id: string
          sender_id: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pacs: {
        Row: {
          admin_user_id: string
          campaign_budget: number | null
          created_at: string
          description: string | null
          fec_id: string | null
          id: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          admin_user_id: string
          campaign_budget?: number | null
          created_at?: string
          description?: string | null
          fec_id?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          admin_user_id?: string
          campaign_budget?: number | null
          created_at?: string
          description?: string | null
          fec_id?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pacs_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          campaign_id: string
          created_at: string
          id: string
          influencer_id: string | null
          notes: string | null
          payment_method: string | null
          payment_type: string
          status: string | null
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          campaign_id: string
          created_at?: string
          id?: string
          influencer_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_type: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          campaign_id?: string
          created_at?: string
          id?: string
          influencer_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_type?: string
          status?: string | null
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_influencer_id_fkey"
            columns: ["influencer_id"]
            isOneToOne: false
            referencedRelation: "influencers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          location: string | null
          political_party: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          location?: string | null
          political_party?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          location?: string | null
          political_party?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
    Enums: {},
  },
} as const
