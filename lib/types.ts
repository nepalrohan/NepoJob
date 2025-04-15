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
  

  export type ApplicationStatus = "Pending" | "Reviewing" | "Accepted" | "Rejected"

  export interface Applicant {
    id: string
    name: string
    email: string
    phone: string
    location: string
    currentRole: string
    experience: string
    expectedSalary: string
    noticePeriod: string
    resumeUrl: string
    coverLetterUrl?: string
    profilePicture?: string
  }

  export interface JobApplication {
    id: string
    jobId: string
    jobTitle: string
    companyName?: string
    companyLogo?: string
    applicant: Applicant
    appliedDate: string
    location:string
    status: ApplicationStatus
    statusUpdateDate?: string
    notes?: string
    matchScore?: number
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

