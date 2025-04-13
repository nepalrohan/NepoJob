"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Loader2 } from "lucide-react";
import JobApplicationForm from "@/components/job-application-form";

export default function JobApplicationPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<{
    id: string;
    title: string;
    company: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the job details from an API
    // This is a mock implementation
    const fetchJob = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock job data
        setJob({
          id: jobId,
          title: "Senior Frontend Developer",
          company: "TechCorp Solutions",
        });
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#043866]" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
        <p className="text-gray-600 mt-2">
          The job you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 mt-14">
      <JobApplicationForm
        jobId={job.id}
        jobTitle={job.title}
        companyName={job.company}
      />
    </div>
  );
}
