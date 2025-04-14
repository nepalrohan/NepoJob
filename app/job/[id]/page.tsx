import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { jobData } from "@/lib/job-data"
import { ArrowLeft, Bookmark, Building2, Calendar, Clock, DollarSign, MapPin, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface JobDetailPageProps {
  params: {
    id: string
  }
}




export default  function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvePArams =  params;
  const jobId = Number.parseInt(resolvePArams.id)
  const job = jobData.find((job) => job.id === jobId) || jobData[0]

  return (
    <div className="bg-mycolor min-h-screen mt-12">
      <div className="container mx-auto px-4 py-8">
        <Link href="/jobs" className="inline-flex items-center gap-1 text-custom hover:text-hoverColor mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to jobs</span>
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={job.logo || "/placeholder.svg?height=64&width=64"}
                      alt={`${job.company} logo`}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold text-custom">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Posted {job.postedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <Button className="bg-custom hover:bg-hoverColor cursor-pointer" >
                  <Link href={`/job/${jobId}/apply`}>Apply Now</Link>
                  </Button>
                  <Button variant="outline" className="border-custom text-custom hover:bg-mycolor cursor-pointer">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Job
                  </Button>
                  <Button variant="outline" className="border-custom text-custom hover:bg-mycolor cursor-pointer">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-custom">Job Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We are looking for a talented {job.title} to join our team at {job.company}. This is an exciting
                  opportunity to work on cutting-edge projects in a collaborative environment.
                </p>

                <h3 className="font-semibold text-lg text-custom">Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Design, develop, and maintain high-quality software solutions</li>
                  <li>Collaborate with cross-functional teams to define and implement new features</li>
                  <li>Write clean, efficient, and well-documented code</li>
                  <li>Participate in code reviews and contribute to technical discussions</li>
                  <li>Troubleshoot and resolve complex technical issues</li>
                </ul>

                <h3 className="font-semibold text-lg text-custom">Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{job.experience} of relevant experience</li>
                  <li>Strong problem-solving skills and attention to detail</li>
                  <li>Excellent communication and teamwork abilities</li>
                  <li>Bachelor's degree in Computer Science or related field (or equivalent experience)</li>
                  <li>Familiarity with agile development methodologies</li>
                </ul>

                <h3 className="font-semibold text-lg text-custom">Benefits:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Competitive salary: {job.salary}</li>
                  <li>Flexible {job.type} work arrangements</li>
                  <li>Comprehensive health insurance</li>
                  <li>401(k) matching</li>
                  <li>Professional development opportunities</li>
                  <li>Paid time off and holidays</li>
                </ul>
              </CardContent>
            </Card>

            {/* Company Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-custom">About {job.company}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {job.company} is a leading company in the industry, dedicated to innovation and excellence. We believe
                  in creating a positive work environment where employees can thrive and grow professionally.
                </p>
                <p>
                  Our mission is to deliver exceptional products and services that make a difference in people's lives.
                  We value creativity, integrity, and collaboration in everything we do.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-custom">Job Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Salary</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Job Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-medium">{job.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                </div>



                <Separator />

                <Button className="w-full bg-custom hover:bg-hoverColor cursor-pointer">

                  <Link href={`/job/${jobId}/apply`}>Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-custom">Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobData.slice(0, 3).map((similarJob) => (
                  <div key={similarJob.id} className="group">
                    <Link href={`/job/${similarJob.id}`} className="block group-hover:text-hoverColor">
                      <h3 className="font-medium">{similarJob.title}</h3>
                      <div className="text-sm text-gray-500">{similarJob.company}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {similarJob.location}
                        <DollarSign className="h-3 w-3 ml-2" />
                        {similarJob.salary}
                      </div>
                    </Link>
                    <Separator className="mt-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
