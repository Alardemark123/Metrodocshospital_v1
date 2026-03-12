"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Stethoscope, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctors } from "@/lib/mock-api";
import Image from "next/image";

function DoctorCard({
  doctor,
  index,
  isInView,
}: {
  doctor: ReturnType<typeof getDoctors>[0];
  index: number;
  isInView: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(() => {
    const isExternal = doctor.image?.startsWith("http");
    return isExternal
      ? "/doctors/placeholder-doctor.jpg"
      : doctor.image || "/doctors/placeholder-doctor.jpg";
  });

  useEffect(() => {
    const isExternal = doctor.image?.startsWith("http");
    setImgSrc(
      isExternal
        ? "/doctors/placeholder-doctor.jpg"
        : doctor.image || "/doctors/placeholder-doctor.jpg",
    );
  }, [doctor.image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <Link href={`/doctors/${doctor.id}`} className="group block">
        <div className="relative overflow-hidden rounded-3xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          {/* Portrait image — tall */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/50">
            <Image
              src={imgSrc}
              alt={`Photo of ${doctor.name}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgSrc("/doctors/placeholder-doctor.jpg")}
            />

            {/* Dark gradient at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />

            {/* Rating — top right */}
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {doctor.rating}
            </div>

            {/* Name + specialty overlaid on image bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                {doctor.specialty}
              </p>
              <h3 className="mt-0.5 text-base font-bold leading-tight text-white">
                {doctor.name}
              </h3>
            </div>
          </div>

          {/* Footer strip */}
          <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Stethoscope className="h-3.5 w-3.5 text-primary/60" />
              {doctor.experience} exp.
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View Profile
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Left accent bar on hover */}
          <div className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 rounded-r bg-primary transition-transform duration-300 group-hover:scale-y-100" />
        </div>
      </Link>
    </motion.div>
  );
}

export function DoctorsHighlight() {
  const doctors = getDoctors().slice(0, 4);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-secondary py-20 lg:py-32"
    >
      {/* Radial glows */}
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-primary/8 blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-accent/40 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Team
              </span>
            </div>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Meet Our <span className="text-primary">Expert</span> Doctors
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
            Board-certified physicians with decades of combined experience and a
            passion for patient care.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-12 flex justify-center"
        >
          <Button size="lg" asChild>
            <Link href="/doctors" className="gap-2">
              View All Doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
