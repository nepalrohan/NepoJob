import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

// Paths that don't require authentication
const publicPaths = ["/", "/login", "/signup", "/api/auth/login", "/api/auth/signup", "/jobs", "/job/[id]"]

// Paths that require employer role
const employerPaths = [
  "/employer/dashboard",
  "/employer/post-job",
  "/employer/applications",
  "/api/jobs/create",
  "/api/jobs/update",
  "/api/jobs/delete",
]

// Check if a path matches any of the patterns
const matchesPath = (path: string, patterns: string[]) => {
  return patterns.some((pattern) => {
    // Convert [id] pattern to regex
    if (pattern.includes("[id]")) {
      const regexPattern = pattern.replace("[id]", "[^/]+")
      return new RegExp(`^${regexPattern}$`).test(path)
    }
    return path === pattern || path.startsWith(`${pattern}/`)
  })
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip middleware for static assets and API routes that don't need auth
  if (
    path.startsWith("/_next") ||
    path.startsWith("/static") ||
    path.startsWith("/api/jobs/list") ||
    path.startsWith("/api/jobs/get")
  ) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value

  // Check if user is authenticated
  const isAuthenticated = token && (await verifyToken(token))
  const user = isAuthenticated ? await verifyToken(token) : null
  const isEmployer = user?.role === "EMPLOYER"

  // Redirect unauthenticated users from protected routes to login
  if (!isAuthenticated && !matchesPath(path, publicPaths)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect authenticated users from auth pages to dashboard
  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(new URL(isEmployer ? "/employer/dashboard" : "/jobseeker/dashboard", request.url))
  }

  // Check employer-only routes
  if (isAuthenticated && !isEmployer && matchesPath(path, employerPaths)) {
    return NextResponse.redirect(new URL("/jobseeker/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
}
