"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeatures, ICON_MAP } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";

export function HospitalIntro() {
  const features = getFeatures();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-20 lg:py-28"
    >
      {/* Plus/cross pattern top right */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Floating accent circles */}
      <div className="pointer-events-none absolute -right-10 top-20 h-48 w-48 rounded-full border-2 border-dashed border-primary/10" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-24 w-24 rotate-45 rounded-xl border border-primary/10" />
      <div className="pointer-events-none absolute right-1/4 bottom-20 h-10 w-10 rounded-full bg-primary/5" />
      <div className="mx-auto max-w-7xl px-4">
        {/* Top two-column: video left, text right */}
        <div className="mb-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — YouTube embed */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -left-3 -top-3 h-24 w-24 rounded-2xl bg-primary/10 -z-10" />
            <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-xl bg-accent -z-10" />

            <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
              <div className="relative aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/iJMZbE_Pz7Y?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=iJMZbE_Pz7Y"
                  title="Metro Rizal Doctors Hospital"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <p className="text-xs text-muted-foreground">
                Metro Rizal Doctors Hospital — Official
              </p>
            </div>
          </motion.div>

          {/* RIGHT — text content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                About Us
              </span>
            </div>

            <h2 className="mb-5 text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              A Legacy of Healing,{" "}
              <span className="text-primary">A Future of Hope</span>
            </h2>

            <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
              At Metro Rizal Doctors Hospital, we are committed to providing you
              with the highest quality of healthcare services and support. We
              understand that seeking medical attention can be a difficult and
              stressful experience, and we want you to know that we are here to
              help you every step of the way.
            </p>

            {/* Stats */}
            <div className="mb-8 flex gap-8">
              {[
                { value: "25+", label: "Years of Service" },
                { value: "98%", label: "Patient Satisfaction" },
                { value: "50+", label: "Expert Doctors" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <Button asChild className="gap-2">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
