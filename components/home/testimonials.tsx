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
    <section ref={ref} className="bg-[#E9EBEA] py-16 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-2 md:mb-4 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest text-foreground mb-2">
            TESTIMONIALS
          </h2>
          <div className="mx-auto mb-4 h-1 w-48 md:w-64 bg-foreground" />
          <h3 className="text-2xl font-bold text-primary md:text-4xl lg:text-5xl mb-4 md:mb-6">
            What Our Patients Say
          </h3>
          <p className="text-muted-foreground text-base md:text-lg">
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
                className={`h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all ${
                  idx === currentActualIndex
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
