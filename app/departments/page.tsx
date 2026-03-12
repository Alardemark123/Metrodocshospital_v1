"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Clock,
  Stethoscope,
  CheckCircle2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDepartments, ICON_MAP } from "@/lib/mock-api";
import type { Department } from "@/lib/mock-api";

function DepartmentCard({
  department,
  index,
}: {
  department: Department;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = ICON_MAP[department.icon];
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [dir, setDir] = useState(1);

  const image = department.image;
  const subImages: string[] = Array.isArray(department.subimage)
    ? department.subimage
    : [];

  const goTo = (i: number) => {
    setDir(i > slide ? 1 : -1);
    setSlide(i);
  };
  const prev = () => goTo((slide - 1 + subImages.length) % subImages.length);
  const next = () => goTo((slide + 1) % subImages.length);

  return (
    <motion.div
      ref={ref}
      id={department.id}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="scroll-mt-24"
    >
      <div
        className={`overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow duration-300 ${
          open
            ? "border-primary/40 shadow-lg"
            : "border-border hover:border-primary/20 hover:shadow-md"
        }`}
      >
        {/* ── Card face: image left + excerpt right ── */}
        <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[160px_1fr] md:grid-cols-[220px_1fr]">
          {/* Left: main image */}
          <div
            className={`relative min-h-[120px] overflow-hidden bg-gradient-to-br ${department.bgGradient}`}
          >
            {image ? (
              <Image
                src={image}
                alt={department.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${department.color} shadow-sm`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
              </div>
            )}
          </div>

          {/* Right: name + excerpt + toggle */}
          <div className="flex flex-col justify-between gap-3 p-4 sm:p-5 md:p-6">
            <div>
              <h3 className="mb-1.5 font-bold text-foreground sm:text-lg">
                {department.name}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2 sm:text-sm sm:line-clamp-3">
                {department.excerpt ?? department.description}
              </p>
            </div>

            <button
              onClick={() => setOpen((p) => !p)}
              className={`inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                open
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {open ? "Show less" : "View more"}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* ── Expanded panel ── */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left: full description + services + CTAs */}
                  <div className="flex flex-col gap-5 p-5 sm:p-6 md:border-r md:border-border md:p-7">
                    <div>
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        About
                      </p>
                      <p className="text-sm leading-[1.85] text-muted-foreground">
                        {department.description}
                      </p>
                    </div>
                    <div></div>

                    <div className="flex flex-wrap gap-2.5 border-t border-border pt-4">
                      <Button asChild size="sm" className="gap-1.5">
                        <Link href="/doctors">
                          Find a Doctor <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-1.5"
                      >
                        <Link href="/contact">
                          <Calendar className="h-3.5 w-3.5" /> Book Appointment
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right: slideshow */}
                  <div className="flex flex-col justify-center gap-3 p-5 sm:p-6 md:p-7">
                    {subImages.length > 0 ? (
                      <>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          Photos · {slide + 1} / {subImages.length}
                        </p>

                        {/* Main slide */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary">
                          <AnimatePresence initial={false} custom={dir}>
                            <motion.div
                              key={slide}
                              custom={dir}
                              variants={{
                                enter: (d: number) => ({
                                  x: d > 0 ? "100%" : "-100%",
                                  opacity: 0,
                                }),
                                center: { x: 0, opacity: 1 },
                                exit: (d: number) => ({
                                  x: d > 0 ? "-100%" : "100%",
                                  opacity: 0,
                                }),
                              }}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="absolute inset-0"
                            >
                              <Image
                                src={subImages[slide]}
                                alt={`${department.name} photo ${slide + 1}`}
                                fill
                                className="object-cover"
                              />
                            </motion.div>
                          </AnimatePresence>

                          {subImages.length > 1 && (
                            <>
                              <button
                                onClick={prev}
                                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-card/70 text-foreground backdrop-blur-sm transition-all hover:bg-card"
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              <button
                                onClick={next}
                                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-card/70 text-foreground backdrop-blur-sm transition-all hover:bg-card"
                              >
                                <ChevronRightIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>

                        {/* Dot indicators */}
                        {subImages.length > 1 && (
                          <div className="flex justify-center gap-1.5">
                            {subImages.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  i === slide
                                    ? "w-5 bg-primary"
                                    : "w-1.5 bg-border hover:bg-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        )}

                        {/* Thumbnail strip */}
                        {subImages.length > 1 && (
                          <div className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {subImages.map((src, i) => (
                              <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                  i === slide
                                    ? "border-primary"
                                    : "border-transparent opacity-50 hover:opacity-80"
                                }`}
                              >
                                <Image
                                  src={src}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Fallback when no subImages */
                      <div
                        className={`flex min-h-[180px] items-center justify-center rounded-2xl bg-gradient-to-br ${department.bgGradient}`}
                      >
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${department.color} opacity-50`}
                        >
                          {Icon && <Icon className="h-8 w-8" />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function DepartmentsPage() {
  const departments = getDepartments();

  return (
    <>
      {/* ── Hero ── */}
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
            <h1 className="mb-5 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Specialized Medical Departments
            </h1>
            <p className="mb-8 text-pretty text-base text-muted-foreground md:text-lg">
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

      {/* ── List ── */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              {departments.length} Departments
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <div className="flex flex-col gap-3">
            {departments.map((dept, i) => (
              <DepartmentCard key={dept.id} department={dept} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
