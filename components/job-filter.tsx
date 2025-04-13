"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface JobFiltersProps {
  isOpen: boolean
  onClose: () => void
  showCloseButton?: boolean
}

export default function JobFilters({ isOpen, onClose, showCloseButton = true }: JobFiltersProps) {
  const [salaryRange, setSalaryRange] = useState([30, 150])

  return (
    <Card
      className={`sticky top-4 transition-all  duration-300  ${isOpen ? "opacity-100 translate-y-0" : "lg:opacity-100 lg:translate-y-0 opacity-0 -translate-y-4 pointer-events-none lg:pointer-events-auto"}`}
    >
      <CardHeader className="pb-1">
        <CardTitle className="text-custom text-xl flex justify-between items-center">
          <span className="text-xl font-semibold">Filters</span>
          {showCloseButton && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 lg:hidden" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Experience */}
        <Accordion type="single" collapsible >
          <AccordionItem value="experience" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">Experience Level</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Entry Level", "Mid Level", "Senior Level", "Manager", "Director"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox id={`exp-${level.toLowerCase().replace(" ", "-")}`} />
                    <Label
                      htmlFor={`exp-${level.toLowerCase().replace(" ", "-")}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {level}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Salary Range */}
        <Accordion type="single" collapsible >
          <AccordionItem value="salary" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">Salary Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="pt-2">
                  <Slider
                    defaultValue={[30, 150]}
                    max={200}
                    min={0}
                    step={5}
                    value={salaryRange}
                    onValueChange={setSalaryRange}
                    className="my-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">${salaryRange[0]}k</div>
                  <div className="text-sm font-medium">${salaryRange[1]}k</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Job Type */}
        <Accordion type="single" collapsible>
          <AccordionItem value="type" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">Job Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Full-time", "Part-time", "Contract", "Remote", "Hybrid", "On-site"].map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox id={`type-${type.toLowerCase().replace(" ", "-")}`} />
                    <Label
                      htmlFor={`type-${type.toLowerCase().replace(" ", "-")}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Location */}
        <Accordion type="single" collapsible>
          <AccordionItem value="location" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">Location</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <Input placeholder="City, state, or zip" />
                <div className="pt-2">
                  {["New York", "San Francisco", "London", "Remote"].map((location) => (
                    <div key={location} className="flex items-center space-x-2 mt-2">
                      <Checkbox id={`loc-${location.toLowerCase().replace(" ", "-")}`} />
                      <Label
                        htmlFor={`loc-${location.toLowerCase().replace(" ", "-")}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Industry */}
        <Accordion type="single" collapsible>
          <AccordionItem value="industry" className="border-none">
            <AccordionTrigger className="py-2 text-sm font-medium">Industry</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {["Technology", "Healthcare", "Finance", "Education", "Marketing"].map((industry) => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox id={`ind-${industry.toLowerCase()}`} />
                    <Label htmlFor={`ind-${industry.toLowerCase()}`} className="text-sm font-normal cursor-pointer">
                      {industry}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2 flex flex-col gap-2">
          <Button className="w-full bg-custom hover:bg-hoverColor cursor-pointer">Apply Filters</Button>
          <Button variant="outline" className="border-custom cursor-pointer text-custom hover:bg-mycolor">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
