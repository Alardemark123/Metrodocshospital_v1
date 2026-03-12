"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/mock-api/testimonial";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 60 : -60, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-primary py-20 lg:py-32"
    >
      {/* Radial glows */}
      {/* Diagonal stripe pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "16px 16px",
        }}
      />
      {/* Floating rings */}
      <div className="pointer-events-none absolute left-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
      <div className="pointer-events-none absolute left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
      <div className="pointer-events-none absolute bottom-12 right-1/3 h-8 w-8 rotate-45 rounded-sm border border-primary-foreground/10" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-primary-foreground/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-16 right-0 h-[350px] w-[350px] rounded-full bg-primary-foreground/5 blur-[90px]" />

      {/* Giant decorative quote */}
      <div className="pointer-events-none absolute right-8 top-4 select-none text-[200px] font-serif leading-none text-primary-foreground/5 lg:right-24 lg:text-[280px]">
        "
      </div>

      <div className="relative mx-auto max-w-5xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/80">
              Testimonials
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
            What Our Patients Say
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/10 bg-primary-foreground/10 backdrop-blur-sm">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-primary-foreground/20 via-primary-foreground/60 to-primary-foreground/20" />

            <div className="p-8 md:p-12">
              {/* Quote icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15">
                <Quote className="h-6 w-6 text-primary-foreground" />
              </div>

              {/* Animated quote */}
              <div className="relative min-h-[120px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    {/* Stars */}
                    <div className="mb-5 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <blockquote className="mb-8 text-lg leading-relaxed text-primary-foreground md:text-xl lg:text-2xl">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {/* Avatar initials */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 text-sm font-bold text-primary-foreground">
                        {t.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-primary-foreground">
                          {t.name}
                        </p>
                        <p className="text-sm text-primary-foreground/60">
                          Patient
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-primary-foreground/10 pt-6">
                {/* Counter */}
                <p className="text-sm text-primary-foreground/50">
                  <span className="font-bold text-primary-foreground">
                    {current + 1}
                  </span>
                  {" / "}
                  {testimonials.length}
                </p>

                {/* Dots + arrows */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground transition-all hover:bg-primary-foreground/15"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > current ? 1 : -1);
                          setCurrent(i);
                        }}
                        className={`rounded-full transition-all duration-300 ${
                          i === current
                            ? "h-2 w-6 bg-primary-foreground"
                            : "h-2 w-2 bg-primary-foreground/30 hover:bg-primary-foreground/60"
                        }`}
                        aria-label={`Go to ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground transition-all hover:bg-primary-foreground/15"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
