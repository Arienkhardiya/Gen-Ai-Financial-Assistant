import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"
import { verifyAuthToken } from "../auth/verify-token"
import { rateLimiter } from "@/lib/rate-limit"

// Initialize Gemini AI with server-side environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

// Safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

// Helper function to get model
const getModel = (modelName = "gemini-pro") => {
  return genAI.getGenerativeModel({ model: modelName, safetySettings })
}

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    const rateLimitResult = await rateLimiter.limit(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    // Verify authentication
    const idToken = request.headers.get("Authorization")?.split("Bearer ")[1]

    try {
      const decodedToken = await verifyAuthToken(idToken)
      const userId = decodedToken.uid

      const body = await request.json()
      const { prompt, modelName, operation, data } = body

      if (!prompt || !operation) {
        return NextResponse.json({ error: "Prompt and operation are required" }, { status: 400 })
      }

      // Get the model
      const model = getModel(modelName || "gemini-pro")

      // Generate content
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      // Return the response
      return NextResponse.json({
        result: text,
        operation,
        userId,
      })
    } catch (authError) {
      console.error("Authentication error:", authError)
      return NextResponse.json({ error: "Unauthorized: Please sign in to access this resource" }, { status: 401 })
    }
  } catch (error: any) {
    console.error("Error in AI API:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

