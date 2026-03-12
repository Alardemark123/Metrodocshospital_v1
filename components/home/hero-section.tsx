"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Search,
  Calendar,
  ChevronDown,
  Users,
  Clock,
  Stethoscope,
} from "lucide-react";

const heroSlides = [
  { image: "/floating-image1.jpg", tag: "Emergency Care" },
  { image: "/floating-image2.jpg", tag: "Expert Doctors" },
  { image: "/floating-image3.jpg", tag: "Modern Facilities" },
];

const stats = [
  { icon: Stethoscope, number: "50+", label: "Expert Doctors" },
  { icon: Users, number: "10K+", label: "Happy Patients" },
  { icon: Clock, number: "24/7", label: "Emergency Care" },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* ── MOBILE: image banner at top ── */}
      <div className="relative h-56 w-full sm:h-72 lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[index].image})` }}
          />
        </AnimatePresence>
        {/* Fades image into background below */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-transparent" />

        {/* Mobile dot indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "h-1.5 w-5 bg-primary" : "h-1.5 w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: right-side full-bleed image ── */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={`desktop-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[index].image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-background from-[15%] via-background/70 via-[40%] to-transparent to-[75%]" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

        {/* Desktop slide indicators */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group flex items-center gap-2"
            >
              <AnimatePresence>
                {i === index && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-xs font-medium text-white/80"
                  >
                    {slide.tag}
                  </motion.span>
                )}
              </AnimatePresence>
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === index
                    ? "h-8 w-1 bg-primary"
                    : "h-1 w-1 bg-white/40 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Content (both mobile + desktop) ── */}
      <div className="relative mx-auto flex max-w-7xl items-center px-6 lg:min-h-[92vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-xl pb-14 pt-2 lg:py-0"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Welcome to Metrodocs
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Compassionate
            <br />
            Care for{" "}
            <span className="relative inline-block text-primary">
              Every Life.
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-primary/40"
              />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-8 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Delivering modern healthcare with trusted medical professionals.
            World-class treatment with personalized care tailored to your needs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-10 flex flex-wrap gap-3"
          >
            <Button size="lg" asChild className="gap-2 shadow-md">
              <Link href="/doctors">
                <Search className="h-4 w-4" />
                Find a Doctor
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="/contact">
                <Calendar className="h-4 w-4" />
                Book Appointment
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 border-t border-border pt-8"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="flex flex-col gap-1"
              >
                <div className="flex items-center gap-1.5">
                  <stat.icon className="h-3.5 w-3.5 text-primary/70" />
                  <p className="text-2xl font-bold text-primary">
                    {stat.number}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
