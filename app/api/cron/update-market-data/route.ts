import { type NextRequest, NextResponse } from "next/server"
import { adminFirestore } from "@/lib/firebase-admin"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all unique symbols from portfolios and watchlists
    const portfolioAssetsRef = adminFirestore.collection("portfolioAssets")
    const portfolioAssetsSnapshot = await portfolioAssetsRef.get()
    const portfolioSymbols = portfolioAssetsSnapshot.docs.map((doc) => doc.data().symbol)

    const watchlistItemsRef = adminFirestore.collection("watchlistItems")
    const watchlistItemsSnapshot = await watchlistItemsRef.get()
    const watchlistSymbols = watchlistItemsSnapshot.docs.map((doc) => doc.data().symbol)

    // Combine and deduplicate symbols
    const allSymbols = [...new Set([...portfolioSymbols, ...watchlistSymbols])]

    // Fetch current market data for all symbols
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY

    // Process in batches to avoid rate limits
    const batchSize = 5
    const batches = []

    for (let i = 0; i < allSymbols.length; i += batchSize) {
      batches.push(allSymbols.slice(i, i + batchSize))
    }

    const results = []

    for (const batch of batches) {
      const batchPromises = batch.map(async (symbol) => {
        try {
          const endpoint = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
          const response = await fetch(endpoint)

          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${symbol}`)
          }

          const data = await response.json()

          if (!data["Global Quote"] || !data["Global Quote"]["05. price"]) {
            console.warn(`Invalid data received for ${symbol}:`, data)
            return { symbol, success: false }
          }

          // Store the market data in Firestore
          const marketDataRef = adminFirestore.collection("marketData").doc(symbol)
          await marketDataRef.set({
            symbol,
            price: Number.parseFloat(data["Global Quote"]["05. price"] || "0"),
            change: Number.parseFloat(data["Global Quote"]["09. change"] || "0"),
            changePercent: Number.parseFloat((data["Global Quote"]["10. change percent"] || "0%").replace("%", "")),
            volume: Number.parseInt(data["Global Quote"]["06. volume"] || "0"),
            updatedAt: adminFirestore.FieldValue.serverTimestamp(),
          })

          return { symbol, success: true }
        } catch (error) {
          console.error(`Error updating market data for ${symbol}:`, error)
          return { symbol, success: false, error }
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)

      // Add delay between batches to respect API rate limits
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
    }

    const successCount = results.filter((r) => r.success).length

    // Log cron execution
    const cronLogRef = adminFirestore.collection("cronLogs").doc()
    await cronLogRef.set({
      job: "update-market-data",
      timestamp: adminFirestore.FieldValue.serverTimestamp(),
      processed: allSymbols.length,
      successful: successCount,
      results: results.map((r) => ({ symbol: r.symbol, success: r.success })),
    })

    return NextResponse.json({
      success: true,
      processed: allSymbols.length,
      successful: successCount,
    })
  } catch (error: any) {
    console.error("Error in update-market-data cron job:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

