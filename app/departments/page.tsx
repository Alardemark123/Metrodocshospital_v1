"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Clock,
  Phone,
} from "lucide-react";
import { slugify, getDepartments } from "@/lib/mock-api";
import type { Department } from "@/lib/mock-api";

// ─── Carousel Component ──────────────────────────────────────────────────────

function DepartmentCarousel({ departments }: { departments: Department[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const n = departments.length;

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
            {visibleCards.map((dept) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col overflow-hidden rounded-[24px] bg-white border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
              >
                {/* Image Section */}
                <div className="relative aspect-[1.4/1] w-full overflow-hidden">
                  <Image
                    src={dept.image || "/placeholder.jpg"}
                    alt={dept.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex items-center gap-2 text-[12px] font-bold text-primary">
                    <span>Metro Rizal Doctors</span>
                  </div>

                  <h3 className="mb-3 text-lg font-extrabold text-foreground line-clamp-1">
                    {dept.name}
                  </h3>

                  <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">
                    {dept.excerpt || dept.description}
                  </p>

                  <div className="mt-auto">
                    <Link
                      href={`/departments/${slugify(dept.name)}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:gap-3"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute -right-2 lg:-right-20 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-slate-100 bg-white text-primary shadow-xl transition-all hover:bg-[#5CA51B] hover:text-white"
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
              i === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function DepartmentsPage() {
  const departments = getDepartments();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-[#5CA51B]/10 px-4 py-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Expertise
              </span>
            </div>
            <h1 className="mb-5 text-4xl font-bold text-foreground md:text-5xl">
              Specialized Medical Departments
            </h1>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Providing world-class healthcare through specialized units and
              dedicated professionals.
            </p>
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
