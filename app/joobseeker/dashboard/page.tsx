"use client"

import { useState } from "react"
import { Briefcase, Clock, FileText, Search, Settings, User, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JobApplication } from "@/lib/types"
import { mockApplications } from "@/lib/data/mock-application"
import { DashboardStats } from "@/components/joobseeker/dashboard-stats"
import { JobApplicationCard } from "@/components/joobseeker/job-applicationcard"


export default function Dashboard() {
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredApplications = applications.filter(
    (app) =>
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingApplications = applications.filter((app) => app.status === "Pending" || app.status === "Reviewing")
  const activeApplications = applications.filter((app) => app.status === "Interview")
  const completedApplications = applications.filter((app) => app.status === "Accepted" || app.status === "Rejected")

  return (
    <main className="container mx-auto py-8 px-4 mt-14">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-custom">Job Seeker Dashboard</h1>
          <p className="text-gray-600">Track and manage your job applications</p>
        </div>
       
      </div>

      <DashboardStats applications={applications} />

   

      <Tabs defaultValue="all" className="w-full mt-4">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <JobApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Briefcase className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No applications found</h3>
                
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingApplications.length > 0 ? (
            pendingApplications.map((application) => (
              <JobApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Clock className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No pending applications</h3>
                <p className="text-gray-500">You don't have any pending job applications at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeApplications.length > 0 ? (
            activeApplications.map((application) => (
              <JobApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Calendar className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No active interviews</h3>
                <p className="text-gray-500">You don't have any scheduled interviews at the moment.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedApplications.length > 0 ? (
            completedApplications.map((application) => (
              <JobApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No completed applications</h3>
                <p className="text-gray-500">You don't have any completed job applications yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
