"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mycolor px-4 py-12">
      <Card className="w-full max-w-md border-2 border-custom shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <AlertTriangle className="h-12 w-12 text-hoverColor" />
          </div>
          <CardTitle className="text-2xl font-bold text-custom">Oops! Forgot Password?</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Sorry for the inconvenience. Our password recovery feature is currently under development and will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-sm text-gray-700">
            In the meantime, please consider creating a new account to continue using our services.
          </p>
          <Button
            asChild
            className="w-full bg-custom hover:bg-custom/90 hover:text-hoverColor transition-colors"
          >
            <Link href="/signup">Create Another Account</Link>
          </Button>
          <p className="text-xs text-gray-500">
            We appreciate your patience and will notify you as soon as this feature is live.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
