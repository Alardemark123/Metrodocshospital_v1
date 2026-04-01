"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Stethoscope, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctors, slugify, ICON_MAP } from "@/lib/mock-api";
import Image from "next/image";
import { cn } from "@/lib/utils";

function DoctorCard({
  doctor,
  index,
  isInView,
}: {
  doctor: ReturnType<typeof getDoctors>[0];
  index: number;
  isInView: boolean;
}) {
  const malePlaceholder = "/doctors/placeholder-doctor.jpg";
  const femalePlaceholder = "/doctors/doctor-280x281.png";
  const fallbackImg =
    doctor.gender === "female" ? femalePlaceholder : malePlaceholder;
  const [imgSrc, setImgSrc] = useState(doctor.image || fallbackImg);

  useEffect(() => {
    const isExternal = doctor.image?.startsWith("http");
    setImgSrc(doctor.image || fallbackImg);
  }, [doctor.image, fallbackImg]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <Link href={`/doctors/${slugify(doctor.name)}`} className="group block">
        <div className={cn(
          "relative overflow-hidden rounded-3xl border-3 border-transparent bg-card shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary group-hover:shadow-xl",
          index >= 6 && "hidden md:block"
        )}>
          {/* Portrait image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/50">
            <Image
              src={imgSrc}
              alt={`Photo of ${doctor.name}`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              // 5. If the provided image path 404s, swap to the correct gender fallback
              onError={() => setImgSrc(fallbackImg)}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />

            {/* Name + specialty */}
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
            {/*
              Mobile: always visible
              Desktop: hidden until hover
            */}
            <div className="flex items-center gap-1 text-xs font-semibold text-primary lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
              View Profile
              <ChevronRight className="h-3.5 w-3.5" />
            </div>
          </div>

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
      className="relative overflow-hidden bg-transparent py-12 lg:py-16"
    >
      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Floating shapes */}
      <div className="pointer-events-none absolute right-8 top-20 h-28 w-28 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute right-8 top-20 h-16 w-16 rounded-full border border-primary/10" />
      <div className="pointer-events-none absolute left-1/2 bottom-16 h-10 w-10 rotate-45 rounded-lg border border-primary/10" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-primary/8 blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-accent/40 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
        >
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <div key={doctor.id} className={cn(index === 3 && "hidden md:block")}>
              <DoctorCard
                doctor={doctor}
                index={index}
                isInView={isInView}
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 flex justify-center"
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
