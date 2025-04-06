import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

// Hardcoded Supabase credentials (same as in lib/supabase.ts)
const supabaseUrl = "https://bbgggdxypkbejneeswmh.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ2dnZHh5cGtiZWpuZWVzd21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTMxMTksImV4cCI6MjA1ODIyOTExOX0.7n0GTiRtT-ACULszNGyz08YO092HTc81MXgPKWEF_-k"

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()

    // Create the Supabase client with hardcoded values
    const supabase = createMiddlewareClient(
      {
        req,
        res,
      },
      {
        supabaseUrl,
        supabaseKey,
      },
    )

    // Refresh session if expired
    await supabase.auth.getSession()

    return res
  } catch (error) {
    console.error("Middleware error:", error)
    // Return the response even if there's an error to prevent blocking the request
    return NextResponse.next()
  }
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    // Apply this middleware only to routes that need auth
    "/profile/:path*",
    "/dashboard/:path*",
    "/api/auth/:path*",
    "/api/protected/:path*",
  ],
}

