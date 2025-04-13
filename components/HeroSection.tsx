import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Building, Users, ArrowRight, Star, TrendingUp, CheckCircle2, Zap, Award } from "lucide-react"
import Image from "next/image"

const LandingSection = () => {
  // Sample data for stats
  const stats = [
    { icon: Users, label: "Active Users", value: "100K+", color: "bg-gradient-to-br from-blue-500 to-indigo-600" },
    { icon: Building, label: "Companies", value: "5,000+", color: "bg-gradient-to-br from-hoverColor to-amber-500" },
    {
      icon: Briefcase,
      label: "Available Jobs",
      value: "25K+",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
  ]

  // Sample data for top companies
  const topCompanies = [
    { name: "Google", logo: "/ggl.webp" },
    { name: "Microsoft", logo: "/microsoft.jpg" },
    { name: "Esewa", logo: "/esewa.webp" },
    { name: "NexBil", logo: "/nxt.jpg" },
    { name: "Global Bank", logo: "/GBL.jpg" },

  ]

  // Sample job categories
  const jobCategories = [
    { name: "Remote", icon: Zap },
    { name: "Tech", icon: TrendingUp },
    { name: "Design", icon: Star },
    { name: "Marketing", icon: Award },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-12 sm:py-16 mt-12 bg-mycolor">
   

      <div className="container px-4 mx-auto">
        {/* Main content - Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          {/* Left column - Text content */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:-mt-30">
              
            <div className="relative">

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] text-custom dark:text-white mb-6 animate-fade-in">
                Find Your <span className="text-hoverColor/70">Dream Job</span> or the Perfect{" "}
                <span className="text-hoverColor/70">Candidate</span>
              </h1>

              <p className="text-lg text-custom/80 dark:text-slate-300 mb-8 md:mb-10 animate-fade-in-up [animation-delay:200ms] max-w-xl">
                Connect top talent with leading companies. Our platform streamlines the job search and hiring process,
                making it easier to find the perfect match for your career or team.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:400ms]">
                <Button
                  size="lg"
                  className="bg-custom hover:bg-hoverColor text-lg font-semibold text-white cursor-pointer h-14 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Apply for Jobs
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-hoverColor/80 text-custom hover:bg-custom/10 text-lg font-semibold cursor-pointer h-14 px-8 rounded-xl transition-all duration-300"
                >
                  Post a Job
                </Button>
              </div>

              {/* Key features */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up [animation-delay:600ms]">
                {[
                  "AI-powered job matching",
                  "Verified employers only",
                  "Transparent salary data",
                  "Career growth resources",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center hover:scale-105 transition-all linear duration-300 gap-3 bg-white/50 hover:bg-custom/10 dark:bg-slate-800/50 backdrop-blur-sm p-3 rounded-lg shadow-sm"
                  >
                    <div className="rounded-full bg-custom/10 dark:bg-custom/20 p-1.5">
                      <CheckCircle2 className="h-4 w-4 text-custom dark:text-hoverColor" />
                    </div>
                    <span className="text-custom/90 dark:text-white/90 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end items-center sm:px-8 mt-10 sm:mt-0 sm:p-6">
            <div className="relative w-full max-w-lg">
              {/* Main card */}
              <Card className="overflow-hidden border-none bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-2xl rounded-2xl animate-float">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-custom p-2">
                        <Briefcase className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-custom dark:text-white">Job Explorer</h3>
                        <p className="text-xs text-custom/60 dark:text-white/60">Find your next opportunity</p>
                      </div>
                    </div>
                    <Badge className="bg-hoverColor/20 text-hoverColor hover:bg-hoverColor/30 dark:bg-hoverColor/30">
                      New
                    </Badge>
                  </div>

                  {/* Career Path Visualization - Static Element */}
                  <div className="mb-6 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-semibold text-custom dark:text-white mb-3">Your Career Journey</h4>

                    <div className="relative">
                      {/* Career path steps */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-custom via-hoverColor to-emerald-500"></div>

                      {[
                        { title: "Apply", icon: Briefcase, color: "bg-custom text-white" },
                        { title: "Interview", icon: Users, color: "bg-hoverColor text-white" },
                        { title: "Get Hired", icon: Award, color: "bg-emerald-500 text-white" },
                      ].map((step, index) => (
                        <div key={index} className="flex items-start mb-4 last:mb-0 relative z-10">
                          <div className={`rounded-full ${step.color} p-2 mr-4 shadow-md hover:scale-150 transition-all ease-in-out duration-300`}>
                            <step.icon className="h-4 w-4  " />
                          </div>
                          <div className="pt-1">
                            <h5 className="font-medium text-custom dark:text-white">{step.title}</h5>
                            <p className="text-xs text-custom/60 dark:text-white/60">
                              {index === 0
                                ? "Find and apply to your dream positions"
                                : index === 1
                                  ? "Connect with top employers"
                                  : "Start your new career journey"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-custom/80 dark:text-white/80 mb-3">Popular Categories</h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {jobCategories.map((category, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-hoverColor/50 hover:bg-hoverColor/5 transition-colors duration-300 cursor-pointer group"
                      >
                        <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-1.5 group-hover:bg-hoverColor/20 transition-colors duration-300">
                          <category.icon className="h-4 w-4 text-custom dark:text-white group-hover:text-hoverColor transition-colors duration-300" />
                        </div>
                        <span className="text-sm font-medium text-custom dark:text-white">{category.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-custom to-custom/80 p-4 text-white">
                    <div className="relative z-10">
                      <p className="text-sm font-medium mb-2">Ready to find your dream job?</p>
                      <Button variant="secondary" size="sm" className="cursor-pointer bg-white hover:bg-white/90 text-custom">
                        Get Started
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>

                    {/* Abstract shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-md"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-md"></div>
                  </div>
                </div>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-custom/10 to-amber-300/20 blur-xl " />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-300/20 to-indigo-300/20 blur-xl " />

              {/* Floating elements */}
              <div className="absolute -top-10 -left-2 sm:-left-10 animate-float-slow [animation-delay:1s]">
                <div className="relative w-20 h-20 rounded-2xl bg-white dark:bg-slate-800 shadow-lg p-4 rotate-12">
                  <Users className="h-full w-full text-custom" />
                </div>
              </div>
              <div className="absolute -bottom-5 right-0 animate-float-slow [animation-delay:2s]">
                <div className="relative w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-lg p-3 -rotate-6">
                  <Building className="h-full w-full text-custom" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-fade-in-up [animation-delay:800ms]">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none overflow-hidden shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="h-2" style={{ background: stat.color }}></div>
              <div className="p-6 ">
                <div className="flex items-center gap-4">
                  <div className={`rounded-xl p-4 text-white ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-custom dark:text-white group-hover:scale-105 transition-transform duration-300">
                      {stat.value}
                    </p>
                    <p className="text-sm text-custom/60 dark:text-white/60">{stat.label}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Top companies */}
        <div className="animate-fade-in-up [animation-delay:1000ms]">
          <div className="flex items-center justify-center mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
            <h2 className="mx-6 text-center text-xl font-bold text-custom dark:text-white px-6 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-md shadow-custom/50">
              Trusted by Top Companies
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700"></div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {topCompanies.map((company, index) => (
              <div
                key={index}
                className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={100}
                  height={40}
                  className="h-10 w-auto object-contain opacity-100 hover:opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingSection
