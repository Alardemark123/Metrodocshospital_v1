"use client";

import { motion, AnimatePresence } from "framer-motion";
import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  GraduationCap,
  Clock,
  Award,
  Calendar,
  Phone,
  MapPin,
  Languages,
  Stethoscope,
  BadgeCheck,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctorBySlug, getDoctors, slugify } from "@/lib/mock-api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const doctor = getDoctorBySlug(slug);
  const router = useRouter();

  const malePlaceholder = "/doctors/placeholder-doctor.jpg";
  const femalePlaceholder = "/doctors/doctor-280x281.png";
  const fallbackImg =
    doctor?.gender === "female" ? femalePlaceholder : malePlaceholder;
  const [imgSrc, setImgSrc] = useState(doctor?.image || fallbackImg);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const isExternal = doctor?.image?.startsWith("http");
    setImgSrc(doctor?.image || fallbackImg);
  }, [doctor?.image, fallbackImg]);

  // lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  if (!doctor) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Doctor Not Found
          </h1>
          <Button onClick={() => router.back()}>Back to Doctors</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent">
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

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-1.5 text-sm"
          >
            <Link
              href="/"
              className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <Link
              href="/doctors"
              className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Doctors
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="font-medium text-foreground">{doctor.name}</span>
          </motion.nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
            {/* Left — info */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5"
              >
                <Stethoscope className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  {doctor.department}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="mb-2 text-4xl font-bold leading-tight text-foreground md:text-5xl"
              >
                {doctor.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="mb-6 text-lg font-medium text-primary"
              >
                {doctor.specialty}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                {doctor.fullBio ?? doctor.bio}
              </motion.p>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 flex flex-wrap gap-3"
              >
                {doctor.experience && doctor.experience !== "0" && (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-foreground">
                      {doctor.experience}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Experience
                    </span>
                  </div>
                )}
                {doctor.education && (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold text-foreground">
                      {doctor.education}
                    </span>
                  </div>
                )}
                {doctor.availability && (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        Schedule
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {doctor.availability}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="flex flex-wrap gap-3"
              />
            </div>

            {/* Right — photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="order-1 mx-auto w-full max-w-[280px] lg:order-2 lg:mx-0"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl border border-primary/10" />
                <div className="absolute -inset-6 rounded-3xl border border-primary/5" />

                {/* Clickable image */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="group relative block w-full cursor-zoom-in"
                  aria-label="View full photo"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-2xl">
                    <Image
                      src={imgSrc}
                      alt={`Photo of ${doctor.name}`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={() => setImgSrc(fallbackImg)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />

                    {/* zoom hint overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                      <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <ZoomIn className="h-4 w-4 text-foreground" />
                        <span className="text-xs font-semibold text-foreground">
                          View photo
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {/* image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 max-h-[90vh] max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <Image
                  src={imgSrc}
                  alt={`Photo of ${doctor.name}`}
                  fill
                  className="object-cover object-top"
                  onError={() => setImgSrc(fallbackImg)}
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
