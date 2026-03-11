"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { getTestimonials } from "@/lib/mock-api"

export function Testimonials() {
  const testimonials = getTestimonials()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const navigate = (dir: number) => {
    setDirection(dir)
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length
      return prev === 0 ? testimonials.length - 1 : prev - 1
    })
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section ref={ref} className="bg-primary py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary-foreground/80">
            Testimonials
          </span>
          <h2 className="mb-12 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
            What Our Patients Say
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Quote Icon */}
          <Quote className="absolute -top-4 left-0 h-16 w-16 text-primary-foreground/20 md:-left-8 md:h-24 md:w-24" />

          {/* Testimonial Carousel */}
          <div className="relative min-h-[200px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <blockquote className="mb-8 text-xl leading-relaxed text-primary-foreground md:text-2xl">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <cite className="not-italic">
                  <span className="block text-lg font-semibold text-primary-foreground">
                    {testimonials[current].name}
                  </span>
                  <span className="text-sm text-primary-foreground/70">Patient</span>
                </cite>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === current
                      ? "w-8 bg-primary-foreground"
                      : "w-2 bg-primary-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
