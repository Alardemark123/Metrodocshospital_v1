"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Calendar, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-secondary via-background to-accent">
      {/* Floating Abstract Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-accent/30 blur-2xl"
        />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-20 lg:flex-row lg:py-32">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            Welcome to ModernCare Hospital
          </motion.span>

          <h1 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Compassionate Care for{" "}
            <span className="text-primary">Every Life.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0">
            Delivering modern healthcare with trusted medical professionals. Experience world-class treatment with personalized care tailored to your needs.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Button size="lg" asChild className="gap-2">
              <Link href="/doctors">
                <Search className="h-5 w-5" />
                Find a Doctor
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="/contact">
                <Calendar className="h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8"
          >
            {[
              { number: "50+", label: "Expert Doctors" },
              { number: "10K+", label: "Happy Patients" },
              { number: "24/7", label: "Emergency Care" },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <p className="text-2xl font-bold text-primary md:text-3xl">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image/Visual Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex-1 lg:mt-0 lg:pl-12"
        >
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative aspect-square max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent shadow-2xl lg:aspect-[4/5]">
              <div className="absolute inset-0 bg-[url('/hospital-hero.jpg')] bg-cover bg-center opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-4 bottom-8 rounded-xl bg-card p-4 shadow-lg md:-left-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">Book Appointment</p>
                    <p className="text-xs text-muted-foreground">Easy online scheduling</p>
                  </div>
                </div>
              </motion.div>

              {/* Another Floating Element */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -right-4 top-8 rounded-xl bg-card p-4 shadow-lg md:-right-8"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-card bg-primary/20"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">50+ Doctors</p>
                    <p className="text-xs text-muted-foreground">Available now</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs">Scroll to explore</span>
          <ArrowRight className="h-4 w-4 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}
