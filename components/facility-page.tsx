"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  Activity,
  Bed,
  Building2,
  ScanLine,
  Siren,
  Stethoscope,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Bed,
  Building2,
  ScanLine,
  Siren,
  Stethoscope,
}

interface FacilitySection {
  title: string
  description: string
}

interface FacilityPageProps {
  title: string
  subtitle: string
  description: string
  iconName: keyof typeof ICON_MAP
  features: string[]
  sections?: FacilitySection[]
  highlights?: { title: string; value: string }[]
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export function FacilityPage({
  title,
  subtitle,
  description,
  iconName,
  features,
  sections,
  highlights,
}: FacilityPageProps) {
  const Icon = ICON_MAP[iconName] ?? Building2
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/about"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to About
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid items-center gap-12 lg:grid-cols-2"
          >
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <Icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                {subtitle}
              </span>
              <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl">
                {title}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
            
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-accent shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            <AnimatedSection>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Features
              </span>
              <h2 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl">
                What We Offer
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            {highlights && (
              <AnimatedSection delay={0.2}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-border bg-card p-6 text-center"
                    >
                      <p className="text-3xl font-bold text-primary">{highlight.value}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{highlight.title}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Sections */}
      {sections && sections.length > 0 && (
        <section className="bg-secondary py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-4">
            <AnimatedSection>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
                Areas
              </span>
              <h2 className="mb-12 text-balance text-3xl font-bold text-foreground md:text-4xl">
                Facility Sections
              </h2>
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-card p-6 shadow-sm"
                >
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
