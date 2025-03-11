import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/login" || path === "/menu"

  // Get the user session from the cookie
  const userCookie = request.cookies.get("user")?.value
  let user = null

  try {
    if (userCookie) {
      user = JSON.parse(userCookie)
    }
  } catch (error) {
    // Invalid cookie, treat as no user
  }

  // Check if user is authenticated
  const isAuthenticated = !!user

  // Check if path is for admin routes
  const isAdminPath = path.startsWith("/admin")

  // Check if user is admin
  const isAdmin = user?.isAdmin === true

  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login if trying to access protected route without authentication
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAdminPath && !isAdmin) {
    // Redirect to home if trying to access admin route without admin privileges
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public assets)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)",
  ],
}

