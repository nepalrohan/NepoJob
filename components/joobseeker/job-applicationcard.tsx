import Link from "next/link"
import { Calendar, ChevronRight, Clock, MapPin, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JobApplication } from "@/lib/types"

interface JobApplicationCardProps {
  application: JobApplication
}

export function JobApplicationCard({ application }: JobApplicationCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow ">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center p-4 md:p-6 md:w-16 md:h-full bg-gray-50 justify-center">
            {application.companyLogo ? (
              <img
                src={application.companyLogo || "/placeholder.svg"}
                alt={`${application.companyName} logo`}
                className="w-12 h-12 object-contain"
              />
            ) : (
              <Building className="w-8 h-8 text-gray-400" />
            )}
          </div>

          <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-custom mb-1">{application.jobTitle}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{application.companyName}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{application.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>Applied {formatDate(application.appliedDate)}</span>
                  </div>
                </div>

              </div>

              <div className="flex justify-end">
                <Link href={`/joobseeker/dashboard/applications/${application.id}`}>
                  <Button variant="outline" className="border-custom text-custom hover:bg-custom/10">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
