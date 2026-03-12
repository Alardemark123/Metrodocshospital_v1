"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import {
  Star,
  Quote,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/mock-api/testimonial";
import { Testimonial } from "@/lib/mock-api";

const departments = [
  "All",
  ...Array.from(new Set(testimonials.map((t) => t.department))),
];

const stats = [
  { value: "98%", label: "Patient Satisfaction" },
  { value: "4.9", label: "Average Rating" },
  { value: "10K+", label: "Patients Served" },
  { value: "15+", label: "Years of Care" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.07,
        ease: "easeOut",
      }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Quote className="h-4 w-4 text-primary" />
        </div>
        <StarRating rating={t.rating} />
      </div>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        "{t.quote}"
      </p>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
            {t.department}
          </span>
          <p className="mt-1 text-xs text-muted-foreground">{t.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const filtered = testimonials.filter(
    (t) => selectedDept === "All" || t.department === selectedDept,
  );
  const heroQuotes = testimonials.slice(0, 3);
  const currentHero = heroQuotes[featuredIndex];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-2xl" />
        <div className="pointer-events-none absolute right-8 top-4 select-none text-[180px] font-serif leading-none text-primary/5 lg:right-24 lg:text-[260px]">
          "
        </div>

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Patient Stories
              </span>
            </div>
            <h1 className="mb-10 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Hear From Our Patients
            </h1>

            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <p className="mx-auto mb-6 mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                  "{currentHero.quote}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {currentHero.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">
                      {currentHero.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentHero.role} · {currentHero.department}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() =>
                  setFeaturedIndex(
                    (i) => (i - 1 + heroQuotes.length) % heroQuotes.length,
                  )
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1.5">
                {heroQuotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setFeaturedIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${i === featuredIndex ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setFeaturedIndex((i) => (i + 1) % heroQuotes.length)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 divide-x divide-border lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center py-6 text-center"
              >
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Filter:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${selectedDept === dept ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary text-foreground hover:bg-accent"}`}
              >
                {dept}
              </button>
            ))}
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            testimonial{filtered.length !== 1 ? "s" : ""}
            {selectedDept !== "All" && (
              <span className="text-primary"> · {selectedDept}</span>
            )}
          </p>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={selectedDept}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((t, index) => (
                  <TestimonialCard key={t.id} t={t} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center rounded-2xl border border-dashed border-border py-20 text-center"
              >
                <div className="mb-4 rounded-full bg-secondary p-4">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground">
                  No testimonials yet
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  for the {selectedDept} department.
                </p>
                <button
                  onClick={() => setSelectedDept("All")}
                  className="mt-4 text-sm text-primary underline"
                >
                  View all
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-3 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <Quote className="h-7 w-7 text-primary-foreground" />
            </div>
          </div>
          <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
            Share Your Experience
          </h2>
          <p className="mb-8 text-sm text-primary-foreground/80 md:text-base">
            Your story could inspire others to seek the care they need. We'd
            love to hear about your visit.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Leave a Testimonial</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
