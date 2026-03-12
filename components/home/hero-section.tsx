"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Calendar,
  Stethoscope,
  Users,
  Clock,
  Plus,
  Activity,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Stethoscope, number: "50+", label: "Expert Doctors" },
  { icon: Users, number: "10K+", label: "Happy Patients" },
  { icon: Clock, number: "24/7", label: "Emergency Care" },
];

const photos = [
  {
    src: "/floating-image1.jpg",
    alt: "Hospital facilities",
    label: "World-Class Facilities",
    sub: "Equipped with modern medical technology",
  },
  {
    src: "/floating-image2.jpg",
    alt: "Medical team",
    label: "Expert Medical Team",
    sub: "50+ specialist doctors across all departments",
  },
  {
    src: "/floating-image3.jpg",
    alt: "Patient care",
    label: "Compassionate Care",
    sub: "Personalized treatment tailored to every patient",
  },
];

export function HeroSection() {
  // which photo is on top (front of stack)
  const [front, setFront] = useState(0);
  // fullscreen view
  const [fullscreen, setFullscreen] = useState<number | null>(null);
  // pause auto-rotation when fullscreen is open
  const paused = fullscreen !== null;

  // auto-rotate every 3.5 s
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setFront((p) => (p + 1) % photos.length);
    }, 3500);
    return () => clearInterval(t);
  }, [paused]);

  // stack layout: given the front index, compute
  // position/rotation for each card by their distance from front
  const getCardStyle = (i: number) => {
    const dist =
      (((i - front) % photos.length) + photos.length) % photos.length;
    // dist 0 = front, 1 = middle, 2 = back
    if (dist === 0)
      return { x: 0, y: 0, rotate: 0, scale: 1, z: 10, opacity: 1 };
    if (dist === 1)
      return { x: -80, y: 20, rotate: -8, scale: 0.88, z: 6, opacity: 0.75 };
    return { x: 80, y: 30, rotate: 8, scale: 0.82, z: 4, opacity: 0.55 };
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col overflow-hidden text-[#1a3c2a] lg:flex-row"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f5fbf2",
      }}
    >
      {/* ══════════════════════
          LEFT — content
      ══════════════════════ */}
      <div className="relative order-last lg:order-none flex flex-1 flex-col justify-center overflow-hidden px-8 py-16 lg:px-20 lg:py-20 xl:px-28">
        {/* dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(#5CA51B 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-[#5CA51B] opacity-[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[10%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#5CA51B] opacity-[0.04] blur-[100px]" />
        <motion.div
          animate={{ x: [-200, 200], opacity: [0, 0.08, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="pointer-events-none absolute right-0 top-[25%] text-[#5CA51B]"
        >
          <Activity size={280} strokeWidth={0.5} />
        </motion.div>
        <div className="pointer-events-none absolute bottom-[20%] left-[5%] rotate-12 text-[#5CA51B] opacity-[0.03]">
          <ShieldCheck size={180} strokeWidth={0.5} />
        </div>
        <Plus
          className="absolute left-12 top-12 animate-pulse text-[#5CA51B] opacity-30"
          size={28}
        />
        <Plus
          className="absolute bottom-12 left-[45%] text-[#5CA51B] opacity-15"
          size={20}
        />

        <div className="relative z-20 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#5CA51B]/20 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5CA51B] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5CA51B]" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#5CA51B]">
              Welcome to Metrodocs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-[#0a2e1a] lg:text-7xl"
          >
            Compassionate <br /> Care for{" "}
            <span className="relative inline-block italic text-[#5CA51B]">
              Every Life.
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute bottom-2 left-0 -z-10 h-[8px] rounded-full bg-[#5CA51B]/12"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mb-10 max-w-md text-[16px] font-medium leading-[1.7] text-slate-500"
          >
            Delivering modern healthcare with trusted medical professionals.
            Experience world-class facilities tailored to your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mb-14 flex flex-row gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-[56px] rounded-xl border-none bg-[#5CA51B] px-8 font-bold text-white shadow-lg shadow-[#5CA51B]/20 transition-transform hover:scale-105 hover:bg-[#4d8b16]"
            >
              <Link href="/doctors" className="flex items-center gap-2">
                <Search size={18} strokeWidth={3} /> Find a Doctor
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-[56px] rounded-xl border-slate-200 bg-white px-8 font-bold text-slate-600 transition-all hover:bg-[#f0f9f1]"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Calendar size={18} /> Book Appointment
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="flex flex-row items-center gap-8 border-t border-slate-100 pt-10 lg:gap-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="group flex flex-col gap-1"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#5CA51B]/5 p-1.5 text-[#5CA51B] transition-colors duration-300 group-hover:bg-[#5CA51B] group-hover:text-white">
                    <stat.icon size={16} />
                  </div>
                  <span className="text-2xl font-extrabold text-[#5CA51B]">
                    {stat.number}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-slate-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════
          RIGHT — auto-carousel stack + click-to-fullscreen
      ══════════════════════ */}
      <div className="relative order-first lg:order-none flex h-[480px] w-full items-center justify-center overflow-hidden p-6 lg:h-auto lg:flex-[0.85]">
        {/* dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(#5CA51B 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="pointer-events-none absolute -right-[10%] -top-[10%] h-[420px] w-[420px] rounded-full bg-[#5CA51B] opacity-[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[5%] right-[15%] h-[320px] w-[320px] rounded-full bg-[#5CA51B] opacity-[0.04] blur-[100px]" />

        {/* dot indicators bottom */}
        <div className="absolute bottom-5 left-0 right-0 z-30 flex items-center justify-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setFront(i)}
              className={`rounded-full transition-all duration-300 ${
                i === front ? "h-2 w-6 bg-[#5CA51B]" : "h-2 w-2 bg-[#5CA51B]/30"
              }`}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-12 left-0 right-0 z-20 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5CA51B]/50">
            Click photo to expand
          </span>
        </div>

        {/* ── card stack ── */}
        <div className="relative flex h-[300px] w-[300px] items-center justify-center lg:h-[75%] lg:w-[75%]">
          {photos.map((photo, i) => {
            const s = getCardStyle(i);
            const isFront = i === front;
            return (
              <motion.div
                key={i}
                animate={{
                  x: s.x,
                  y: s.y,
                  rotate: s.rotate,
                  scale: s.scale,
                  opacity: s.opacity,
                  zIndex: s.z,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => isFront && setFullscreen(i)}
                className={`absolute inset-0 overflow-hidden rounded-2xl shadow-xl ${
                  isFront
                    ? "cursor-pointer"
                    : "cursor-default pointer-events-none"
                }`}
                style={{
                  border: isFront
                    ? "2px solid rgba(92,165,27,0.5)"
                    : "2px solid rgba(255,255,255,0.25)",
                  boxShadow: isFront
                    ? "0 16px 48px rgba(92,165,27,0.22)"
                    : "0 6px 24px rgba(0,0,0,0.10)",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════
          FULLSCREEN OVERLAY
      ══════════════════════ */}
      <AnimatePresence>
        {fullscreen !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setFullscreen(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] max-w-[88vw] overflow-hidden rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[fullscreen].src}
                alt={photos[fullscreen].alt}
                className="block max-h-[88vh] max-w-[88vw] object-contain"
              />
              {/* caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5CA51B] shadow-[0_0_6px_#5CA51B]" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#5CA51B]">
                    Metrodocs
                  </span>
                </div>
                <p className="text-lg font-bold text-white">
                  {photos[fullscreen].label}
                </p>
                <p className="text-sm text-white/70">
                  {photos[fullscreen].sub}
                </p>
              </div>
              {/* close button */}
              <button
                onClick={() => setFullscreen(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
