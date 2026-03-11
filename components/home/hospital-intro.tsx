"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Shield, Users, Award } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "Every treatment plan is tailored to your unique needs and preferences.",
  },
  {
    icon: Shield,
    title: "Advanced Technology",
    description: "State-of-the-art medical equipment for accurate diagnosis and treatment.",
  },
  {
    icon: Users,
    title: "Expert Medical Team",
    description: "Board-certified physicians and caring nursing staff dedicated to you.",
  },
  {
    icon: Award,
    title: "Accredited Excellence",
    description: "Recognized for maintaining the highest standards in healthcare.",
  },
]

export function HospitalIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              About Us
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              A Legacy of Healing, A Future of Hope
            </h2>
            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              For over two decades, ModernCare Hospital has been at the forefront of medical excellence. Our mission is to provide compassionate, accessible, and high-quality healthcare to every patient who walks through our doors.
            </p>
            <p className="mb-8 text-pretty leading-relaxed text-muted-foreground">
              We combine cutting-edge medical technology with a human touch, ensuring that you receive not just treatment, but genuine care that respects your dignity and values.
            </p>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <feature.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent shadow-xl">
                <div className="h-full w-full bg-[url('/hospital-building.jpg')] bg-cover bg-center" />
              </div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-card p-6 shadow-lg md:-bottom-8 md:-left-8"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">25+</p>
                    <p className="text-sm text-muted-foreground">Years of Service</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">98%</p>
                    <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Element */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-2xl bg-primary/20 -z-10" />
              <div className="absolute -bottom-4 right-8 h-16 w-16 rounded-xl bg-accent -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
