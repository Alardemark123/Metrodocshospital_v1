"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Eye,
  Building2,
  ArrowRight,
  Shield,
  Cpu,
  UserCheck,
  Phone,
  Star,
  ChevronRight,
  Heart,
  X,
  ZoomIn,
} from "lucide-react";
import { getFacilities } from "@/lib/mock-api";
import { FadeIn } from "@/components/ui/fade-in";

/* ── Data ── */
const whyChooseUs = [
  {
    icon: Shield,
    title: "Medical Privacy",
    description:
      "As a healthcare provider, all data you process are considered sensitive personal information. Data privacy measures ensure your client that these information are safe and secured.",
  },
  {
    icon: Cpu,
    title: "Modern Equipment",
    description:
      "Patient care is always the top concern for medical facilities, but in order to care for patients properly, we need to ensure they are maintaining and managing medical equipment properly.",
  },
  {
    icon: UserCheck,
    title: "Qualified Doctors",
    description:
      "Doctors at Metro Rizal Doctors Hospital are skilled medical professionals who assist in treating and healing patients of a variety of health ailments.",
  },
  {
    icon: Phone,
    title: "Emergency Help",
    description:
      "Calling our emergency hotline at (02) 8251-6922 | (02) 8532-6505 Local 104 can connect you to Metro Rizal Doctors Hospital's immediate assistance during an emergency.",
  },
  {
    icon: Star,
    title: "Quality & Safety",
    description:
      "Metro Rizal Doctors Hospital evaluates the effectiveness, timeliness, safety, and responsiveness of the care by examining these factors.",
  },
];



const visionPoints = [
  "To be the leader in the hospital and health service industry in the eastern section of the metropolis through our well-trained and knowledgeable health services staff and cooperative members.",
  "To be an institution where expertise of physicians and skilled allied health workers will be honed to their maximum potential.",
  "To protect the interest of our cooperators by establishing a well-founded health institution with premium on quality healthcare service.",
];

/* ─────────────────────────────────────────── */
export default function AboutPage() {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  return (
    <>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-white from-secondary via-background to-accent py-24 lg:py-36">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute -right-8  top-10 h-44 w-44 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute -left-10 bottom-10 h-40 w-40 rotate-45 rounded-2xl border border-primary/8" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 left-0    h-64 w-64 rounded-full bg-accent/30  blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
                About Us
              </span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              A Legacy of Healing, <br />
              <span className="mt-2 block text-primary"> A Future of Hope</span>
            </h1>
            <p className="text-pretty text-lg text-muted-foreground">
              For over 25 years, Metro Rizal Doctors Hospital has been dedicated
              to providing exceptional healthcare services to our community —
              combining cutting-edge medical technology with compassionate,
              personalized care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════
          GLAD TO HELP
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-background py-16 lg:py-20">
        <div
          className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="pointer-events-none absolute -left-8 bottom-10 h-40 w-40 rounded-full border-2 border-dashed border-primary/10" />
        <div className="pointer-events-none absolute right-1/4 top-16 h-8 w-8 rotate-45 rounded-sm border border-primary/10" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <FadeIn>
              <div className="relative">
                <div className="pointer-events-none absolute -left-4 -top-8 select-none font-serif text-[120px] leading-none text-primary/8">
                  "
                </div>
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4 shadow-sm">
                  <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
                    We Are Always Glad to Help
                  </span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-foreground leading-tight md:text-4xl md:leading-tight">
                  Your Health Is Our{" "}
                  <span className="text-primary">Top Priority</span>
                </h2>
                <div className="space-y-3 text-muted-foreground text-[15px]">
                  <p className="leading-relaxed">
                    At Metro Rizal Doctors Hospital, we are committed to
                    providing you with the highest quality of healthcare
                    services and support. We understand that seeking medical
                    attention can be a difficult and stressful experience, and
                    we want you to know that we are here to help you every step
                    of the way.
                  </p>
                  <p className="leading-relaxed">
                    We are honored to be your healthcare provider, and we are
                    glad that we can be of service to you during your time of
                    need. Our team of dedicated healthcare professionals is
                    committed to providing you with personalized care and
                    attention to help you achieve optimal health and wellbeing.
                  </p>
                  <p className="leading-relaxed">
                    Thank you for choosing Metro Rizal Doctors Hospital. We will
                    do everything in our power to ensure that you receive the
                    best possible care and support.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    ND
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      Dr. Neil Andrew SJ. De Lumen
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Medical Director
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="flex justify-center">
              <motion.div 
                className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-green-50/50 to-primary/5 backdrop-blur-xl p-3 sm:p-4 border border-primary/20 shadow-xl shadow-primary/10 mx-auto max-w-[22rem] w-full"
                onClick={() => setIsImageExpanded(true)}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Single Inner Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] z-10 bg-background shadow-inner">
                  <Image 
                    src="/doctors/photo_2023-02-10_10-24-56-e1717140096859-280x264.jpg" 
                    alt="Metro Rizal Doctors Medical Team"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* View Overlay matching the reference style */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                    <div className="flex shadow-lg shadow-primary/10 items-center justify-center gap-2 bg-white text-foreground px-5 py-2.5 rounded-full font-semibold text-[13px] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 pointer-events-auto">
                       <ZoomIn className="w-4 h-4 text-foreground/80" /> View photo
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          MISSION & VISION
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="pointer-events-none absolute right-10 top-16 h-32 w-32 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute left-16 bottom-16 h-12 w-12 rotate-45 rounded-lg border border-primary/10" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="mb-14 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
              Mission and Vision
            </span>
          </div>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              What Drives Us Forward
            </h2>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-2 items-stretch">
            {/* Mission Card */}
            <FadeIn delay={0.1}>
              <div className="flex flex-col h-full relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg md:p-10">
                <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute right-6 bottom-6 h-6 w-6 rotate-45 rounded-sm border border-white/10" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 rounded-full bg-white/10 blur-md" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 shadow-md ring-2 ring-white/30">
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-lg font-bold uppercase tracking-widest">
                    Our Mission
                  </span>
                </div>

                <h3 className="mb-4 text-xl font-bold md:text-xl">
                  Quality Health Service Affordable for All
                </h3>
                <p className="leading-relaxed text-primary-foreground/85">
                  To provide quality health service affordable for all — delivering compassionate, patient-centered healthcare that improves the quality
                  of life for individuals and communities. We are committed to excellence in clinical care and community service.
                </p>
              </div>
            </FadeIn>

            {/* Vision Card */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col h-full relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-[60px] bg-primary/4" />
                <div className="pointer-events-none absolute -left-6 bottom-6 h-20 w-20 rounded-full bg-primary/5" />
                <div className="pointer-events-none absolute right-1/2 top-1/2 h-16 w-16 rounded-full bg-primary/10 blur-md" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shadow-md ring-2 ring-primary/20">
                    <Eye className="h-7 w-7 text-primary" />
                  </div>
                  <span className="text-lg text-primary font-bold uppercase tracking-widest">
                    Our Vision
                  </span>
                </div>

                <h3 className="mb-5 text-xl font-bold text-primary text-card-foreground md:text-xl">
                  Excellence in Eastern Metropolis Healthcare
                </h3>
                <ul className="space-y-4">
                  {visionPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <ChevronRight className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {point}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-16 top-0    h-[350px] w-[350px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="pointer-events-none absolute -left-16  bottom-0 h-[280px] w-[280px] rounded-full bg-accent/30  blur-[90px]" />
        <div className="pointer-events-none absolute right-1/3 top-10  h-8 w-8 rotate-45 rounded-sm border border-primary/10" />
        <div className="pointer-events-none absolute left-1/4  bottom-20 h-16 w-16 rounded-full border-2 border-dashed border-primary/10" />

        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="mb-14 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
              Individual Approach
            </span>
          </div>
            <h2 className="mb-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Why Choose <span className="text-primary">Us</span>
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              We go beyond standard care — here's what sets Metro Rizal Doctors
              Hospital apart.
            </p>
          </FadeIn>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {whyChooseUs.map((item, index) => (
              <FadeIn 
                key={item.title} 
                delay={index * 0.07}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(20%-20px)] flex"
              >
                <div className="relative flex w-full flex-col h-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <div 
                    className="bg-primary h-[160px] w-full flex items-center justify-center pb-8"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)" }}
                  >
                    <item.icon className="h-14 w-14 text-white" strokeWidth={1.5} />
                  </div>
                  
                  {/* Bottom white section */}
                  <div className="px-6 pb-8 pt-2 flex-1 flex flex-col bg-white">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-[3px] h-4 bg-primary shrink-0" />
                      <h3 className="font-bold text-primary text-[13px] tracking-widest uppercase">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FACILITIES
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute right-8 top-8   h-24 w-24 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute left-8  bottom-8 h-16 w-16 rotate-45 rounded-lg border border-primary/10" />

        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="mb-14 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Our Facilities
              </span>
            </div>
            <h2 className="mb-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Explore Our Hospital
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Take a virtual tour of our state-of-the-art facilities designed to
              provide the best possible care experience.
            </p>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {getFacilities().map((facility, index) => (
              <FadeIn key={facility.name} delay={index * 0.07}>
                <Link href={facility.href} className="group block">
                  <div className="relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                    <div className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 rounded-r bg-primary transition-transform duration-300 group-hover:scale-y-100 lg:block" />
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                        <Building2 className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground transition-colors group-hover:text-primary">
                          {facility.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          HEALTHY & HAPPY PATIENTS
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/30 blur-[80px]" />
        <div className="pointer-events-none absolute right-1/4 bottom-16 h-10 w-10 rotate-45 rounded-sm border border-primary/10" />
        <div className="pointer-events-none absolute left-10 top-20 h-20 w-20 rounded-full border-2 border-dashed border-primary/10" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <FadeIn>
              <Image
                src="/about/sdf-768x512.jpg"
                alt="Patient Care"
                width={600}
                height={400}
                className="rounded-3xl object-cover shadow-lg"
              />
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Patient Care
                </span>
              </div>
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                Your Safety Is Our{" "}
                <span className="text-primary">First Priority</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Giving our patients the best care possible is our primary
                  goal. This involves making sure they are safe, providing fast,
                  efficient, patient-centered care throughout their hospital
                  stay and equitable.
                </p>
                <p className="leading-relaxed">
                  We urge that all medical staff at Metro Rizal Doctors Hospital
                  regard patient safety as their first priority — quality
                  attention in every facet of their work.
                </p>
                <p className="leading-relaxed">
                  Hence, we can guarantee that our patients receive the greatest
                  treatment attainable and that we keep gaining their faith and
                  trust.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  "Safe & Secure Care",
                  "Fast & Efficient",
                  "Patient-Centered",
                  "Equitable Access",
                ].map((badge) => (
                  <div
                    key={badge}
                    className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {badge}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          PHOTO LIGHTBOX MODAL
      ══════════════════════════════ */}
      <AnimatePresence>
        {isImageExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsImageExpanded(false)}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* close button */}
            <button
              onClick={() => setIsImageExpanded(false)}
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
              className="relative z-10 max-h-[90vh] max-w-sm w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <Image
                  src="/doctors/photo_2023-02-10_10-24-56-e1717140096859-280x264.jpg"
                  alt="Metro Rizal Doctors Medical Team expanded"
                  fill
                  className="object-cover object-top"
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
