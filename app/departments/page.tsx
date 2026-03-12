"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Clock,
  Stethoscope,
  Calendar,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDepartments, ICON_MAP } from "@/lib/mock-api";
import type { Department } from "@/lib/mock-api";

// ─── Single Department Card ───────────────────────────────────────────────────

function DeptCard({
  dept,
  position, // -1 = left peek, 0 = center, 1 = right peek
  onClick,
}: {
  dept: Department;
  position: -1 | 0 | 1;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[dept.icon];
  const isCenter = position === 0;

  return (
    <motion.div
      layout
      onClick={onClick}
      animate={{
        scale: isCenter ? 1 : 0.88,
        opacity: isCenter ? 1 : 0.55,
        x: position === -1 ? "8%" : position === 1 ? "-8%" : "0%",
        zIndex: isCenter ? 10 : 5,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full max-w-sm shrink-0 cursor-pointer overflow-hidden rounded-3xl border bg-card shadow-lg transition-shadow ${
        isCenter
          ? "border-primary/30 shadow-xl"
          : "border-border hover:opacity-75"
      }`}
      style={{ minWidth: "min(320px, 80vw)" }}
    >
      {/* Image */}
      <div
        className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${dept.bgGradient}`}
      >
        {dept.image ? (
          <Image
            src={dept.image}
            alt={dept.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {Icon && (
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${dept.color} shadow-lg`}
              >
                <Icon className="h-8 w-8" />
              </div>
            )}
          </div>
        )}
        {/* Services badge */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 backdrop-blur-md">
          <span className="text-[11px] font-semibold text-white">
            {dept.features?.length ?? 0} Services
          </span>
        </div>
        {/* Active indicator */}
        {isCenter && (
          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-md">
            <span className="h-2 w-2 rounded-full bg-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2.5">
          {Icon && (
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${dept.color}`}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>
          )}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-primary">
              Department
            </p>
            <h3 className="text-base font-bold leading-tight text-foreground">
              {dept.name}
            </h3>
          </div>
        </div>

        <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
          {dept.excerpt ?? dept.description}
        </p>

        {/* CTAs — only on center card */}
        {isCenter && (
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <Button size="sm" asChild className="gap-1.5 text-xs">
              <Link href="/doctors">
                Find a Doctor <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-1.5 text-xs"
            >
              <Link href="/contact">
                <Calendar className="h-3 w-3" /> Book
              </Link>
            </Button>
          </div>
        )}

        {/* Tap hint on side cards */}
        {!isCenter && (
          <p className="text-center text-[10px] font-medium text-muted-foreground">
            Tap to view
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────

function DepartmentCarousel({ departments }: { departments: Department[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const touchStart = useRef<number | null>(null);
  const n = departments.length;

  const go = useCallback(
    (i: number) => {
      setDir(i > active ? 1 : -1);
      setActive((i + n) % n);
    },
    [active, n],
  );

  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStart.current = null;
  };

  const leftIdx = (active - 1 + n) % n;
  const rightIdx = (active + 1) % n;

  return (
    <div className="relative mx-auto max-w-6xl px-4">
      {/* 3-card stage with arrows on the sides */}
      <div className="relative flex items-center">
        {/* Left arrow — sits beside the left peek card */}
        <button
          onClick={prev}
          className="absolute left-[-25] z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Cards */}
        <div
          className="flex w-full items-stretch justify-center gap-4 overflow-hidden px-12 py-4"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Left peek */}
          <div
            className="hidden w-full max-w-sm shrink-0 md:block"
            style={{ minWidth: "min(320px, 80vw)" }}
          >
            <DeptCard
              dept={departments[leftIdx]}
              position={-1}
              onClick={() => go(leftIdx)}
            />
          </div>

          {/* Center card */}
          <div
            className="w-full max-w-sm shrink-0"
            style={{ minWidth: "min(320px, 80vw)" }}
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={active}
                custom={dir}
                initial={{ opacity: 0, x: dir > 0 ? 60 : -60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <DeptCard
                  dept={departments[active]}
                  position={0}
                  onClick={() => {}}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right peek */}
          <div
            className="hidden w-full max-w-sm shrink-0 md:block"
            style={{ minWidth: "min(320px, 80vw)" }}
          >
            <DeptCard
              dept={departments[rightIdx]}
              position={1}
              onClick={() => go(rightIdx)}
            />
          </div>
        </div>

        {/* Right arrow — sits beside the right peek card */}
        <button
          onClick={next}
          className="absolute right-[-25] z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {departments.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? "h-2 w-5 bg-primary"
                : "h-2 w-2 bg-border hover:bg-muted-foreground"
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
    <>
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <Stethoscope className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Departments
              </span>
            </div>
            <h1 className="mb-5 text-4xl font-bold text-foreground md:text-5xl">
              Specialized Medical Departments
            </h1>
            <p className="mb-8 text-base text-muted-foreground md:text-lg">
              Our hospital features specialized departments staffed by expert
              physicians and equipped with cutting-edge technology.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">
                  24/7 Emergency Services
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">(02) 8251-6922</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Carousel */}
      <section className="bg-background py-16">
        <DepartmentCarousel departments={departments} />
      </section>
    </>
  );
}
