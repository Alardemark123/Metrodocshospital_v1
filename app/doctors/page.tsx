"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Search, Star, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDoctors, getDoctorDepartmentFilters } from "@/lib/mock-api"
import type { Doctor } from "@/lib/mock-api"

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/doctors/${doctor.id}`} className="group block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg">
          {/* Image Placeholder */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/20 to-accent">
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-card">{doctor.rating}</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="mb-1 text-lg font-semibold text-card-foreground group-hover:text-primary">
              {doctor.name}
            </h3>
            <p className="mb-1 text-sm font-medium text-primary">{doctor.specialty}</p>
            <p className="mb-3 text-xs text-muted-foreground">{doctor.experience} experience</p>
            <p className="flex-1 text-sm text-muted-foreground line-clamp-2">{doctor.bio}</p>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function DoctorsPage() {
  const doctors = getDoctors()
  const departments = getDoctorDepartmentFilters()
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesDepartment = selectedDepartment === "All" || doctor.department === selectedDepartment
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
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
              Our Team
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Meet Our Expert Doctors
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Our team of board-certified physicians brings decades of experience and a commitment to providing the highest quality care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[136px] z-40 border-b border-border bg-background/95 py-4 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Department Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="h-5 w-5 shrink-0 text-muted-foreground" />
              <div className="flex gap-2">
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
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          {filteredDoctors.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
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
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Ready to Book an Appointment?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Schedule a consultation with one of our expert physicians today.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Book Appointment</Link>
          </Button>
        </div>
      </section>
    </>
  )
}
