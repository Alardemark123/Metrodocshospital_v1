"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getServices, ICON_MAP } from "@/lib/mock-api";

export function ServicesHighlights() {
  const services = getServices();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const featured = services[0];
  const rest = services.slice(1);
  const FeaturedIcon = featured ? ICON_MAP[featured.icon] : null;

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-32">
      {/* Diagonal stripe accent top-left */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "12px 12px",
        }}
      />
      {/* Floating shapes */}
      <div className="pointer-events-none absolute right-10 top-16 h-16 w-16 rotate-12 rounded-2xl border border-primary/10" />
      <div className="pointer-events-none absolute left-1/3 bottom-16 h-8 w-8 rotate-45 bg-primary/5 rounded-sm" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-32 w-32 rounded-full border border-primary/8" />

      {/* Low-opacity background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/FRD_5333-scaled.jpg')" }}
      />
      <div className="absolute inset-0 bg-secondary/90" />
      {/* Radial glow effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/40 blur-[90px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header — split left/right */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Services
              </span>
            </div>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Comprehensive <span className="text-primary">Healthcare</span>{" "}
              Services
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right"
          >
            From routine check-ups to specialized treatments, we offer a wide
            range of medical services to meet all your healthcare needs under
            one roof.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured — spans 2 rows */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55 }}
              className="lg:row-span-2"
            >
              <Link href={featured.href} className="group block h-full">
                <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl bg-primary p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:min-h-0">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
                  <div className="pointer-events-none absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/5" />

                  <div className="relative mb-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    {FeaturedIcon && (
                      <FeaturedIcon className="h-7 w-7 text-primary-foreground" />
                    )}
                  </div>

                  <div className="relative mt-8">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
                      Featured Service
                    </span>
                    <h3 className="mb-3 text-2xl font-bold text-primary-foreground">
                      {featured.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-primary-foreground/80">
                      {featured.description}
                    </p>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-primary-foreground transition-all group-hover:bg-white/30">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Remaining cards */}
          {rest.map((service, index) => {
            const ServiceIcon = ICON_MAP[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
              >
                <Link href={service.href} className="group block h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                        {ServiceIcon && (
                          <ServiceIcon className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                        )}
                      </div>
                      <h3 className="font-semibold text-card-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                      Learn more
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/departments"
            className="group inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 backdrop-blur-sm px-7 py-3 text-sm font-semibold text-foreground shadow-sm transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Departments
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
