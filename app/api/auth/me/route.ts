import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getTokenCookie, verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = await getTokenCookie()

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const payload = await verifyToken(token)
    if (!payload || !payload.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data (without password)
    const { password, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Get current user error:", error)
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 })
  }
}
