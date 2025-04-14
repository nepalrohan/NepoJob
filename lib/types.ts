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
  