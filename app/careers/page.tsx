"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Clock, 
  Heart, 
  Users, 
  GraduationCap,
  Shield,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"

const jobs = [
  {
    id: 1,
    position: "Registered Nurse - ICU",
    department: "Intensive Care",
    type: "Full-time",
    location: "Main Campus",
    description: "Join our critical care team as an ICU Registered Nurse. You'll provide direct patient care to critically ill patients, working collaboratively with physicians and other healthcare professionals.",
    requirements: [
      "Valid RN license",
      "BSN preferred",
      "2+ years ICU experience",
      "BLS and ACLS certification",
      "Strong critical thinking skills",
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) with employer match",
      "Tuition reimbursement",
      "Flexible scheduling",
    ],
  },
  {
    id: 2,
    position: "Radiologic Technologist",
    department: "Radiology",
    type: "Full-time",
    location: "Main Campus",
    description: "Perform diagnostic imaging examinations including X-rays, CT scans, and fluoroscopy procedures. Work with state-of-the-art imaging equipment in a supportive team environment.",
    requirements: [
      "ARRT certification",
      "State licensure",
      "1+ years experience preferred",
      "Knowledge of radiation safety",
      "Excellent patient care skills",
    ],
    benefits: [
      "Competitive salary",
      "Comprehensive benefits package",
      "Continuing education support",
      "Career advancement opportunities",
      "Modern equipment training",
    ],
  },
  {
    id: 3,
    position: "Medical Technologist",
    department: "Laboratory",
    type: "Full-time",
    location: "Main Campus",
    description: "Perform clinical laboratory testing in areas including chemistry, hematology, microbiology, and blood bank. Ensure accuracy and quality of all test results.",
    requirements: [
      "ASCP certification",
      "Bachelor's degree in Medical Technology",
      "Strong attention to detail",
      "Quality assurance experience",
      "Ability to work independently",
    ],
    benefits: [
      "Competitive compensation",
      "Full benefits package",
      "Professional development",
      "Day and evening shifts available",
      "Collaborative work environment",
    ],
  },
  {
    id: 4,
    position: "Administrative Staff - Patient Services",
    department: "Administration",
    type: "Full-time",
    location: "Main Campus",
    description: "Provide exceptional customer service to patients and visitors. Handle patient registration, scheduling, and general administrative duties in a fast-paced healthcare environment.",
    requirements: [
      "High school diploma required",
      "Associate's degree preferred",
      "Healthcare experience a plus",
      "Strong communication skills",
      "Proficiency in Microsoft Office",
    ],
    benefits: [
      "Competitive hourly rate",
      "Health benefits",
      "Paid time off",
      "Growth opportunities",
      "Monday-Friday schedule",
    ],
  },
  {
    id: 5,
    position: "Physical Therapist",
    department: "Rehabilitation",
    type: "Full-time",
    location: "Main Campus",
    description: "Evaluate and treat patients with injuries, illnesses, or disabilities to improve movement and manage pain. Develop personalized treatment plans and work with a multidisciplinary team.",
    requirements: [
      "Doctor of Physical Therapy (DPT)",
      "State licensure",
      "Strong manual therapy skills",
      "Experience with various patient populations",
      "Excellent interpersonal skills",
    ],
    benefits: [
      "Competitive salary",
      "Full benefits package",
      "CEU allowance",
      "Mentorship program",
      "Work-life balance",
    ],
  },
  {
    id: 6,
    position: "Emergency Room Nurse",
    department: "Emergency",
    type: "Full-time",
    location: "Main Campus",
    description: "Provide nursing care in our busy emergency department. Triage patients, administer treatments, and collaborate with emergency physicians to deliver quality care.",
    requirements: [
      "Valid RN license",
      "BLS, ACLS, PALS certifications",
      "1+ years ER experience preferred",
      "Ability to work under pressure",
      "Flexible availability including nights/weekends",
    ],
    benefits: [
      "Premium shift differentials",
      "Comprehensive benefits",
      "Sign-on bonus available",
      "Continuing education",
      "Career ladder program",
    ],
  },
]

const departments = ["All", "Intensive Care", "Radiology", "Laboratory", "Administration", "Rehabilitation", "Emergency"]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    icon: GraduationCap,
    title: "Education Support",
    description: "Tuition reimbursement and continuing education opportunities.",
  },
  {
    icon: Users,
    title: "Work-Life Balance",
    description: "Flexible scheduling, generous PTO, and parental leave programs.",
  },
  {
    icon: Shield,
    title: "Retirement Benefits",
    description: "401(k) plan with employer matching to secure your future.",
  },
]

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary"
    >
      <div
        className="cursor-pointer p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{job.position}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Apply Now
            </Button>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border bg-secondary/30 p-6"
        >
          <p className="mb-6 text-muted-foreground">{job.description}</p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold text-card-foreground">Requirements</h4>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold text-card-foreground">Benefits</h4>
              <ul className="space-y-2">
                {job.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Button>Apply for This Position</Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = jobs.filter((job) => {
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment
    const matchesSearch = job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDepartment && matchesSearch
  })

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Join Our Team
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Build Your Career at ModernCare
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              Join a team of dedicated healthcare professionals committed to making a difference in our community. We offer competitive benefits, growth opportunities, and a supportive work environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Why Work With Us</h2>
            <p className="text-muted-foreground">We invest in our employees because they are our greatest asset.</p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-card-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Filters */}
      <section className="sticky top-[136px] z-40 border-y border-border bg-background/95 py-4 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Department Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    selectedDepartment === dept
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-accent"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Open Positions ({filteredJobs.length})
            </h2>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-card p-12 text-center">
              <p className="text-lg text-muted-foreground">No positions found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedDepartment("All")
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
            {"Don't See the Right Position?"}
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Submit your resume and we will contact you when a matching opportunity becomes available.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Submit Your Resume</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
