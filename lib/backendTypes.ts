// Type definitions that match the Prisma schema

export type UserRole = "JOBSEEKER" | "EMPLOYER"

export type WorkType = "ONSITE" | "REMOTE" | "HYBRID"

export type JobStatus = "ACTIVE" | "CLOSED" | "DRAFT"

export type ApplicationStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED"

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
  profile?: Profile
}

export interface Profile {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone?: string
  currentRole?: string
  experience?: string
  skills: string[]
  noticePeriod?: string
  expectedSalary?: string
  resumeUrl?: string
  resumeFileName?: string
  coverLetterUrl?: string
  preferredWorkType?: WorkType
  willingToRelocate: boolean
  about?: string
  profilePicture?: string
  location?: string
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  title: string
  company: string
  logo?: string
  location: string
  type: string
  salary: string
  experience: string
  posted: Date
  status: JobStatus
  description: string
  responsibilities: string
  requirements: string
  benefits: string
  companyDescription: string
  employerId: string
  createdAt: Date
  updatedAt: Date
}

export interface JobApplication {
  id: string
  jobId: string
  applicantId: string
  appliedDate: Date
  status: ApplicationStatus
  statusUpdateDate?: Date
  notes?: string
  matchScore?: number
  interviewDate?: string
  createdAt: Date
  updatedAt: Date
  job?: Job
  applicant?: User & { profile?: Profile }
}

export interface Favourite {
  id: string
  userId: string
  jobId: string
  savedAt: Date
}


