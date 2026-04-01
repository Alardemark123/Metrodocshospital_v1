"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { X, Expand, ChevronLeft, ChevronRight } from "lucide-react";
import { getServices, ICON_MAP } from "@/lib/mock-api";
import { cn } from "@/lib/utils";
import { NetworkBackground } from "./network-background";

const bentoLayout = [
  { cols: 2, rows: 2 }, // 1 — hero
  { cols: 1, rows: 1 }, // 2
  { cols: 1, rows: 1 }, // 3
  { cols: 1, rows: 2 }, // 4 — tall
  { cols: 1, rows: 1 }, // 5
  { cols: 2, rows: 1 }, // 6 — wide
  { cols: 1, rows: 1 }, // 7
  { cols: 1, rows: 1 }, // 8
  { cols: 2, rows: 1 }, // 9 — wide
  { cols: 1, rows: 1 }, // 10
  { cols: 1, rows: 1 }, // 11 — tall
  { cols: 1, rows: 1 }, // 12
  { cols: 1, rows: 1 }, // 13 — wide
  { cols: 1, rows: 1 }, // 14 — Extra Wide to fill bottom
];

const TOTAL = bentoLayout.length;

export function ServicesHighlights() {
  
  const allServices = getServices();
  const services = allServices.slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const activeService = services[activeIndex];

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((p) => (((p ?? 0) - 1) + TOTAL) % TOTAL);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((p) => ((p ?? 0) + 1) % TOTAL);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    
    <>
    
      <section ref={ref} className="relative overflow-hidden py-16 lg:py-24 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-12 lg:gap-20 items-start">

            {/* ── LEFT: Editorial Info Panel ── */}
            <div className="flex flex-col">

              {/* "Our Services" label pill */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/30 bg-transparent text-primary text-xs font-semibold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  Our Services
                </span>
              </motion.div>

              {/* Big editorial heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55 }}
                className="text-6xl md:text-7xl font-extrabold text-[#1a3a2a] leading-[1] tracking-tight mb-8"
              >
                Excellence in<br />
                Healthcare
              </motion.h2>

              {/* Horizontal pill tabs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {services.map((service, i) => {
                  // const Icon = ICON_MAP[service.icon];
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={service.title}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 border",
                        isActive
                          ? "bg-[#1a3a2a] text-white border-[#1a3a2a] shadow-lg shadow-black/10"
                          : "bg-[#f8fcf9] text-[#4a5f54] border-[#e2ece6] hover:bg-[#eff6f1] hover:text-[#1a3a2a] hover:border-[#ceddd4]"
                      )}
                    >
                      {/* {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />} */}
                      {service.title}
                    </button>
                  );
                })}
              </motion.div>

              {/* Animated service content */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28 }}
                    className="flex flex-col gap-6"
                  >
                    <h3 className="text-2xl font-bold text-[#1a3a2a]">
                      {activeService?.title}
                    </h3>
                    <p className="text-[17px] text-[#4a5f54] leading-relaxed max-w-sm font-medium opacity-90">
                      {activeService?.description} Our dedicated department offers
                      state-of-the-art facilities and personalized care to ensure
                      the best outcomes for every patient.
                    </p>
                    {activeService?.href && (
                      <Link
                        href={activeService.href}
                        className="self-start inline-flex items-center justify-center px-8 py-3.5 bg-[#1a3a2a] text-white rounded-xl text-sm font-bold transition-all hover:bg-[#0f241a] hover:shadow-xl active:scale-95 shadow-lg shadow-[#1a3a2a]/10"
                      >
                        Learn more
                      </Link>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── RIGHT: Professional Bento Grid ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="grid grid-cols-4 auto-rows-[115px] gap-3"
            >
              {bentoLayout.map(({ cols, rows }, i) => {
                const index = i + 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.15 + i * 0.035 }}
                    style={{ gridColumn: `span ${cols}`, gridRow: `span ${rows}` }}
                    className={cn(
                      "group relative rounded-2xl overflow-hidden bg-muted ring-1 ring-black/5 shadow-sm cursor-pointer",
                      i >= 6 && "hidden md:block" // ONLY show 6 images on mobile
                    )}
                    onClick={() => openLightbox(i)}
                  >
                    {/* Image */}
                    <img
                      src={`/services/${index}.png`}
                      alt={`Service ${index}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] pointer-events-none"
                    />

                    {/* Hover gradient overlay — pointer-events-none so clicks pass through */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Expand icon — purely decorative, click handled by parent */}
                    <div className="absolute bottom-2.5 right-2.5 flex items-center justify-center w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-white border border-white/25 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
                      <Expand className="w-3 h-3" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            {/* Image frame — stops propagation so clicking image doesn't close */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-w-5xl w-full mx-auto px-4 md:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={`/services/${lightboxIndex + 1}.png`}
                  alt={`Service ${lightboxIndex + 1}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.22 }}
                  className="w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/10"
                />
              </AnimatePresence>

              {/* Counter pill */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-xs font-medium tracking-widest">
                {lightboxIndex + 1} / {TOTAL}
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/25 transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/25 transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}