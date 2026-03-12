"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Calendar, ArrowRight } from "lucide-react"

export function HeroSection() {

  const heroImages = [
    "/floating-image1.jpg",
    "/floating-image2.jpg",
    "/floating-image3.jpg",
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-background">

      {/* HERO CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left"
        >

          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2">
            <span className="text-primary">Welcome to Metrodocs</span>
          </span>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Compassionate Care for{" "}
            <span className="text-primary">Every Life.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Delivering modern healthcare with trusted medical professionals.
            Experience world-class treatment with personalized care tailored
            to your needs.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">

            <Button
              size="lg"
              asChild
              className="gap-2 backdrop-blur-md bg-primary/90 hover:bg-primary shadow-lg"
            >
              <Link href="/doctors">
                <Search className="h-5 w-5" />
                Find a Doctor
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 backdrop-blur-md bg-white/40 border-white/30 shadow-lg"
            >
              <Link href="/contact">
                <Calendar className="h-5 w-5" />
                Contact Us
              </Link>
            </Button>

          </div>

          {/* STATS */}
          <div className="mt-12 grid grid-cols-3 gap-8 border-t pt-8">
            {[
              { number: "50+", label: "Expert Doctors" },
              { number: "10K+", label: "Happy Patients" },
              { number: "24/7", label: "Emergency Care" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-primary">
                  {stat.number}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </motion.div>


        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex-1 flex justify-center lg:justify-end"
        >

          <div className="relative h-[420px] w-[720px] translate-x-6 -translate-y-5">

            {/* IMAGE SLIDER */}
            <AnimatePresence mode="wait">
              <motion.div
                key={heroImages[index]}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${heroImages[index]})`,
                }}
              />
            </AnimatePresence>

            {/* SOFT GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/30" />


            {/* FLOATING DOCTOR CARDS */}

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-5 right-0 backdrop-blur-lg bg-white-60/600 shadow-xl rounded-xl p-4"
            >
              <p className="text-sm font-semibold text-primary">1540+ Active Clients</p>
              <p className="text-xs text-muted-foreground">Result you can Trust</p>
            </motion.div>


            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-0 -left-5 backdrop-blur-lg bg-white/60 shadow-xl rounded-xl p-4"
>
              <p className="text-sm font-semibold text-primary">Trusted by many Filipinos</p>
              <p className="text-xs text-muted-foreground">Expert doctors</p>
            </motion.div>
          </div>

        </motion.div>

      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowRight className="rotate-90" />
      </motion.div>

    </section>
  )
}