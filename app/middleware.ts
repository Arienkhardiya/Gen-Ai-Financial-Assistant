import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/firebase-admin"

export async function middleware(request: NextRequest) {
  // Get response
  const response = NextResponse.next()

  // Add security headers
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://www.alphavantage.co;",
  )
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add CORS headers for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Access-Control-Allow-Origin", process.env.NEXT_PUBLIC_APP_URL || "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.set("Access-Control-Max-Age", "86400")

    // Handle OPTIONS request for CORS preflight
    if (request.method === "OPTIONS") {
      return new NextResponse(null, { status: 200, headers: response.headers })
    }
  }

  // Protect authenticated routes
  const protectedRoutes = ["/dashboard", "/profile", "/budgeting", "/portfolio", "/ai-assistant"]

  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    // Get the Firebase ID token from the request
    const idToken = request.cookies.get("firebaseIdToken")?.value

    if (!idToken) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    try {
      // Verify the ID token
      await auth.verifyIdToken(idToken)
    } catch (error) {
      // Token is invalid or expired
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)", "/api/:path*"],
}

