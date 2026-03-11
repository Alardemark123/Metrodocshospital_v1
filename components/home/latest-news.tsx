"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { getNews } from "@/lib/mock-api"

export function LatestNews() {
  const news = getNews().slice(0, 3)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

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
              News & Events
            </span>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Latest Updates
            </h2>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View All News
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* News Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:row-span-2"
          >
            <Link href={`/news/${news[0].slug}`} className="group block h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-sm transition-all hover:shadow-lg">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/20 to-accent">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      {news[0].category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(news[0].date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {news[0].readTime}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-card-foreground transition-colors group-hover:text-primary md:text-2xl">
                    {news[0].title}
                  </h3>
                  <p className="flex-1 text-muted-foreground">{news[0].excerpt}</p>
                  <div className="mt-4 flex items-center gap-2 font-medium text-primary">
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Other Articles */}
          {news.slice(1).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
            >
              <Link href={`/news/${article.slug}`} className="group block">
                <article className="flex gap-4 rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md">
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent sm:w-32" />
                  <div className="flex flex-col">
                    <span className="mb-1 text-xs font-medium text-primary">{article.category}</span>
                    <h3 className="mb-2 font-semibold text-card-foreground transition-colors group-hover:text-primary">
                      {article.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatDate(article.date)}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
