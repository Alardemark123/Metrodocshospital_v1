"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
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
} from "lucide-react";
import { getFacilities } from "@/lib/mock-api";

/* ── Reusable fade-in wrapper ── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
      "Doctors at Metrodocs Hospital are skilled medical professionals who assist in treating and healing patients of a variety of health ailments.",
  },
  {
    icon: Phone,
    title: "Emergency Help",
    description:
      "Calling our emergency hotline at (02) 8251-6922 | (02) 8532-6505 Local 104 can connect you to Metrodocs Hospital's immediate assistance during an emergency.",
  },
  {
    icon: Star,
    title: "Quality & Safety",
    description:
      "Metrodocs Hospital evaluates the effectiveness, timeliness, safety, and responsiveness of the care by examining these factors.",
  },
];

const stats = [
  { number: "25+", label: "Years of Excellence" },
  { number: "50+", label: "Expert Doctors" },
  { number: "10K+", label: "Patients Treated" },
  { number: "7", label: "Departments" },
];

const visionPoints = [
  "To be the leader in the hospital and health service industry in the eastern section of the metropolis through our well-trained and knowledgeable health services staff and cooperative members.",
  "To be an institution where expertise of physicians and skilled allied health workers will be honed to their maximum potential.",
  "To protect the interest of our cooperators by establishing a well-founded health institution with premium on quality healthcare service.",
];

const hmoRow1 = [
  { name: "AMAPHIL", logo: "/about/client/1.png" },
  { name: "Asian Life", logo: "/about/client/2.png" },
  { name: "Generali", logo: "/about/client/3.png" },
  { name: "East West Healthcare", logo: "/about/client/4.png" },
  { name: "Cocolife", logo: "/about/client/5.png" },
  { name: "HMI", logo: "/about/client/6.png" },
  { name: "The House Printers", logo: "/about/client/7.png" },
  { name: "Getwell Health Systems", logo: "/about/client/9.png" },
  { name: "Maxicare", logo: "/about/client/19.png" },
  { name: "Philcare", logo: "/about/client/21.png" },
  { name: "Medilink", logo: "/about/client/23.png" },
  { name: "PhilCare", logo: "/about/client/25.png" },
];

const hmoRow2 = [
  { name: "Lacson & Lacson", logo: "/about/client/10.png" },
  { name: "HPPI", logo: "/about/client/11.png" },
  { name: "Avega", logo: "/about/client/12-1.png" },
  { name: "Intellicare", logo: "/about/client/13.png" },
  { name: "Kaiser", logo: "/about/client/14.png" },
  { name: "Life & Health", logo: "/about/client/15.png" },
  { name: "IMS", logo: "/about/client/16.png" },
  { name: "Medicard", logo: "/about/client/18.png" },
  { name: "MedAsia", logo: "/about/client/20.png" },
  { name: "Medicare-Plus", logo: "/about/client/22.png" },
  { name: "Pacific Cross", logo: "/about/client/24.png" },
  { name: "Value Care", logo: "/about/client/26.png" },
];

/* ── HMO Marquee — pause on hover using useAnimationControls ── */
function HmoMarquee() {
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  useEffect(() => {
    controls1.start({
      x: ["0%", "-50%"],
      transition: { duration: 22, repeat: Infinity, ease: "linear" },
    });
    controls2.start({
      x: ["-50%", "0%"],
      transition: { duration: 26, repeat: Infinity, ease: "linear" },
    });
  }, [controls1, controls2]);

  const pause = () => {
    controls1.stop();
    controls2.stop();
  };

  const resume = () => {
    controls1.start({
      x: ["0%", "-50%"],
      transition: { duration: 22, repeat: Infinity, ease: "linear" },
    });
    controls2.start({
      x: ["-50%", "0%"],
      transition: { duration: 26, repeat: Infinity, ease: "linear" },
    });
  };

  const sharedCard = (hmo: { name: string; logo: string }, i: number) => (
    <div
      key={i}
      className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm"
    >
      <div className="relative h-10 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
        <Image
          src={hmo.logo}
          alt={hmo.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-card-foreground">
        {hmo.name}
      </span>
    </div>
  );

  return (
    <div
      className="space-y-4 overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Row 1 — scrolls left */}
      <div className="flex gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div animate={controls1} className="flex shrink-0 gap-4">
          {[...hmoRow1, ...hmoRow1].map((hmo, i) => sharedCard(hmo, i))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex gap-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div animate={controls2} className="flex shrink-0 gap-4">
          {[...hmoRow2, ...hmoRow2].map((hmo, i) => sharedCard(hmo, i))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-24 lg:py-36">
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
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                About Us
              </span>
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              A Legacy of Healing,{" "}
              <span className="text-primary">A Future of Hope</span>
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
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
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
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <FadeIn>
              <div className="relative">
                <div className="pointer-events-none absolute -left-4 -top-8 select-none font-serif text-[120px] leading-none text-primary/8">
                  "
                </div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                  <Heart className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    We Are Always Glad To Help
                  </span>
                </div>
                <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                  Your Health Is Our{" "}
                  <span className="text-primary">Priority</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
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
                <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
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

            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                  >
                    <p className="text-3xl font-bold text-primary">
                      {stat.number}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
                <Link href="/contact" className="group col-span-2 block">
                  <div className="flex items-center justify-between rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-6 py-4 transition-all hover:border-primary hover:bg-primary/10">
                    <span className="font-semibold text-foreground">
                      Book a Consultation
                    </span>
                    <ArrowRight className="h-5 w-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Mission & Vision
              </span>
            </div>
            <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              What Drives Us Forward
            </h2>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-2">
            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg md:p-10">
                <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-white/5" />
                <div className="pointer-events-none absolute right-6 bottom-6 h-6 w-6 rotate-45 rounded-sm border border-white/10" />
                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    <Target className="h-7 w-7" />
                  </div>
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary-foreground/60">
                    Our Mission
                  </span>
                  <h3 className="mb-4 text-xl font-bold md:text-2xl">
                    Quality Health Service Affordable for All
                  </h3>
                  <p className="leading-relaxed text-primary-foreground/85">
                    To provide quality health service affordable for all —
                    delivering compassionate, patient-centered healthcare that
                    improves the quality of life for individuals and
                    communities. We are committed to excellence in clinical care
                    and community service.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-[60px] bg-primary/4" />
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Our Vision
                </span>
                <h3 className="mb-5 text-xl font-bold text-card-foreground md:text-2xl">
                  Leading Healthcare in the Eastern Metropolis
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.07}>
                <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <div className="absolute left-0 top-0 h-0.5 w-0 rounded-t-2xl bg-primary transition-all duration-500 group-hover:w-full" />
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <item.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 font-semibold text-card-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={whyChooseUs.length * 0.07}>
              <Link href="/contact" className="group block h-full">
                <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center transition-all hover:border-primary hover:bg-primary/10">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                    <ArrowRight className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <p className="font-semibold text-foreground">
                    Book a Consultation
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Get in touch with our team today
                  </p>
                </div>
              </Link>
            </FadeIn>
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
          ACCREDITED HMOs
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
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
        <div className="pointer-events-none absolute right-16 bottom-10 h-16 w-16 rotate-45 rounded-lg border border-primary/10" />
        <div className="pointer-events-none absolute left-10 top-10 h-10 w-10 rounded-full border border-primary/10" />

        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="mb-14 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Accredited Partners
              </span>
            </div>
            <h2 className="mb-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Accredited <span className="text-primary">HMOs</span>
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Metro Rizal Doctors Hospital works with leading health maintenance
              organizations so you can focus on getting better — not on the
              paperwork.
            </p>
          </FadeIn>

          <HmoMarquee />

          <FadeIn className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Don't see your HMO?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary hover:underline"
              >
                Contact us
              </Link>{" "}
              — we're continuously expanding our accredited partners.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
