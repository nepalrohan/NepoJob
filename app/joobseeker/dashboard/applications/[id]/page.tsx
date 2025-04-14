"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Briefcase, Calendar, Clock, FileText, MapPin, User, DollarSign, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockApplications } from "@/lib/data/mock-application"
import { ApplicationStatusBadge } from "@/components/joobseeker/application-status-badge"

export default function ApplicationDetails() {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.id as string

  // In a real app, you would fetch this data from an API
  const application = mockApplications.find((app) => app.id === applicationId)

  if (!application) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-custom mb-4">Application Not Found</h1>
        <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard")} className="bg-custom hover:bg-hoverColor transition-colors">
          Return to Dashboard
        </Button>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  // Update the getStatusDescription function to remove Interview status
  const getStatusDescription = (status: string) => {
    switch (status) {
      case "Pending":
        return "Your application is pending review by the employer."
      case "Received":
        return "Your application has been received by the employer."
      case "Reviewing":
        return "Your application is being reviewed by the hiring team."
      case "Accepted":
        return "Congratulations! Your application has been accepted."
      case "Rejected":
        return "Unfortunately, your application was not selected for this position."
      default:
        return ""
    }
  }

  // Remove the entire Application Timeline card by replacing the grid layout section with this updated version
  return (
    <div className="container mx-auto py-8 px-4 mt-12">
      <Button
        variant="ghost"
        className="mb-6 text-custom hover:text-custom bg-custom/10 hover:bg-custom/20"
        onClick={() => router.push("/joobseeker/dashboard")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-custom">{application.jobTitle}</h1>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <Building className="h-4 w-4" />
            <span>{application.companyName}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-custom" />
                Application Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                <div className="flex items-center gap-3">
                  <ApplicationStatusBadge status={application.status} />
                  <span className="text-sm text-gray-700">{getStatusDescription(application.status)}</span>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Alex Johnson</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{application.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">Applied on {formatDate(application.appliedDate)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Professional Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Briefcase className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium block">Senior Frontend Developer</span>
                        <span className="text-xs text-gray-500">5-10 years experience</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium block">Expected Salary</span>
                        <span className="text-xs text-gray-500">$120,000</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium block">Notice Period</span>
                        <span className="text-xs text-gray-500">2 weeks</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "React", "TypeScript", "CSS", "HTML", "Node.js", "GraphQL"].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Cover Letter</h3>
                <p className="text-sm text-gray-700">
                  I am excited to apply for the {application.jobTitle} position at {application.companyName}. With my
                  experience in frontend development and passion for creating intuitive user interfaces, I believe I
                  would be a great addition to your team.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Preferences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    <span className="text-sm">Preferred Work Type: Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    <span className="text-sm">Willing to Relocate: No</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-custom" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-custom" />
                  <span className="text-sm font-medium">Resume</span>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-custom border-custom hover:bg-custom/10">
                  View
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-custom" />
                  <span className="text-sm font-medium">Cover Letter</span>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-custom border-custom hover:bg-custom/10">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={() => router.push(`/job/${application.jobId}`)}
            variant="outline"
            className="w-full border-custom text-custom hover:bg-custom/10"
          >
            View Original Job Posting
          </Button>
        </div>
      </div>
    </div>
  )
}
