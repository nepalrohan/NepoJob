"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

export default function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const [page, setPage] = useState(currentPage)

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className="flex items-center justify-between mt-6">
      <Button
        variant="outline"
        className="border-custom text-custom hover:bg-mycolor"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        className="border-custom text-custom hover:bg-mycolor"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  )
}
