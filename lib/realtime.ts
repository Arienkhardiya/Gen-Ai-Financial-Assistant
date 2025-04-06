import { createClientSupabaseClient } from "./supabase-client"

export type RealtimeSubscription = {
  unsubscribe: () => void
}

export function subscribeToPortfolio(portfolioId: string, callback: (payload: any) => void): RealtimeSubscription {
  const supabase = createClientSupabaseClient()

  const subscription = supabase
    .channel(`portfolio:${portfolioId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "portfolio_assets",
        filter: `portfolio_id=eq.${portfolioId}`,
      },
      (payload) => {
        callback(payload)
      },
    )
    .subscribe()

  return {
    unsubscribe: () => {
      supabase.removeChannel(subscription)
    },
  }
}

export function subscribeToWatchlist(watchlistId: string, callback: (payload: any) => void): RealtimeSubscription {
  const supabase = createClientSupabaseClient()

  const subscription = supabase
    .channel(`watchlist:${watchlistId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "watchlist_items",
        filter: `watchlist_id=eq.${watchlistId}`,
      },
      (payload) => {
        callback(payload)
      },
    )
    .subscribe()

  return {
    unsubscribe: () => {
      supabase.removeChannel(subscription)
    },
  }
}

export function subscribeToAIInsights(userId: string, callback: (payload: any) => void): RealtimeSubscription {
  const supabase = createClientSupabaseClient()

  const subscription = supabase
    .channel(`insights:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "ai_insights",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload)
      },
    )
    .subscribe()

  return {
    unsubscribe: () => {
      supabase.removeChannel(subscription)
    },
  }
}

