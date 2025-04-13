"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  FileText,
  Loader2,
  Mail,
  Phone,
  Upload,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Define the form schema with Zod
const formSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),

  // Professional Information
  currentRole: z.string().min(2, { message: "Current role is required" }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  skills: z.string().min(3, { message: "Please list at least one skill" }),

  // Job Specific
  noticePeriod: z.string().min(1, { message: "Please select your notice period" }),
  expectedSalary: z.string().min(1, { message: "Expected salary is required" }),

  // Resume and Cover Letter
  resumeFile: z
    .instanceof(File, { message: "Resume is required" })
    .refine((file) => file.size < 5000000, "File size must be less than 5MB")
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only PDF, DOC, and DOCX files are accepted",
    ),
  coverLetter: z.string().optional(),

  // Additional Information
  relocate: z.boolean().default(false).optional(),
  workType: z.enum(["onsite", "remote", "hybrid"], {
    required_error: "Please select your preferred work type",
  }),

  // Terms
  termsAccepted: z.boolean( {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
})

type FormValues = z.infer<typeof formSchema>

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
  companyName: string
}

export default function JobApplicationForm({ jobId, jobTitle, companyName }: JobApplicationFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [resumeFileName, setResumeFileName] = useState<string | null>(null)
  const [formStep, setFormStep] = useState(0)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      currentRole: "",
      experience: "",
      skills: "",
      noticePeriod: "",
      expectedSalary: "",
      coverLetter: "",
      relocate: false,
      workType: "onsite",
      termsAccepted: false,
    },
    mode: "onChange",
  })

  const { watch, trigger } = form

  // Watch form values to enable/disable next button
  const currentValues = watch()

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFileName(file.name)
      form.setValue("resumeFile", file)
    }
  }

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form submitted:", data)

      // Show success state
      setIsSuccess(true)

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push(`/job/${jobId}/application-success`)
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle next step
  const handleNext = async () => {
    const fieldsToValidate =
      formStep === 0
        ? ["firstName", "lastName", "email", "phone"]
        : formStep === 1
          ? ["currentRole", "experience", "skills"]
          : ["noticePeriod", "expectedSalary", "resumeFile", "workType", "termsAccepted"]

    const isStepValid = await trigger(fieldsToValidate as any)

    if (isStepValid) {
      setFormStep((step) => step + 1)
    }
  }

  // Handle previous step
  const handlePrevious = () => {
    setFormStep((step) => step - 1)
  }

  // If form is successfully submitted
  if (isSuccess) {
    return (
      <Card className="w-full max-w-3xl mx-auto border-0 shadow-lg">
        <CardContent className="pt-10 pb-10 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Your application for <span className="font-semibold">{jobTitle}</span> at {companyName} has been
            successfully submitted.
          </p>
          <p className="text-sm text-gray-500 mb-8">You will receive a confirmation email shortly.</p>
          <Button onClick={() => router.push("/jobs")} className="bg-[#043866] hover:bg-[#F77300] transition-colors">
            Browse More Jobs
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto border-0 shadow-lg bg-white">
      <CardHeader className="bg-[#043866] text-white rounded-t-lg pb-6 pt-2">
        <CardTitle className="text-xl md:text-2xl font-bold">Apply for {jobTitle}</CardTitle>
        <CardDescription className="text-gray-200">{companyName} • Application Form</CardDescription>
      </CardHeader>

      {/* Progress indicator */}
      <div className="px-6 pt-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[#043866] font-medium">
            Step {formStep + 1} of 3:{" "}
            {formStep === 0 ? "Personal Details" : formStep === 1 ? "Professional Information" : "Final Details"}
          </span>
          <span className="text-gray-500">{Math.round(((formStep + 1) / 3) * 100)}% Complete</span>
        </div>
        <Progress value={((formStep + 1) / 3) * 100} className="h-2 bg-gray-100 "  />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="p-6">
            {formStep === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#043866] font-semibold mb-2">
                  <User className="h-5 w-5" />
                  <h3 className="text-lg">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="border-gray-300 focus-visible:ring-[#043866]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="border-gray-300 focus-visible:ring-[#043866]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="you@example.com"
                              {...field}
                              className="pl-10 border-gray-300 focus-visible:ring-[#043866]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="+1 (555) 000-0000"
                              {...field}
                              className="pl-10 border-gray-300 focus-visible:ring-[#043866]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {formStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#043866] font-semibold mb-2">
                  <Briefcase className="h-5 w-5" />
                  <h3 className="text-lg">Professional Information</h3>
                </div>

                <FormField
                  control={form.control}
                  name="currentRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Role</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Software Engineer"
                          {...field}
                          className="border-gray-300 focus-visible:ring-[#043866]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-gray-300 focus:ring-[#043866]">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Skills</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="React, Node.js, TypeScript, etc."
                          {...field}
                          className="min-h-[100px] border-gray-300 focus-visible:ring-[#043866]"
                        />
                      </FormControl>
                      <FormDescription>List your key skills separated by commas</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[#043866] font-semibold mb-2">
                  <FileText className="h-5 w-5" />
                  <h3 className="text-lg">Final Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="noticePeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notice Period</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:ring-[#043866]">
                              <SelectValue placeholder="Select notice period" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="1-week">1 Week</SelectItem>
                            <SelectItem value="2-weeks">2 Weeks</SelectItem>
                            <SelectItem value="1-month">1 Month</SelectItem>
                            <SelectItem value="2-months">2 Months</SelectItem>
                            <SelectItem value="3-months">3 Months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expectedSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Salary</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                              placeholder="60,000"
                              {...field}
                              className="pl-10 border-gray-300 focus-visible:ring-[#043866]"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="resumeFile"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Resume/CV</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                          <input
                            type="file"
                            id="resumeFile"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            {...fieldProps}
                          />
                          <label htmlFor="resumeFile" className="cursor-pointer">
                            {resumeFileName ? (
                              <div className="flex items-center justify-center gap-2 text-[#043866]">
                                <FileText className="h-5 w-5" />
                                <span className="font-medium">{resumeFileName}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                <span className="text-sm font-medium text-gray-700">
                                  Drag and drop your resume or <span className="text-[#F77300]">browse</span>
                                </span>
                                <span className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (Max 5MB)</span>
                              </div>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coverLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you're a good fit for this position..."
                          {...field}
                          className="min-h-[120px] border-gray-300 focus-visible:ring-[#043866]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="workType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Preferred Work Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="onsite" className="text-[#043866]" />
                              </FormControl>
                              <FormLabel className="font-normal">On-site</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="remote" className="text-[#043866]" />
                              </FormControl>
                              <FormLabel className="font-normal">Remote</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="hybrid" className="text-[#043866]" />
                              </FormControl>
                              <FormLabel className="font-normal">Hybrid</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relocate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#043866] data-[state=checked]:border-[#043866]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I am willing to relocate for this position</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#043866] data-[state=checked]:border-[#043866]"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{" "}
                            <a href="#" className="text-[#F77300] hover:underline">
                              terms and conditions
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-[#F77300] hover:underline">
                              privacy policy
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t p-6 bg-[#F8FAFC]">
            {formStep > 0 ? (
              <Button
                type="button"
                onClick={handlePrevious}
                variant="outline"
                className="border-[#043866] text-[#043866]"
              >
                Previous
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => router.push(`/job/${jobId}`)}
                variant="outline"
                className="border-[#043866] text-[#043866]"
              >
                Cancel
              </Button>
            )}

            {formStep < 2 ? (
              <Button type="button" onClick={handleNext} className="bg-[#043866] hover:bg-[#F77300] transition-colors">
                Next Step
                <ChevronDown className="h-4 w-4 ml-1 rotate-270" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#043866] hover:bg-[#F77300] transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
