import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Hardcoded Supabase credentials (same as in lib/supabase.ts)
const supabaseUrl = "https://bbgggdxypkbejneeswmh.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ2dnZHh5cGtiZWpuZWVzd21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTMxMTksImV4cCI6MjA1ODIyOTExOX0.7n0GTiRtT-ACULszNGyz08YO092HTc81MXgPKWEF_-k"

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient(
        {
          cookies: () => cookieStore,
        },
        {
          supabaseUrl,
          supabaseKey,
        },
      )

      await supabase.auth.exchangeCodeForSession(code)
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin)
  } catch (error) {
    console.error("Auth callback error:", error)
    // Redirect to login page with error
    const requestUrl = new URL(request.url)
    return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_callback_failed`)
  }
}

