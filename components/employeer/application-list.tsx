"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, ChevronRight, Search, SlidersHorizontal, User, Briefcase, MapPin, BarChart3 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ApplicationStatusBadge } from "./application-status-badge"
import { JobApplication } from "@/lib/types"


interface ApplicationListProps {
  applications: JobApplication[]
  jobTitle: string
}

export function ApplicationList({ applications, jobTitle }: ApplicationListProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")

  // Filter applications based on search query and status filter
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicant.currentRole.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort applications based on sort criteria
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    } else if (sortBy === "name") {
      return a.applicant.name.localeCompare(b.applicant.name)
    } else if (sortBy === "match") {
      return (b.matchScore || 0) - (a.matchScore || 0)
    }
    return 0
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search applicants by name, email, or role..."
            className="pl-10 border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] border-gray-300">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Reviewing">Reviewing</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px] border-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date Applied</SelectItem>
              <SelectItem value="name">Applicant Name</SelectItem>
              <SelectItem value="match">Match Score</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-gray-300">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        {filteredApplications.length} {filteredApplications.length === 1 ? "applicant" : "applicants"} for {jobTitle}
      </div>

      <div className="space-y-4">
        {sortedApplications.length > 0 ? (
          sortedApplications.map((application) => (
            <Card key={application.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center p-4 sm:p-6 sm:w-16 sm:h-full bg-gray-50 justify-center">
                    {application.applicant.profilePicture ? (
                      <img
                        src={application.applicant.profilePicture || "/placeholder.svg"}
                        alt={`${application.applicant.name} profile`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{application.applicant.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{application.applicant.currentRole}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>{application.applicant.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span>Applied {formatDate(application.appliedDate)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          <ApplicationStatusBadge status={application.status} />

                          {application.matchScore && (
                            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                              <BarChart3 className="h-3 w-3 mr-1" />
                              <span>{application.matchScore}% Match</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          className="border-custom text-custom hover:bg-custom/10"
                          onClick={() => router.push(`/employer/applications/${application.id}`)}
                        >
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10 text-center">
              <User className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No applicants found</h3>
              <p className="text-gray-500 max-w-md">
                {searchQuery || statusFilter !== "all"
                  ? "No applicants match your current filters. Try adjusting your search criteria."
                  : "There are no applicants for this job posting yet."}
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
