"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { ICON_MAP } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import type { FacilityPageProps } from "@/lib/mock-api/types";

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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Lightbox ── */
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-h-[85vh] max-w-5xl w-full overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`Photo ${index + 1}`}
          width={1200}
          height={800}
          className="h-auto max-h-[85vh] w-full object-contain"
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
          {index + 1} / {images.length}
        </div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </motion.div>
  );
}

/* ── Main Component ── */
export function FacilityPage({
  title,
  subtitle,
  description,
  iconName,
  features,
  highlights,
  images = [],
  sections = [],
}: FacilityPageProps) {
  const Icon = ICON_MAP[iconName];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const thumbnailRowRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const hasImages = images.length > 0;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () =>
    setLightboxIndex((p) => (p! - 1 + images.length) % images.length);
  const nextLightbox = () => setLightboxIndex((p) => (p! + 1) % images.length);

  const goTo = (i: number) => {
    setActiveImg(i);
    requestAnimationFrame(() => {
      const thumb = thumbnailRefs.current[i];
      const row = thumbnailRowRef.current;
      if (!thumb || !row) return;
      // Scroll only within the row container — never affect page scroll
      const rowRect = row.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const offset =
        thumbRect.left -
        rowRect.left +
        row.scrollLeft -
        rowRect.width / 2 +
        thumbRect.width / 2;
      row.scrollTo({ left: offset, behavior: "smooth" });
    });
  };

  const goPrev = () => goTo((activeImg - 1 + images.length) % images.length);
  const goNext = () => goTo((activeImg + 1) % images.length);

  // Touch handlers for swipe on main image
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <>
      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-accent py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute -right-8 top-10 h-44 w-44 rounded-full border border-primary/10" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/about#facilities"
              className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Facilities
            </Link>
          </motion.div>

          {/* Mobile: gallery first, then text. Desktop: side by side */}
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Gallery — shown first on mobile */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {hasImages ? (
                <div className="space-y-2.5">
                  {/* Main image */}
                  <div
                    className="relative w-full overflow-hidden rounded-2xl bg-secondary shadow-xl"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => openLightbox(activeImg)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <motion.div
                      key={activeImg}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[activeImg]}
                        alt={`${title} — photo ${activeImg + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Bottom overlay */}
                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-10">
                      <span className="text-xs font-medium text-white/80">
                        {activeImg + 1} / {images.length}
                      </span>
                      <span className="hidden items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs text-white backdrop-blur-sm sm:flex">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                          />
                        </svg>
                        Expand
                      </span>
                    </div>

                    {/* Arrows — bigger tap area on mobile */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goPrev();
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition-colors active:bg-black/70 sm:p-2"
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            goNext();
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition-colors active:bg-black/70 sm:p-2"
                        >
                          <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails — scrollable, fixed size */}
                  {images.length > 1 && (
                    <div
                      ref={thumbnailRowRef}
                      className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {images.map((img, i) => (
                        <button
                          key={i}
                          ref={(el) => {
                            thumbnailRefs.current[i] = el;
                          }}
                          onClick={() => goTo(i)}
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:h-20 sm:w-28 ${
                            i === activeImg
                              ? "border-primary shadow-md opacity-100"
                              : "border-transparent opacity-50 hover:opacity-80"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`View ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                          {i === activeImg && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-accent shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
                  {Icon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-24 w-24 text-primary/20" />
                    </div>
                  )}
                </div>
              )}
            </motion.div>

            {/* Text — shown second on mobile */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {subtitle}
                  </span>
                </div>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
              >
                {title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6"
              >
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    Book Appointment
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="px-8 py-6 text-center"
              >
                <p className="text-3xl font-bold text-primary">{h.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {h.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Sections — room types / area descriptions ── */}
      {sections.length > 0 && (
        <section className="relative overflow-hidden bg-secondary py-20 lg:py-28">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent/20 blur-[80px]" />

          <div className="relative mx-auto max-w-7xl px-4">
            <FadeIn className="mb-12">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Room Types
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Our <span className="text-primary">Accommodations</span>
              </h2>
            </FadeIn>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map((section, i) => (
                <FadeIn key={section.title} delay={i * 0.07}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                    {/* Top accent sweep */}
                    <div className="absolute left-0 top-0 h-0.5 w-0 rounded-t-2xl bg-primary transition-all duration-500 group-hover:w-full" />
                    {/* Number watermark */}
                    <span className="pointer-events-none absolute right-3 top-2 select-none text-5xl font-black text-primary/5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary">
                      <CheckCircle2 className="h-5 w-5 text-primary transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="mb-2 font-bold text-card-foreground">
                      {section.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Features ── */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-16 top-0 h-[350px] w-[350px] rounded-full bg-primary/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4">
          <FadeIn className="mb-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                What We Offer
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              Services & <span className="text-primary">Features</span>
            </h2>
          </FadeIn>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FadeIn key={feature} delay={i * 0.05}>
                <div className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">
                    {feature}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
