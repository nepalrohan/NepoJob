"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, DollarSign, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    salary: string
    type: string
    experience: string
    logo: string
    postedAt: string
  }
}

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    router.push(`/job/${job.id}`)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-custom border-r-4  border-r-custom h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex flex-col gap-3 p-2 flex-grow">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="font-semibold text-base text-custom line-clamp-2">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.company}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-1 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-gray-500" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-gray-500" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-gray-500" />
              <span>{job.type}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 mt-auto">
          <Button
            onClick={handleViewDetails}
            className="w-full bg-custom hover:bg-hoverColor text-white transition-colors cursor-pointer text-sm"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
