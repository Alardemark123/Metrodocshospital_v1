"use client"

import { motion } from "framer-motion"
import { use } from "react"
import Link from "next/link"
import { ArrowLeft, Star, GraduationCap, Clock, Award, Calendar, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDoctorById } from "@/lib/mock-api"

export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const doctor = getDoctorById(id)

  if (!doctor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">Doctor Not Found</h1>
          <Button asChild>
            <Link href="/doctors">Back to Doctors</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/doctors"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Link>

          <div className="grid items-start gap-12 lg:grid-cols-3">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {doctor.department}
              </span>
              <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">{doctor.name}</h1>
              <p className="mb-6 text-xl text-primary">{doctor.specialty}</p>

              <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">{doctor.fullBio ?? doctor.bio}</p>

              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl bg-card p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium text-card-foreground">{doctor.education}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-card p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium text-card-foreground">{doctor.experience}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild className="gap-2">
                  <Link href="/contact">
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href="tel:+15551234567">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Awards & Recognition</h3>
              </div>
              <ul className="space-y-2">
                {(doctor.awards ?? []).map((award) => (
                  <li key={award} className="text-sm text-muted-foreground">
                    {award}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-card-foreground">Languages Spoken</h3>
              <div className="flex flex-wrap gap-2">
                {(doctor.languages ?? []).map((lang) => (
                  <span
                    key={lang}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">Availability</h3>
              </div>
              <p className="text-sm text-muted-foreground">{doctor.availability ?? "Contact for availability"}</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
