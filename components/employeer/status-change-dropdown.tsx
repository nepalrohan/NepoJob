"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ApplicationStatus } from "@/lib/types"

interface StatusChangeDropdownProps {
  currentStatus: ApplicationStatus
  onStatusChange: (status: ApplicationStatus) => void
  disabled?: boolean
}

export function StatusChangeDropdown({ currentStatus, onStatusChange, disabled }: StatusChangeDropdownProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (status === currentStatus) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    onStatusChange(status)
    setIsLoading(false)
  }

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "text-yellow-600"
      case "Reviewing":
        return "text-blue-600"
      case "Accepted":
        return "text-green-600"
      case "Rejected":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between border-gray-300",
            getStatusColor(currentStatus),
            disabled && "opacity-50 cursor-not-allowed",
          )}
          disabled={disabled || isLoading}
        >
          {isLoading ? "Updating..." : currentStatus}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem
          onClick={() => handleStatusChange("Pending")}
          className={cn("flex items-center gap-2 cursor-pointer", currentStatus === "Pending" && "bg-yellow-50")}
        >
          {currentStatus === "Pending" && <Check className="h-4 w-4 text-yellow-600" />}
          <span className={currentStatus === "Pending" ? "text-yellow-600" : ""}>Pending</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusChange("Reviewing")}
          className={cn("flex items-center gap-2 cursor-pointer", currentStatus === "Reviewing" && "bg-blue-50")}
        >
          {currentStatus === "Reviewing" && <Check className="h-4 w-4 text-blue-600" />}
          <span className={currentStatus === "Reviewing" ? "text-blue-600" : ""}>Reviewing</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusChange("Accepted")}
          className={cn("flex items-center gap-2 cursor-pointer", currentStatus === "Accepted" && "bg-green-50")}
        >
          {currentStatus === "Accepted" && <Check className="h-4 w-4 text-green-600" />}
          <span className={currentStatus === "Accepted" ? "text-green-600" : ""}>Accepted</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleStatusChange("Rejected")}
          className={cn("flex items-center gap-2 cursor-pointer", currentStatus === "Rejected" && "bg-red-50")}
        >
          {currentStatus === "Rejected" && <Check className="h-4 w-4 text-red-600" />}
          <span className={currentStatus === "Rejected" ? "text-red-600" : ""}>Rejected</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
