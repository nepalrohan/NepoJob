"use client"

import { useState, useEffect } from "react"
import JobFilters from "@/components/job-filter"
import JobCard from "@/components/job-card"
import Pagination from "@/components/pagination"
import { Briefcase, Filter, X } from "lucide-react"
import { jobData } from "@/lib/job-data"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export default function AllJobsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile when component mounts and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div className="bg-mycolor min-h-screen mt-14">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-custom" />
            <h1 className="text-2xl md:text-3xl font-bold text-custom">Available Jobs</h1>
          </div>

          {/* Mobile Filter Toggle Button */}
          <Button
            variant="outline"
            className="lg:hidden border-custom text-custom"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? (
              <>
                <X className="h-4 w-4 mr-2" /> Close Filters
              </>
            ) : (
              <>
                <Filter className="h-4 w-4 mr-2" /> Filters
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Mobile Filter Sheet */}
          {isMobile ? (
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen} >
              <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0 bg-mycolor overflow-y-scroll">
                <div className="p-4">
                  <JobFilters isOpen={true} onClose={() => setIsFilterOpen(false)} showCloseButton={false} />

                </div>
              </SheetContent>
            </Sheet>
          ) : (
            /* Desktop Filters Sidebar */
            <div
              className={`w-full lg:w-1/4 transition-all  duration-300 ${isFilterOpen ? "block" : "hidden lg:block"}`}
            >
              <JobFilters isOpen={true} onClose={() => setIsFilterOpen(false)} />
            </div>
          )}

          {/* Job Listings */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">{jobData.length}</span> jobs found
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    className="border border-gray-300 rounded-md text-sm p-1 focus:outline-none focus:ring-1 focus:ring-custom"
                  >
                    <option value="newest">Newest</option>
                    <option value="salary-high">Highest Salary</option>
                    <option value="salary-low">Lowest Salary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {jobData.slice(0, 9).map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            <Pagination totalItems={jobData.length} itemsPerPage={9} currentPage={1} />
          </div>
        </div>
      </div>
    </div>
  )
}
