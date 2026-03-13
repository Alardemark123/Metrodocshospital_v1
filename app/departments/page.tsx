"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Clock,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getDepartments } from "@/lib/mock-api";
import type { Department } from "@/lib/mock-api";

// ─── Carousel ────────────────────────────────────────────────────────────────

function DepartmentCarousel({ departments }: { departments: Department[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const n = departments.length;

  // Handle responsive card counts
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % n);
  }, [n]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + n) % n);
  }, [n]);

  // Determine which cards are visible
  const visibleCards = [];
  for (let i = 0; i < cardsToShow; i++) {
    visibleCards.push(departments[(currentIndex + i) % n]);
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 lg:px-12">
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute -left-2 lg:-left-20 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0a2e1a] shadow-xl transition-all hover:bg-[#5CA51B] hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Flat Card Stage */}
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleCards.map((dept, i) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col overflow-hidden rounded-[24px] bg-white border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative aspect-[1.4/1] w-full overflow-hidden">
                  <Image
                    src={dept.image || "/placeholder.jpg"}
                    alt={dept.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-7">
                  {/* Meta (Style from reference) */}
                  <div className="mb-4 flex items-center gap-2 text-[12px] font-bold text-[#5CA51B]">
                    <span>MetroDocs Hospital</span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-lg font-extrabold text-[#0a2e1a] line-clamp-1">
                    {dept.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {dept.excerpt || dept.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute -right-2 lg:-right-20 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0a2e1a] shadow-xl transition-all hover:bg-[#5CA51B] hover:text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-10 flex justify-center gap-2">
        {departments.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === currentIndex ? "w-6 bg-[#5CA51B]" : "w-1.5 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DepartmentsPage() {
  const departments = getDepartments();

  return (
    <div className="bg-[#f8faff] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#5CA51B]/20 bg-[#5CA51B]/10 px-4 py-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-[#5CA51B]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#5CA51B]">
                Our Departments
              </span>
            </div>
            <h1 className="mb-5 text-4xl font-bold text-[#0a2e1a] md:text-5xl">
              Specialized Medical Departments
            </h1>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Our hospital features specialized departments staffed by expert
              physicians and equipped with cutting-edge technology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                <Clock className="h-4 w-4 text-[#5CA51B]" />
                <span className="text-sm text-foreground">
                  24/7 Emergency Services
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                <Phone className="h-4 w-4 text-[#5CA51B]" />
                <span className="text-sm text-foreground">(02) 8251-6922</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16">
        <DepartmentCarousel departments={departments} />
      </section>
    </div>
  );
}
