"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Target, Eye, Building2, ArrowRight } from "lucide-react"
import { getValues, getFacilities, ICON_MAP } from "@/lib/mock-api"

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              About metrodocshospital
            </span>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
              A Legacy of Healing, A Future of Hope
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              For over 25 years, metrodocshospital has been dedicated to providing exceptional healthcare services to our community, combining cutting-edge medical technology with compassionate care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-12">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20">
                  <Target className="h-8 w-8" />
                </div>
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">Our Mission</h2>
                <p className="leading-relaxed text-primary-foreground/90">
                  To deliver compassionate, patient-centered healthcare that improves the quality of life for individuals and communities. We are committed to excellence in clinical care, education, research, and community service.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-card-foreground md:text-3xl">Our Vision</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To be the leading healthcare provider in the region, recognized for our unwavering commitment to medical excellence, innovation, and the well-being of every patient we serve. We envision a healthier tomorrow for all.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-secondary py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Values
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              The Principles That Guide Us
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              These core values shape every aspect of our care and define who we are as a healthcare organization.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {getValues().map((value, index) => {
              const ValueIcon = ICON_MAP[value.icon]
              return (
              <AnimatedSection key={value.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    {ValueIcon && <ValueIcon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            )})}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="bg-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <AnimatedSection className="mb-16 text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Our Facilities
            </span>
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Explore Our Hospital
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Take a virtual tour of our state-of-the-art facilities designed to provide the best possible care experience.
            </p>
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getFacilities().map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={facility.href} className="group block">
                  <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary">{facility.name}</h3>
                        <p className="text-sm text-muted-foreground">{facility.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "25+", label: "Years of Excellence" },
              { number: "50+", label: "Expert Doctors" },
              { number: "10K+", label: "Patients Treated" },
              { number: "7", label: "Departments" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-bold text-primary-foreground md:text-5xl">{stat.number}</p>
                <p className="mt-2 text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
