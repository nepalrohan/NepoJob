import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { hashPassword } from "@/lib/password"
import { createToken, setTokenCookie } from "@/lib/auth"

// Validation schema for signup
const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["JOBSEEKER", "EMPLOYER"], { required_error: "Role is required" }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("I have received this data in backend", body)

    // Validate request body
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { fullName, email, password, role } = result.data
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role,
        // Create empty profile
        profile: {
          create: {
            firstName: fullName.split(" ")[0],
            lastName: fullName.split(" ").slice(1).join(" ") || "",
          },
        },
      },
      include: {
        profile: true,
      },
    })

    // Create token
    const token = await createToken(user)

    // Set token in cookies
    setTokenCookie(token)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "User created successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}
