import { Badge } from "@/components/ui/badge"
import { ApplicationStatus } from "@/lib/types"

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
  className?: string
}

export function ApplicationStatusBadge({ status, className }: ApplicationStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Reviewing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Interview":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "Accepted":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Badge variant="outline" className={`${getStatusStyles()} ${className}`}>
      {status}
    </Badge>
  )
}
