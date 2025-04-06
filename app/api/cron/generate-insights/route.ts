import { type NextRequest, NextResponse } from "next/request"
import { adminFirestore } from "@/lib/firebase-admin"
import { generateFinancialInsights } from "@/lib/ai"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all user profiles
    const profilesRef = adminFirestore.collection("userProfiles")
    const profilesSnapshot = await profilesRef.get()
    const profiles = profilesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Process each user to generate insights
    const results = []

    for (const profile of profiles) {
      try {
        const userId = profile.uid || profile.id

        // Get user's transactions
        const transactionsRef = adminFirestore.collection("transactions")
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

        const transactionsQuery = transactionsRef.where("userId", "==", userId).where("date", ">=", threeMonthsAgo)

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

        // Skip users with no data
        if (!transactions.length && !portfolioAssets.length && !budgets.length && !goals.length) {
          results.push({ userId, status: "skipped", reason: "no data" })
          continue
        }

        // Generate insights
        const insights = await generateFinancialInsights({
          userId,
          financialData: {
            transactions,
            portfolios: portfolioAssets,
            budgets,
            goals,
          },
        })

        results.push({ userId, status: "success", insightsCount: insights.length })
      } catch (error) {
        console.error(`Error generating insights for user ${profile.id}:`, error)
        results.push({ userId: profile.id, status: "error", error: error.message })
      }
    }

    // Log cron execution
    const cronLogRef = adminFirestore.collection("cronLogs").doc()
    await cronLogRef.set({
      job: "generate-insights",
      timestamp: adminFirestore.FieldValue.serverTimestamp(),
      usersProcessed: profiles.length,
      results: results.map((r) => ({ userId: r.userId, status: r.status })),
    })

    return NextResponse.json({
      success: true,
      processed: profiles.length,
      results: results.map((r) => ({ userId: r.userId, status: r.status })),
    })
  } catch (error: any) {
    console.error("Error in generate-insights cron job:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

