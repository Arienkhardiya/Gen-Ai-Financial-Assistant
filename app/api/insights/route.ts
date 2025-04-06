import { type NextRequest, NextResponse } from "next/server"
import { adminFirestore } from "@/lib/firebase-admin"
import { verifyAuthToken } from "../auth/verify-token"
import { generateFinancialInsights } from "@/lib/ai"
import { rateLimiter } from "@/lib/rate-limit"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const rateLimitResult = await rateLimiter.limit(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    // Validate session
    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1]

    try {
      const decodedToken = await verifyAuthToken(idToken)
      const userId = decodedToken.uid

      const body = await request.json()
      const { specificFocus } = body

      // Get user's financial data for insights
      // Get transactions
      const transactionsRef = adminFirestore.collection("transactions")
      const transactionsQuery = transactionsRef.where("userId", "==", userId).orderBy("date", "desc").limit(100)

      const transactionsSnapshot = await transactionsQuery.get()
      const transactions = transactionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Get portfolios
      const portfoliosRef = adminFirestore.collection("portfolios")
      const portfoliosQuery = portfoliosRef.where("userId", "==", userId)

      const portfoliosSnapshot = await portfoliosQuery.get()
      const portfolios = portfoliosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // For each portfolio, get its assets
      const portfolioAssets = []
      for (const portfolio of portfolios) {
        const assetsRef = adminFirestore.collection("portfolioAssets")
        const assetsQuery = assetsRef.where("portfolioId", "==", portfolio.id)

        const assetsSnapshot = await assetsQuery.get()
        const assets = assetsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        portfolioAssets.push({
          ...portfolio,
          assets,
        })
      }

      // Get budgets
      const budgetsRef = adminFirestore.collection("budgets")
      const budgetsQuery = budgetsRef.where("userId", "==", userId)

      const budgetsSnapshot = await budgetsQuery.get()
      const budgets = budgetsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Get financial goals
      const goalsRef = adminFirestore.collection("financialGoals")
      const goalsQuery = goalsRef.where("userId", "==", userId)

      const goalsSnapshot = await goalsQuery.get()
      const goals = goalsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Generate insights
      const insights = await generateFinancialInsights({
        userId,
        financialData: {
          transactions,
          portfolios: portfolioAssets,
          budgets,
          goals,
        },
        specificFocus,
      })

      // Log activity
      const activityRef = adminFirestore.collection("userActivity")
      await activityRef.add({
        userId,
        action: "GENERATE_INSIGHTS",
        details: { specificFocus, insightsCount: insights.length },
        timestamp: adminFirestore.FieldValue.serverTimestamp(),
      })

      return NextResponse.json({ insights })
    } catch (authError) {
      console.error("Authentication error:", authError)
      return NextResponse.json({ error: "Unauthorized: Please sign in to access this resource" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("Error generating insights:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

