"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Cardiologist",
    experience: "15+ years",
    rating: 4.9,
    image: "/doctors/doctor-1.jpg",
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    specialty: "Neurologist",
    experience: "12+ years",
    rating: 4.8,
    image: "/doctors/doctor-2.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Watson",
    specialty: "Pediatrician",
    experience: "10+ years",
    rating: 4.9,
    image: "/doctors/doctor-3.jpg",
  },
  {
    id: 4,
    name: "Dr. James Miller",
    specialty: "Orthopedic Surgeon",
    experience: "18+ years",
    rating: 4.7,
    image: "/doctors/doctor-4.jpg",
  },
]

export function DoctorsHighlight() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-secondary py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Our Team
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Meet Our Expert Doctors
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Our team of board-certified physicians brings decades of combined experience and a passion for patient care.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/doctors/${doctor.id}`} className="group block">
                <div className="overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/20 to-accent">
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-card">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-card">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-primary">{doctor.specialty}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{doctor.experience} experience</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button size="lg" asChild>
            <Link href="/doctors" className="gap-2">
              View All Doctors
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
