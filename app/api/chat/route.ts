import { type NextRequest, NextResponse } from "next/server"
import { adminFirestore } from "@/lib/firebase-admin"
import { verifyAuthToken } from "../auth/verify-token"
import { chatWithFinancialAI } from "@/lib/ai"
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

    // Get the current user from Firebase Auth
    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1]

    // Verify the token using Admin SDK
    try {
      const decodedToken = await verifyAuthToken(idToken)
      const userId = decodedToken.uid

      const body = await request.json()
      const { message, chatHistory } = body

      if (!message) {
        return NextResponse.json({ error: "Message is required" }, { status: 400 })
      }

      // Get financial context for personalized responses
      // Get transactions
      const transactionsRef = adminFirestore.collection("transactions")
      const transactionsQuery = transactionsRef.where("userId", "==", userId).orderBy("date", "desc").limit(20)

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

      // Create chat request
      const chatRequest = {
        userId,
        message,
        chatHistory,
        financialContext: {
          transactions,
          portfolios,
          budgets,
          goals,
        },
      }

      // Generate AI response
      const response = await chatWithFinancialAI(chatRequest)

      // Log activity
      const activityRef = adminFirestore.collection("userActivity")
      await activityRef.add({
        userId,
        action: "CHAT_INTERACTION",
        details: { messageLength: message.length },
        timestamp: adminFirestore.FieldValue.serverTimestamp(),
      })

      // Save chat to history
      const chatHistoryRef = adminFirestore.collection("chatHistory")
      await chatHistoryRef.add({
        userId,
        message,
        response,
        createdAt: adminFirestore.FieldValue.serverTimestamp(),
      })

      return NextResponse.json({ response })
    } catch (authError) {
      console.error("Authentication error:", authError)
      return NextResponse.json({ error: "Unauthorized: Please sign in to access this resource" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

