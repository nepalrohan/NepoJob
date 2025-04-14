export interface Job {
    id: string
    title: string
    company: string
    logo?: string
    location: string
    type: string
    salary: string
    experience: string
    posted: string
    postedAt: string
    status: "Active" | "Closed" | "Draft"
    description: string
    responsibilities: string
    requirements: string
    benefits: string
    companyDescription: string
  }
  
  export interface JobFormData {
    id?: string
    title: string
    company: string
    logo: string
    location: string
    type: string
    salary: string
    experience: string
    description: string
    responsibilities: string
    requirements: string
    benefits: string
    companyDescription: string
    posted?: string
    postedAt?: string
    status?: "Active" | "Closed" | "Draft"
  }
  


  export type ApplicationStatus = "Pending" | "Reviewing" | "Accepted" | "Rejected" | "Interview"

export interface JobApplication {
  id: string
  jobId: string
  jobTitle: string
  companyName: string
  companyLogo?: string
  location: string
  appliedDate: string
  status: ApplicationStatus
  statusUpdateDate?: string
  notes?: string
  interviewDate?: string
}

export interface ProfileData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  currentRole: string
  experience: string
  skills: string[]
  noticePeriod: string
  expectedSalary: string
  resumeUrl?: string
  resumeFileName?: string
  preferredWorkType: "onsite" | "remote" | "hybrid"
  willingToRelocate: boolean
  about?: string
  profilePicture?: string
}
