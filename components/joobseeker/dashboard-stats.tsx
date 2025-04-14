import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { JobApplication } from "@/lib/types"
import { Briefcase, CheckCircle, Clock, XCircle, Calendar } from "lucide-react"

interface DashboardStatsProps {
  applications: JobApplication[]
}

export function DashboardStats({ applications }: DashboardStatsProps) {
  const totalApplications = applications.length
  const pendingApplications = applications.filter((app) => app.status === "Pending").length
  const reviewingApplications = applications.filter((app) => app.status === "Reviewing").length
  const interviewApplications = applications.filter((app) => app.status === "Interview").length
  const acceptedApplications = applications.filter((app) => app.status === "Accepted").length
  const rejectedApplications = applications.filter((app) => app.status === "Rejected").length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Applications</CardTitle>
          <Briefcase className="h-4 w-4 text-custom" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-custom">{totalApplications}</div>
          <p className="text-xs text-gray-500 mt-1">All time applications</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-custom">{pendingApplications + reviewingApplications}</div>
          <div className="flex gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
              {pendingApplications} Pending
            </span>
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
              {reviewingApplications} Reviewing
            </span>
          </div>
        </CardContent>
      </Card>

     

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Results</CardTitle>
          <div className="flex gap-1">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <XCircle className="h-4 w-4 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-custom">{acceptedApplications + rejectedApplications}</div>
          <div className="flex gap-2 mt-1">
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
              {acceptedApplications} Accepted
            </span>
            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 rounded-full">
              {rejectedApplications} Rejected
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
