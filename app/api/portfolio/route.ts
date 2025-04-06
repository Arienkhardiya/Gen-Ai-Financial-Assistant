import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"

export async function GET(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's portfolios
    const { data: portfolios, error: portfoliosError } = await supabase
      .from("portfolios")
      .select("*")
      .eq("user_id", session.user.id)

    if (portfoliosError) {
      throw portfoliosError
    }

    // Get portfolio assets for each portfolio
    const portfolioIds = portfolios.map((portfolio) => portfolio.id)

    const { data: assets, error: assetsError } = await supabase
      .from("portfolio_assets")
      .select("*")
      .in("portfolio_id", portfolioIds)

    if (assetsError) {
      throw assetsError
    }

    // Group assets by portfolio
    const portfoliosWithAssets = portfolios.map((portfolio) => ({
      ...portfolio,
      assets: assets.filter((asset) => asset.portfolio_id === portfolio.id),
    }))

    return NextResponse.json({ portfolios: portfoliosWithAssets })
  } catch (error) {
    console.error("Error fetching portfolios:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, description, is_default } = await request.json()

    // Create new portfolio
    const { data, error } = await supabase
      .from("portfolios")
      .insert({
        user_id: session.user.id,
        name,
        description,
        is_default: is_default || false,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ portfolio: data })
  } catch (error) {
    console.error("Error creating portfolio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

