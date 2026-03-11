"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Baby, 
  Bone, 
  Eye,
  ArrowRight
} from "lucide-react"

const services = [
  {
    icon: Stethoscope,
    title: "General Medicine",
    description: "Comprehensive primary care and preventive health services for all ages.",
    href: "/departments#general-medicine",
  },
  {
    icon: Heart,
    title: "Cardiology",
    description: "Expert heart care with advanced diagnostic and treatment options.",
    href: "/departments#cardiology",
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Specialized care for brain, spine, and nervous system conditions.",
    href: "/departments#neurology",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Gentle, expert care for infants, children, and adolescents.",
    href: "/departments#pediatrics",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Treatment for bones, joints, muscles, and sports injuries.",
    href: "/departments#orthopedics",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Complete eye care from routine exams to advanced surgery.",
    href: "/departments#ophthalmology",
  },
]

export function ServicesHighlights() {
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
            Our Services
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Comprehensive Healthcare Services
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            From routine check-ups to specialized treatments, we offer a wide range of medical services to meet all your healthcare needs under one roof.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href} className="group block h-full">
                <div className="flex h-full flex-col rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <service.icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">{service.title}</h3>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View All Departments
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
