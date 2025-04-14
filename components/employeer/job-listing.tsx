"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Pencil, Trash2, Building2, MapPin, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddJobDialog } from "./add-job-dialog"
import { EditJobDialog } from "./edit-job-dialog"
import { DeleteJobDialog } from "./delete-job-dialog"
import type { Job, JobFormData } from "@/lib/types";



// Sample job data - in a real app this would come from an API
const initialJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Acme Inc.",
    logo: "/placeholder.svg?height=64&width=64",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    experience: "3-5 years",
    posted: "2023-10-15",
    postedAt: "2 days ago",
    status: "Active",
    description:
      "We are looking for a talented Frontend Developer to join our team at Acme Inc. This is an exciting opportunity to work on cutting-edge projects in a collaborative environment.",
    responsibilities:
      "Design, develop, and maintain high-quality software solutions\nCollaborate with cross-functional teams\nWrite clean, efficient, and well-documented code\nParticipate in code reviews\nTroubleshoot and resolve complex technical issues",
    requirements:
      "3-5 years of relevant experience\nStrong problem-solving skills\nExcellent communication and teamwork abilities\nBachelor's degree in Computer Science or related field\nFamiliarity with agile development methodologies",
    benefits:
      "Competitive salary\nFlexible work arrangements\nComprehensive health insurance\n401(k) matching\nProfessional development opportunities\nPaid time off and holidays",
    companyDescription:
      "Acme Inc. is a leading company in the industry, dedicated to innovation and excellence. We believe in creating a positive work environment where employees can thrive and grow professionally.",
  },
  {
    id: "2",
    title: "UX Designer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=64&width=64",
    location: "Remote",
    type: "Contract",
    salary: "$70 - $90 per hour",
    experience: "5+ years",
    posted: "2023-10-10",
    postedAt: "1 week ago",
    status: "Active",
    description: "We are seeking a skilled UX Designer to create amazing user experiences.",
    responsibilities:
      "Create user flows and wireframes\nConduct user research\nCollaborate with developers\nDesign intuitive interfaces\nTest and iterate designs",
    requirements:
      "5+ years of UX design experience\nProficiency in design tools\nPortfolio of previous work\nStrong communication skills\nUser research experience",
    benefits:
      "Competitive hourly rate\nFlexible schedule\nRemote work\nOpportunity for long-term collaboration\nAccess to design tools and resources",
    companyDescription:
      "TechCorp is an innovative technology company focused on creating user-friendly digital products that solve real-world problems.",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudSystems",
    logo: "/placeholder.svg?height=64&width=64",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    experience: "7+ years",
    posted: "2023-10-05",
    postedAt: "2 weeks ago",
    status: "Closed",
    description: "Join our team as a DevOps Engineer to build and maintain our cloud infrastructure.",
    responsibilities:
      "Implement CI/CD pipelines\nManage cloud infrastructure\nOptimize system performance\nEnsure security compliance\nTroubleshoot system issues",
    requirements:
      "7+ years of DevOps experience\nExperience with AWS or Azure\nKnowledge of containerization\nScripting and automation skills\nSecurity best practices",
    benefits:
      "Competitive salary\nStock options\nHealth and dental insurance\nFlexible work arrangements\nProfessional development budget\nModern office space",
    companyDescription:
      "CloudSystems specializes in cloud infrastructure solutions that help businesses scale efficiently and securely in the digital landscape.",
  },
]

export function JobListings() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleAddJob = (newJob: JobFormData) => {
    const id = (jobs.length + 1).toString()
    const today = new Date().toISOString().split("T")[0]
    setJobs([
      ...jobs,
      {
        ...newJob,
        id,
        posted: today,
        postedAt: "Today",
        status: "Active",
      } as Job,
    ])
    setIsAddDialogOpen(false)
  }

  const handleEditJob = (updatedJob: JobFormData) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? ({ ...job, ...updatedJob } as Job) : job)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteJob = () => {
    if (selectedJob) {
      setJobs(jobs.filter((job) => job.id !== selectedJob.id))
      setIsDeleteDialogOpen(false)
    }
  }

  const openEditDialog = (job: Job) => {
    setSelectedJob(job)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (job: Job) => {
    setSelectedJob(job)
    setIsDeleteDialogOpen(true)
  }

  const updateJobStatus = (jobId: string, newStatus: "Active" | "Closed" | "Draft") => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job)))
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold text-custom">Job Listings</h2>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-custom hover:bg-hoverColor transition-colors">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Details</TableHead>
              <TableHead className="hidden md:table-cell">Company</TableHead>
              <TableHead className="hidden lg:table-cell">Location</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden xl:table-cell">Experience</TableHead>
              <TableHead className="hidden md:table-cell">Posted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm text-gray-500 md:hidden flex items-center gap-1 mt-1">
                    <Building2 className="h-3 w-3" />
                    {job.company}
                  </div>
                  <div className="text-sm text-gray-500 lg:hidden flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{job.company}</TableCell>
                <TableCell className="hidden lg:table-cell">{job.location}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{job.type}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-cell">{job.experience}</TableCell>
                <TableCell className="hidden md:table-cell">{job.posted}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 p-0">
                        <Badge
                          variant={job.status === "Active" ? "default" : "secondary"}
                          className={`cursor-pointer ${job.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 hover:bg-gray-600"}`}
                        >
                          {job.status}
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        onClick={() => updateJobStatus(job.id, "Active")}
                        className={job.status === "Active" ? "bg-green-50 text-green-700" : ""}
                      >
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        Active
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => updateJobStatus(job.id, "Closed")}
                        className={job.status === "Closed" ? "bg-gray-50 text-gray-700" : ""}
                      >
                        <div className="h-2 w-2 rounded-full bg-gray-500 mr-2" />
                        Closed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(job)}
                      className="h-8 w-8 text-custom hover:text-hoverColor hover:border-hoverColor"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(job)}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:border-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {jobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No job listings found. Add your first job listing!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AddJobDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} onSubmit={handleAddJob} />

      {selectedJob && (
        <>
          <EditJobDialog
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onSubmit={handleEditJob}
            job={selectedJob}
          />
          <DeleteJobDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDeleteJob}
            jobTitle={selectedJob.title}
          />
        </>
      )}
    </div>
  )
}
