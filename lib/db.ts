import { supabase } from "./supabase"

// User profiles
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    throw error
  }

  return data
}

// Watchlists
export async function getUserWatchlists(userId: string) {
  const { data, error } = await supabase
    .from("watchlists")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching watchlists:", error)
    return []
  }

  return data
}

export async function addToWatchlist(userId: string, symbol: string, type = "stock") {
  const { data, error } = await supabase
    .from("watchlist_items")
    .insert({
      user_id: userId,
      symbol,
      type,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function removeFromWatchlist(userId: string, symbol: string) {
  const { error } = await supabase.from("watchlist_items").delete().eq("user_id", userId).eq("symbol", symbol)

  if (error) {
    throw error
  }

  return true
}

// Budget tracking
export async function getUserBudgets(userId: string) {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching budgets:", error)
    return []
  }

  return data
}

export async function createBudget(userId: string, budgetData: any) {
  const { data, error } = await supabase
    .from("budgets")
    .insert({
      user_id: userId,
      ...budgetData,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

// Transactions
export async function getUserTransactions(userId: string, limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error("Error fetching transactions:", error)
    return []
  }

  return data
}

export async function addTransaction(userId: string, transactionData: any) {
  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: userId,
      ...transactionData,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

