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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDoctorById } from "@/lib/mock-api";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const doctor = getDoctorById(id);
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
      {/* Top hero banner — thin colored bar with back button */}
      <div className="border-b border-border bg-gradient-to-r from-secondary via-background to-accent">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Link>
        </div>
      </div>

      {/* Profile section */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4">
          {/* Profile card — overlaps the banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-md"
          >
            <div className="flex flex-col gap-0 lg:flex-row">
              {/* Left — image column */}
              <div className="relative w-full shrink-0 lg:w-72 xl:w-80">
                <div className="relative h-72 w-full lg:h-full">
                  <Image
                    src={imgSrc}
                    alt={`Photo of ${doctor.name}`}
                    fill
                    className="object-cover object-top"
                    onError={() => setImgSrc("/doctors/placeholder-doctor.jpg")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-card/20" />

                  {/* Rating */}
                  {doctor.rating > 0 && (
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 shadow backdrop-blur-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-foreground">
                        {doctor.rating}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right — details */}
              <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
                {/* Top: name + specialty */}
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {doctor.department}
                    </span>
                    {doctor.experience && doctor.experience !== "0" && (
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                        {doctor.experience} experience
                      </span>
                    )}
                  </div>

                  <h1 className="mb-1 text-3xl font-bold text-card-foreground md:text-4xl">
                    {doctor.name}
                  </h1>
                  <p className="mb-5 text-lg font-medium text-primary">
                    {doctor.specialty}
                  </p>

                  <p className="mb-6 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                    {doctor.fullBio ?? doctor.bio}
                  </p>
                </div>

                {/* Mid: quick stats row */}
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Education</p>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {doctor.education || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Schedule</p>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {doctor.availability
                          ? doctor.availability.split("|")[0].trim()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom: CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" asChild className="gap-2">
                    <Link href="/contact">
                      <Calendar className="h-4 w-4" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="gap-2">
                    <a href="tel:+15551234567">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom info cards */}
          <div className="mt-6 grid gap-5 pb-16 lg:grid-cols-3">
            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">
                  Awards & Recognition
                </h3>
              </div>
              {(doctor.awards ?? []).length > 0 ? (
                <ul className="space-y-2">
                  {(doctor.awards ?? []).map((award) => (
                    <li
                      key={award}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
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

            {/* Full availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">
                  Clinic Schedule
                </h3>
              </div>
              {doctor.availability ? (
                <div className="space-y-2">
                  {doctor.availability.split("|").map((slot, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="text-foreground">{slot.trim()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Contact for availability
                </p>
              )}
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Languages className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">
                  Languages Spoken
                </h3>
              </div>
              {(doctor.languages ?? []).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {(doctor.languages ?? []).map((lang) => (
                    <span
                      key={lang}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
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
    </>
  );
}
