import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { comparePassword } from "@/lib/password"
import { createToken, setTokenCookie } from "@/lib/auth"

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  role: z.enum(["JOBSEEKER", "EMPLOYER"], { required_error: "Role is required" }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    // Validate request body
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { email, password, role } = result.data

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }
    // Verify password
    const passwordValid = await comparePassword(password, user.password)
    if (!passwordValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    //check the role is correct or not
    if (user.role.toUpperCase() !== role.toUpperCase()){
    return NextResponse.json({ error: "Not authorized for this role" }, { status: 401 })

}



    // Create token
    const token = await createToken(user)

    // Set token in cookies
    setTokenCookie(token)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to login" }, { status: 500 })
  }
}
