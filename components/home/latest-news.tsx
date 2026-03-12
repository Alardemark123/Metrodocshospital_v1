"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { getNews } from "@/lib/mock-api";

export function LatestNews() {
  const news = getNews().slice(0, 3);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const [featured, ...rest] = news;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-20 lg:py-32"
    >
      {/* Grid line pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Floating accents */}
      <div className="pointer-events-none absolute right-20 top-12 h-20 w-20 rotate-45 rounded-xl border border-primary/10" />
      <div className="pointer-events-none absolute left-12 bottom-12 h-12 w-12 rounded-full border-2 border-dashed border-primary/10" />
      <div className="pointer-events-none absolute right-1/3 bottom-8 h-6 w-6 rotate-12 bg-primary/5 rounded-sm" />

      {/* Subtle radial glows */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/30 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                News & Events
              </span>
            </div>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Latest <span className="text-primary">Updates</span>
            </h2>
          </div>
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All News
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Main layout: featured left, stack right */}
        <div className="grid gap-5 lg:grid-cols-5">
          {/* Featured article — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Link
              href={`/news/${featured.slug}`}
              className="group block h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                {/* Image area */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 via-accent to-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />

                  {/* Category pill */}
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                      <Tag className="h-3 w-3" />
                      {featured.category}
                    </span>
                  </div>

                  {/* Bottom overlay text */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-xl font-bold text-white drop-shadow md:text-2xl">
                      {featured.title}
                    </h3>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-primary/70" />
                      {formatDate(featured.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary/70" />
                      {featured.readTime}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                    Read Full Article
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* Side articles — 2 cols, stacked */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {rest.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
                className="flex-1"
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="group block h-full"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    {/* Thin color bar at top */}
                    <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/40 transition-all group-hover:from-primary group-hover:to-primary/70" />

                    <div className="flex flex-1 flex-col p-5">
                      {/* Category + date row */}
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.date)}
                        </span>
                      </div>

                      <h3 className="mb-2 font-semibold leading-snug text-card-foreground transition-colors group-hover:text-primary">
                        {article.title}
                      </h3>

                      <p className="flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                          Read More
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
