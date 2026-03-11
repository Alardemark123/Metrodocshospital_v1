"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Phone, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-foreground to-foreground/90 p-8 md:p-12 lg:p-16"
        >
          {/* Background Pattern */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/10 blur-2xl" />
          </div>

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            {/* Content */}
            <div>
              <h2 className="mb-4 text-balance text-3xl font-bold text-background md:text-4xl">
                Need Medical Assistance?
              </h2>
              <p className="mb-6 max-w-lg text-pretty text-background/80">
                Our dedicated team is available around the clock to help you with any medical concerns. Schedule an appointment or reach out for emergency services.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" asChild className="gap-2">
                  <Link href="/contact">
                    <Calendar className="h-5 w-5" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2 border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background">
                  <a href="tel:+15551234567">
                    <Phone className="h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl bg-background/10 p-6 backdrop-blur"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-1 font-semibold text-background">Emergency Hotline</h3>
                <p className="mb-2 text-sm text-background/70">Available 24/7</p>
                <a href="tel:+15551234567" className="flex items-center gap-1 text-primary hover:underline">
                  +1 (555) 123-4567
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl bg-background/10 p-6 backdrop-blur"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Calendar className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mb-1 font-semibold text-background">Working Hours</h3>
                <p className="text-sm text-background/70">Mon - Fri: 8AM - 8PM</p>
                <p className="text-sm text-background/70">Sat - Sun: 9AM - 5PM</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
