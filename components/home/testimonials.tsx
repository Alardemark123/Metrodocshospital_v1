"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/mock-api/testimonial";
import { Dancing_Script } from "next/font/google";

const cursiveFont = Dancing_Script({
  subsets: ["latin"],
});

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  const navigate = (dir: number) => {
    setPage((prev) => prev + dir);
  };

  const getIndex = (offset: number) => {
    let index = (page + offset) % testimonials.length;
    if (index < 0) index += testimonials.length;
    return index;
  };

  const visibleItems = [-2, -1, 0, 1, 2].map((offset) => {
    const index = getIndex(offset);
    return {
      ...testimonials[index],
      offset,
      uniqueKey: page + offset,
    };
  });

  return (
    <section ref={ref} className="relative bg-transparent py-12 lg:py-16 overflow-hidden">
      {/* Minimalist Abstract Wavy Background (from Reference Concept) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[15%] -right-[10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-slate-50/80 rounded-[45%_55%_70%_30%/40%_50%_60%_50%] transform rotate-12" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] bg-slate-50/80 rounded-[60%_40%_30%_70%/50%_60%_40%_50%] transform -rotate-12" />
        {/* Scattered Dots */}
        <div className="absolute top-[20%] right-[30%] w-3 h-3 bg-slate-200/50 rounded-full" />
        <div className="absolute top-[25%] right-[25%] w-1.5 h-1.5 bg-slate-300/50 rounded-full" />
        <div className="absolute top-[15%] right-[15%] w-2 h-2 bg-slate-200/50 rounded-full" />
        <div className="absolute bottom-[30%] left-[20%] w-4 h-4 bg-slate-200/50 rounded-full" />
        <div className="absolute bottom-[20%] left-[25%] w-2 h-2 bg-slate-300/50 rounded-full" />
        <div className="absolute top-[40%] left-[10%] w-3 h-3 bg-slate-200/50 rounded-full" />

        {/* Subtle Wavy Contour Lines (SVG) */}
        <svg className="absolute w-full h-full opacity-[0.15]" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <path d="M0,15 C30,25 40,-5 100,15" stroke="#94a3b8" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
          <path d="M0,20 C35,30 45,0 100,20" stroke="#94a3b8" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
          <path d="M0,25 C40,35 50,5 100,25" stroke="#94a3b8" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />

          <path d="M0,85 C30,75 40,105 100,85" stroke="#94a3b8" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
          <path d="M0,90 C35,80 45,110 100,90" stroke="#94a3b8" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
          <path d="M0,95 C40,85 50,115 100,95" stroke="#94a3b8" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-2 md:mb-4 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-primary mb-2">
            TESTIMONIALS
          </h2>
          <div className="mx-auto mb-4 h-1 w-48 md:w-64 bg-primary" />
          <h3 className="text-2xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4 md:mb-6">
            What Our Patients Say
          </h3>
          <p className="text-muted-foreground text-sm md:text-lg">
            We place huge value on strong relationships and have seen the benefit they bring to our patients. Patient feedback is vital in helping us deliver the best possible care.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex w-full items-center justify-center mt-2 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 sm:left-4 md:left-8 z-30 hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Cards Container */}
          <div className="relative flex w-full max-w-5xl justify-center items-center h-[420px] md:h-[460px]">
            <AnimatePresence initial={false}>
              {visibleItems.map((item) => {
                const isCenter = item.offset === 0;
                const isVisible = Math.abs(item.offset) <= 1;

                return (
                  <motion.div
                    key={item.uniqueKey}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: `${item.offset * 100}%`,
                    }}
                    animate={{
                      opacity: isVisible ? (isCenter ? 1 : 0.8) : 0,
                      scale: isCenter ? 1 : 0.85,
                      x: `${item.offset * 100}%`,
                      zIndex: isCenter ? 20 : isVisible ? 10 : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      x: `${item.offset * 100}%`,
                      zIndex: 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute"
                    style={{ pointerEvents: isVisible ? "auto" : "none" }}
                  >
                    <div className="flex h-[380px] w-[270px] sm:h-[400px] sm:w-[300px] md:h-[420px] md:w-[360px] flex-col rounded-[2rem] overflow-hidden shadow-xl border border-black/5 bg-white">
                      <div className="bg-white h-[100px] md:h-[120px] w-full shrink-0 relative">
                        <div className="absolute left-1/2 -bottom-10 md:-bottom-12 h-20 w-20 md:h-24 md:w-24 -translate-x-1/2 rounded-full border-4 border-white bg-gray-200 text-3xl flex items-center justify-center font-bold text-gray-500 overflow-hidden shadow-sm z-10">
                          <div className="h-full w-full bg-[#B3B3B3] rounded-full flex items-center justify-center relative overflow-hidden">
                            <div className="absolute bottom-0 h-[45%] w-[70%] bg-[#1A1A1A] rounded-t-full" />
                            <div className="absolute top-[20%] h-[35%] w-[35%] bg-[#1A1A1A] rounded-full" />
                          </div>
                        </div>
                      </div>
                      {/* Bottom half green */}
                      <div className="bg-primary px-6 md:px-8 pb-8 md:pb-10 pt-12 md:pt-16 text-center text-primary-foreground flex grow flex-col justify-between relative rounded-t-[2rem] -mt-6">
                        <div className="relative h-full flex flex-col justify-center">
                          <span className="absolute -left-2 -top-4 md:-top-6 text-5xl md:text-6xl font-serif text-primary-foreground/40 leading-none">
                            &ldquo;
                          </span>
                          <p className="text-xs sm:text-sm leading-relaxed line-clamp-6 font-medium px-1 sm:px-2">
                            {item.quote}
                          </p>
                          <span className="absolute -right-2 -bottom-2 md:-bottom-4 text-5xl md:text-6xl font-serif text-primary-foreground/40 leading-none">
                            &rdquo;
                          </span>
                        </div>

                        <div className="mt-4 md:mt-4 flex flex-col gap-1 text-[10px] sm:text-xs md:text-sm">
                          <div className="font-bold uppercase tracking-wider">
                            {item.name}
                          </div>
                          <div className="font-medium text-primary-foreground/80 mt-1">
                            {item.role} &middot; {item.department}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigate(1)}
            className="absolute right-0 sm:right-4 md:right-8 z-30 hidden md:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 md:mt-8 flex justify-center gap-2 md:gap-3">
          {testimonials.map((_, idx) => {
            const currentActualIndex = getIndex(0);
            return (
              <button
                key={idx}
                onClick={() => {
                  setPage(page + (idx - currentActualIndex));
                }}
                className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all ${idx === currentActualIndex
                    ? "bg-primary w-6 md:w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
