"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctorBySlug, getDoctors, slugify } from "@/lib/mock-api";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DoctorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const doctor = getDoctorBySlug(slug);
  const router = useRouter();

  const [imgSrc, setImgSrc] = useState(
    doctor?.image ?? "/doctors/placeholder-doctor.jpg",
  );

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
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="flex flex-wrap gap-3"
              ></motion.div>
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-2xl">
                  <Image
                    src={imgSrc}
                    alt={`Photo of ${doctor.name}`}
                    fill
                    className="object-cover object-top"
                    onError={() => setImgSrc("/doctors/placeholder-doctor.jpg")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-semibold text-white/90">
                      {doctor.specialty}
                    </p>
                    <p className="text-xs text-white/60">{doctor.department}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
