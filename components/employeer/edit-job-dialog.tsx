"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Job, JobFormData } from "@/lib/types";

interface EditJobDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: JobFormData) => void
  job: Job | null
}

export function EditJobDialog({ isOpen, onClose, onSubmit, job }: EditJobDialogProps) {
  const [formData, setFormData] = useState<JobFormData>({
    id: "",
    title: "",
    company: "",
    logo: "",
    location: "",
    type: "",
    salary: "",
    experience: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    companyDescription: "",
    posted: "",
    status: "Active",
  })

  useEffect(() => {
    if (job) {
      setFormData({
        id: job.id,
        title: job.title || "",
        company: job.company || "",
        logo: job.logo || "",
        location: job.location || "",
        type: job.type || "",
        salary: job.salary || "",
        experience: job.experience || "",
        description: job.description || "",
        responsibilities: job.responsibilities || "",
        requirements: job.requirements || "",
        benefits: job.benefits || "",
        companyDescription: job.companyDescription || "",
        posted: job.posted || "",
        status: job.status || "Active",
      })
    }
  }, [job])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-custom">Edit Job Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="company">Company Info</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Job Title</Label>
                  <Input id="edit-title" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company Name</Label>
                  <Input id="edit-company" name="company" value={formData.company} onChange={handleChange} required />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-logo">Company Logo URL</Label>
                  <Input id="edit-logo" name="logo" value={formData.logo} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Job Type</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="edit-type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-salary">Salary Range</Label>
                  <Input id="edit-salary" name="salary" value={formData.salary} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-experience">Experience Level</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                  >
                    <SelectTrigger id="edit-experience">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry level">Entry level</SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                      <SelectItem value="7+ years">7+ years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "Active" | "Closed" | "Draft") => handleSelectChange("status", value)}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-description">Job Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-responsibilities">Responsibilities</Label>
                <Textarea
                  id="edit-responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-xs text-gray-500">Enter each responsibility on a new line</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-requirements">Requirements</Label>
                <Textarea
                  id="edit-requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-xs text-gray-500">Enter each requirement on a new line</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-benefits">Benefits</Label>
                <Textarea
                  id="edit-benefits"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-xs text-gray-500">Enter each benefit on a new line</p>
              </div>
            </TabsContent>

            <TabsContent value="company" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="edit-companyDescription">Company Description</Label>
                <Textarea
                  id="edit-companyDescription"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  className="min-h-[200px]"
                  required
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-custom text-custom hover:bg-custom/10"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-custom hover:bg-hoverColor transition-colors">
              Update Job Listing
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
