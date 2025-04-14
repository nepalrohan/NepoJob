import { JobListings } from "@/components/employeer/job-listing";

export default function Home() {
  return (
    <main className="min-h-screen bg-mycolor mt-14">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-custom mb-2">Employer Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your job listings</p>
        <JobListings />
      </div>
    </main>
  )
}
