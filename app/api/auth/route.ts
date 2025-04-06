import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// Hardcoded Supabase credentials (same as in lib/supabase.ts)
const supabaseUrl = "https://bbgggdxypkbejneeswmh.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ2dnZHh5cGtiZWpuZWVzd21oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NTMxMTksImV4cCI6MjA1ODIyOTExOX0.7n0GTiRtT-ACULszNGyz08YO092HTc81MXgPKWEF_-k"

export async function POST(request: Request) {
  try {
    const { action, email, password, userData } = await request.json()
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

    if (action === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ data })
    } else if (action === "signin") {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ data })
    } else if (action === "signout") {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

