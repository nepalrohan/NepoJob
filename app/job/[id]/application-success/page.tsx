import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ApplicationSuccessPage() {
  return (
    <div className="container mx-auto py-16 px-4 mt-16">
      <Card className="max-w-2xl mx-auto border-0 shadow-lg">
        <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-8">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>

          <p className="text-gray-600 mb-8 max-w-md">
            Thank you for your application. We've received it and will review it shortly. You'll receive a confirmation
            email with further details.
          </p>

          <div className="space-y-4 w-full max-w-xs">
            <Button asChild className="w-full bg-[#043866] hover:bg-[#F77300] transition-colors">
              <Link href="/jobs">Browse More Jobs</Link>
            </Button>

            <Button asChild variant="outline" className="w-full border-[#043866] text-[#043866]">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
