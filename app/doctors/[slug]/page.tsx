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
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/doctors"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Doctors
            </Link>
          </motion.div>

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
                {doctor.rating > 0 && (
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-4 py-2.5 backdrop-blur-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold text-foreground">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Rating
                    </span>
                  </div>
                )}
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
              >
                <Button size="lg" asChild className="gap-2">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="gap-2">
                  <a href="tel:+63282516922">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </Button>
              </motion.div>
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

      {/* ── Info Cards ── */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <Clock className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-card-foreground">
                  Clinic Schedule
                </h3>
              </div>
              {doctor.availability ? (
                <div className="space-y-2.5">
                  {doctor.availability.split("|").map((slot, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl bg-secondary/60 px-4 py-2.5"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">
                        {slot.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Contact for availability
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <Award className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-card-foreground">
                  Awards & Recognition
                </h3>
              </div>
              {(doctor.awards ?? []).length > 0 ? (
                <ul className="space-y-3">
                  {(doctor.awards ?? []).map((award) => (
                    <li
                      key={award}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {award}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No awards listed
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                  <Languages className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-bold text-card-foreground">
                  Languages Spoken
                </h3>
              </div>
              {(doctor.languages ?? []).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {(doctor.languages ?? []).map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Not specified</p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-primary py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-primary-foreground/10" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 text-2xl font-bold text-primary-foreground md:text-3xl">
              Book a Consultation with {doctor.name}
            </h2>
            <p className="mb-6 text-primary-foreground/80">
              Our team is ready to help. Schedule your appointment today.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link href="/contact">
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+63282516922">
                  <Phone className="h-4 w-4" />
                  (02) 8251-6922
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
