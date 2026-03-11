"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getDepartmentsPreview, ICON_MAP } from "@/lib/mock-api"

export function DepartmentsPreview() {
  const departments = getDepartmentsPreview()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-background py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <div>
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              Departments
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Specialized Care Units
            </h2>
          </div>
          <Link
            href="/departments"
            className="group flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View All Departments
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Departments Grid - Bento Style */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Large Featured Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2"
          >
            <Link href={departments[0].href} className="group block h-full">
              <div className="flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground transition-transform hover:scale-[1.02]">
                <div>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20">
                    {(() => { const Icon = ICON_MAP[departments[0].icon]; return Icon ? <Icon className="h-8 w-8" /> : null })()}
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{departments[0].name}</h3>
                  <p className="text-primary-foreground/80">{departments[0].description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                  Available 24/7
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Regular Cards */}
          {departments.slice(1).map((dept, index) => {
            const DeptIcon = ICON_MAP[dept.icon]
            return (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            >
              <Link href={dept.href} className="group block h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${dept.color}`}>
                    {DeptIcon && <DeptIcon className="h-6 w-6" />}
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">{dept.name}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{dept.description}</p>
                </div>
              </Link>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  )
}
