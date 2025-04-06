import { type NextRequest, NextResponse } from "next/server"
import { adminFirestore } from "@/lib/firebase-admin"
import { verifyAuthToken } from "../auth/verify-token"
import { rateLimiter } from "@/lib/rate-limit"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const rateLimitResult = await rateLimiter.limit(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    // Auth validation
    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1]

    try {
      const decodedToken = await verifyAuthToken(idToken)
      const userId = decodedToken.uid

      const { searchParams } = new URL(request.url)
      const symbol = searchParams.get("symbol")
      const range = searchParams.get("range") || "1d"

      if (!symbol) {
        return NextResponse.json({ error: "Symbol is required" }, { status: 400 })
      }

      // Check cache first
      const cacheKey = `${symbol}-${range}`
      const cacheRef = adminFirestore.collection("marketDataCache").doc(cacheKey)
      const cacheSnapshot = await cacheRef.get()

      // If cache exists and is not too old
      if (cacheSnapshot.exists) {
        const cacheData = cacheSnapshot.data()
        if (cacheData) {
          const cacheTime = cacheData.timestamp.toDate()
          const now = new Date()
          const cacheAge = (now.getTime() - cacheTime.getTime()) / 1000 // Age in seconds

          // Return cache if less than 5 minutes old for real-time data
          if (cacheAge < 300) {
            return NextResponse.json(cacheData.data)
          }
        }
      }

      // Fetch fresh data from Alpha Vantage
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY
      let endpoint

      if (range === "1d") {
        endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
      } else if (range === "1w" || range === "1m") {
        endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
      } else {
        endpoint = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`
      }

      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.statusText}`)
      }

      const data = await response.json()

      // Save to cache
      await cacheRef.set({
        data,
        timestamp: adminFirestore.FieldValue.serverTimestamp(),
        symbol,
        range,
      })

      // Save the request to user activity log
      const activityRef = adminFirestore.collection("userActivity")
      await activityRef.add({
        userId,
        action: "FETCH_MARKET_DATA",
        details: { symbol, range },
        timestamp: adminFirestore.FieldValue.serverTimestamp(),
      })

      return NextResponse.json(data)
    } catch (authError) {
      console.error("Authentication error:", authError)
      return NextResponse.json({ error: "Unauthorized: Please sign in to access this resource" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("Error fetching market data:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch market data" }, { status: 500 })
  }
}

