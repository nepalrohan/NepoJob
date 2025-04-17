import type { NextRequest, NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { User } from "@/lib/generated/prisma"

// Secret key for JWT - in production, use a proper secret management system
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your_jwt_secret_should_be_at_least_32_characters_long",
)

// Token expiration time
const EXPIRATION_TIME = "8h"

// Create a JWT token for a user
export async function createToken(user: Partial<User>) {
  // Remove sensitive data
  const { password, ...userWithoutPassword } = user

  // Create and sign the token
  const token = await new SignJWT({ ...userWithoutPassword })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(EXPIRATION_TIME)
    .sign(JWT_SECRET)

  return token
}

// Set the token in cookies
export function setTokenCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: "strict",
  })
}
// Get the token from cookies
export  async function getTokenCookie() {
    const cookieStore = await cookies();

  return cookieStore.get("token")?.value
}

// Delete the token cookie (for logout)
export async  function deleteTokenCookie() {
    const cookieStore = await cookies();

    cookieStore.delete("token")
}

// Verify a token and return the user data
export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET)
    return verified.payload as Partial<User>
  } catch (error) {
    return null
  }
}

// Get the current user from the request
export async function getCurrentUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return null
  }

  return await verifyToken(token)
}
