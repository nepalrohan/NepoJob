"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  Download,
  MessageSquare,
  Star,
  StarHalf,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockApplications } from "@/lib/data/mock-application"
import { ApplicationStatus } from "@/lib/types"
import { ApplicationStatusBadge } from "@/components/employeer/application-status-badge"
import { StatusChangeDropdown } from "@/components/employeer/status-change-dropdown"

export default function ApplicationDetails() {
  const params = useParams()
  const router = useRouter()
  const applicationId = params.id as string

  // In a real app, you would fetch this data from an API
  const [application, setApplication] = useState(mockApplications.find((app) => app.id === applicationId))

  const [notes, setNotes] = useState("")
  const [isSavingNotes, setIsSavingNotes] = useState(false)

  if (!application) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-custom mb-4">Application Not Found</h1>
        <p className="text-gray-600 mb-6">The application you're looking for doesn't exist or has been removed.</p>
        <Button
          onClick={() => router.push("/employer/dashboard")}
          className="bg-custom hover:bg-hoverColor transition-colors"
        >
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

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    setApplication((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        status: newStatus,
        statusUpdateDate: new Date().toISOString().split("T")[0],
      }
    })
  }

  const handleSaveNotes = async () => {
    setIsSavingNotes(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save the notes to your database
    setIsSavingNotes(false)
  }

  if (!application) return null

  return (
    <div className="container mx-auto py-8 px-4 mt-14">
      <Button
        variant="ghost"
        className="mb-6 text-custom hover:text-custom bg-custom/10 hover:bg-custom/20"
        onClick={() => router.push(`/employeer/applications/job/${application.jobId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Applications
      </Button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-custom">Application for {application.jobTitle}</h1>
          <p className="text-gray-600">From {application.applicant.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <ApplicationStatusBadge status={application.status} className="text-sm px-3 py-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-custom" />
                Applicant Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="sm:w-1/3 flex flex-col items-center">
                  {application.applicant.profilePicture ? (
                    <img
                      src={application.applicant.profilePicture || "/placeholder.svg"}
                      alt={`${application.applicant.name} profile`}
                      className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}

                  {application.matchScore && (
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-purple-800" />
                      {application.matchScore}% Match
                    </div>
                  )}
                </div>

                <div className="sm:w-2/3 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{application.applicant.name}</h3>
                    <p className="text-gray-600">{application.applicant.currentRole}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a href={`mailto:${application.applicant.email}`} className="text-sm text-custom hover:underline">
                        {application.applicant.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a href={`tel:${application.applicant.phone}`} className="text-sm">
                        {application.applicant.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">{application.applicant.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Applied on {formatDate(application.appliedDate)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Experience</h4>
                  <p className="font-medium">{application.applicant.experience} years</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Expected Salary</h4>
                  <p className="font-medium">{application.applicant.expectedSalary}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Notice Period</h4>
                  <p className="font-medium">{application.applicant.noticePeriod}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
            </TabsList>

            <TabsContent value="resume" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-custom" />
                    Resume
                  </CardTitle>
                  <CardDescription>View and download the applicant's resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-custom mr-3" />
                      <div>
                        <p className="font-medium">Resume.pdf</p>
                        <p className="text-sm text-gray-500">Uploaded on {formatDate(application.appliedDate)}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  <div className="mt-6 border rounded-md h-[400px] flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">Resume preview would appear here</p>
                      <Button variant="outline" className="mt-4">
                        Open Resume
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cover-letter" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-custom" />
                    Cover Letter
                  </CardTitle>
                  <CardDescription>Read the applicant's cover letter</CardDescription>
                </CardHeader>
                <CardContent>
                  {application.applicant.coverLetterUrl ? (
                    <>
                      <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <MessageSquare className="h-8 w-8 text-custom mr-3" />
                          <div>
                            <p className="font-medium">Cover Letter.pdf</p>
                            <p className="text-sm text-gray-500">Uploaded on {formatDate(application.appliedDate)}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>

                      <div className="p-6 border rounded-md bg-white">
                        <p className="text-gray-700">
                          Dear Hiring Manager,
                          <br />
                          <br />I am writing to express my interest in the {application.jobTitle} position at your
                          company. With my experience in frontend development and passion for creating intuitive user
                          interfaces, I believe I would be a great addition to your team.
                          <br />
                          <br />
                          Throughout my career, I have developed a strong skill set in JavaScript, React, and
                          TypeScript, which aligns perfectly with the requirements for this role. I have successfully
                          delivered multiple projects that improved user experience and business metrics.
                          <br />
                          <br />I am particularly drawn to your company because of its innovative approach to technology
                          and commitment to quality. I am excited about the possibility of bringing my skills and
                          enthusiasm to your team.
                          <br />
                          <br />
                          Thank you for considering my application. I look forward to the opportunity to discuss how my
                          background and skills would be a good match for this position.
                          <br />
                          <br />
                          Sincerely,
                          <br />
                          {application.applicant.name}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">No cover letter provided</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <StarHalf className="h-5 w-5 text-custom" />
                    Candidate Evaluation
                  </CardTitle>
                  <CardDescription>Rate and evaluate the candidate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Skills Match</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-custom h-2.5 rounded-full"
                            style={{ width: `${application.matchScore || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{application.matchScore || 0}%</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Quick Evaluation</h4>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2 flex-1">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          Strong Candidate
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2 flex-1">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          Not a Fit
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Notes</h4>
                      <Textarea
                        placeholder="Add your evaluation notes here..."
                        className="min-h-[150px] mb-4"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                      <Button
                        onClick={handleSaveNotes}
                        disabled={isSavingNotes}
                        className="bg-custom hover:bg-hoverColor transition-colors"
                      >
                        {isSavingNotes ? "Saving..." : "Save Notes"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Status</CardTitle>
              <CardDescription>Update the status of this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <StatusChangeDropdown currentStatus={application.status} onStatusChange={handleStatusChange} />

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Status History</h4>
                <div className="space-y-4 mt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                    </div>
                    <div>
                      <span className="text-sm font-medium block">Application Received</span>
                      <span className="text-xs text-gray-500">{formatDate(application.appliedDate)}</span>
                    </div>
                  </div>

                  {application.statusUpdateDate && (
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <span className="text-sm font-medium block">Status Updated: {application.status}</span>
                        <span className="text-xs text-gray-500">{formatDate(application.statusUpdateDate)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="mr-2 h-4 w-4" />
                Email Candidate
              </Button>

           

              <Separator className="my-2" />

              <Button
                variant="outline"
                className="w-full justify-start text-green-600 hover:bg-green-50 hover:text-green-700"
                onClick={() => handleStatusChange("Accepted")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Accept Candidate
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => handleStatusChange("Rejected")}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Candidate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
