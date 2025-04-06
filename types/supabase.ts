export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string | null
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          bio: string | null
          risk_profile: "conservative" | "moderate" | "aggressive" | null
          notification_preferences: Json | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          risk_profile?: "conservative" | "moderate" | "aggressive" | null
          notification_preferences?: Json | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          risk_profile?: "conservative" | "moderate" | "aggressive" | null
          notification_preferences?: Json | null
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string | null
          name: string
          description: string | null
          is_default: boolean
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string | null
          name: string
          description?: string | null
          is_default?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string | null
          name?: string
          description?: string | null
          is_default?: boolean
        }
      }
      portfolio_assets: {
        Row: {
          id: string
          portfolio_id: string
          symbol: string
          quantity: number
          purchase_price: number
          purchase_date: string
          created_at: string
          updated_at: string | null
          asset_type: "stock" | "etf" | "crypto" | "bond" | "other"
        }
        Insert: {
          id?: string
          portfolio_id: string
          symbol: string
          quantity: number
          purchase_price: number
          purchase_date: string
          created_at?: string
          updated_at?: string | null
          asset_type: "stock" | "etf" | "crypto" | "bond" | "other"
        }
        Update: {
          id?: string
          portfolio_id?: string
          symbol?: string
          quantity?: number
          purchase_price?: number
          purchase_date?: string
          created_at?: string
          updated_at?: string | null
          asset_type?: "stock" | "etf" | "crypto" | "bond" | "other"
        }
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          name: string
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          created_at?: string
          updated_at?: string | null
        }
      }
      watchlist_items: {
        Row: {
          id: string
          watchlist_id: string
          symbol: string
          created_at: string
          asset_type: "stock" | "etf" | "crypto" | "forex" | "other"
          notes: string | null
        }
        Insert: {
          id?: string
          watchlist_id: string
          symbol: string
          created_at?: string
          asset_type: "stock" | "etf" | "crypto" | "forex" | "other"
          notes?: string | null
        }
        Update: {
          id?: string
          watchlist_id?: string
          symbol?: string
          created_at?: string
          asset_type?: "stock" | "etf" | "crypto" | "forex" | "other"
          notes?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          transaction_date: string
          amount: number
          category: string
          description: string | null
          transaction_type: "income" | "expense" | "transfer"
          created_at: string
          updated_at: string | null
          account_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          transaction_date: string
          amount: number
          category: string
          description?: string | null
          transaction_type: "income" | "expense" | "transfer"
          created_at?: string
          updated_at?: string | null
          account_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          transaction_date?: string
          amount?: number
          category?: string
          description?: string | null
          transaction_type?: "income" | "expense" | "transfer"
          created_at?: string
          updated_at?: string | null
          account_id?: string | null
        }
      }
      budgets: {
        Row: {
          id: string
          user_id: string
          name: string
          amount: number
          period: "daily" | "weekly" | "monthly" | "yearly"
          category: string
          created_at: string
          updated_at: string | null
          start_date: string
          end_date: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          amount: number
          period: "daily" | "weekly" | "monthly" | "yearly"
          category: string
          created_at?: string
          updated_at?: string | null
          start_date: string
          end_date?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          amount?: number
          period?: "daily" | "weekly" | "monthly" | "yearly"
          category?: string
          created_at?: string
          updated_at?: string | null
          start_date?: string
          end_date?: string | null
        }
      }
      financial_goals: {
        Row: {
          id: string
          user_id: string
          name: string
          target_amount: number
          current_amount: number
          deadline: string | null
          created_at: string
          updated_at: string | null
          goal_type: "savings" | "debt_repayment" | "investment" | "retirement" | "other"
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target_amount: number
          current_amount: number
          deadline?: string | null
          created_at?: string
          updated_at?: string | null
          goal_type: "savings" | "debt_repayment" | "investment" | "retirement" | "other"
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          target_amount?: number
          current_amount?: number
          deadline?: string | null
          created_at?: string
          updated_at?: string | null
          goal_type?: "savings" | "debt_repayment" | "investment" | "retirement" | "other"
        }
      }
      ai_insights: {
        Row: {
          id: string
          user_id: string
          insight_type: "investment" | "budget" | "savings" | "general"
          content: string
          created_at: string
          read: boolean
          priority: "low" | "medium" | "high"
          action_taken: boolean
        }
        Insert: {
          id?: string
          user_id: string
          insight_type: "investment" | "budget" | "savings" | "general"
          content: string
          created_at?: string
          read?: boolean
          priority?: "low" | "medium" | "high"
          action_taken?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          insight_type?: "investment" | "budget" | "savings" | "general"
          content?: string
          created_at?: string
          read?: boolean
          priority?: "low" | "medium" | "high"
          action_taken?: boolean
        }
      }
      chat_history: {
        Row: {
          id: string
          user_id: string
          message: string
          response: string
          created_at: string
          context: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          response: string
          created_at?: string
          context?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          response?: string
          created_at?: string
          context?: Json | null
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

