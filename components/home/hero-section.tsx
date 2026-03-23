"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const photos = [
  { src: "/floating-image1.jpg", alt: "Hospital facilities" },
  { src: "/floating-image2.jpg", alt: "Medical team" },
  { src: "/floating-image3.jpg", alt: "Patient care" },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 6000);

    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] bg-primary/200 overflow-hidden flex items-center justify-center py-16 px-4 sm:px-8 lg:px-16">

      <div className="w-full max-w-[1400px] flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

        {/* LEFT: TEXT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
              Welcome to Metro Rizal Doctors Hospital
            </span>
          </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
              Advance Healthcare,<br />
              <span className="text-[#5CA51B]">Right Here in Rizal</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              We are dedicated to providing world-class healthcare, advanced medical facilities, and compassionate service to our community.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/80 text-white rounded-md font-bold text-base text-center transition-all shadow-xl shadow-[#5CA51B]/30 hover:-translate-y-1"
              >
                Contact Us
              </Link>
              <Link
                href="/careers"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-md font-bold text-base text-center transition-all shadow-md shadow-slate-200 border border-slate-200 hover:-translate-y-1"
              >
                Careers
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: iMac-style Monitor & Thumbnails */}
        <div className="w-full lg:w-1/2 relative z-10 flex flex-col items-center justify-center mt-8 lg:mt-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-slate-200 to-slate-100 rounded-full blur-3xl -z-10" />
          <div className="absolute top-10 left-0 lg:-left-10 text-slate-200/80 -z-10 animate-[spin_30s_linear_infinite]">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
          <div className="absolute top-32 right-0 lg:-right-10 text-slate-200/80 -z-10 animate-[spin_40s_linear_infinite_reverse]">
            <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>

          {/* The Monitor Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-[600px] relative px-2 sm:px-0"
          >
            {/* Monitor Top / Bezel + Screen */}
            <div className="w-full bg-[#e2e8f0] p-2 sm:p-3 pb-6 sm:pb-8 rounded-t-2xl rounded-b-md shadow-2xl relative border border-slate-300 border-b-slate-400">

              {/* Inner Screen Form */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-white rounded-sm overflow-hidden border-2 border-slate-300">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={photos[index].src}
                      alt={photos[index].alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Monitor Chin Dot (Webcam / Logo placeholder) */}
              <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-slate-400 rounded-full" />
            </div>

            {/* Monitor Stand */}
            <div className="w-16 h-10 sm:w-24 sm:h-16 bg-gradient-to-b from-[#cbd5e1] to-[#94a3b8] mx-auto relative z-[-1]"
              style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}
            />
            {/* Monitor Base */}
            <div className="w-32 h-2 sm:w-48 sm:h-3 bg-[#94a3b8] mx-auto rounded-t-xl rounded-b-sm shadow-md" />
          </motion.div>

          {/* Thumbnails Navigation*/}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-7 w-full max-w-[600px] z-20"
          >
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative w-18 h-14 sm:w-28 sm:h-20 md:w-32 md:h-24 rounded-sm overflow-hidden shadow-md transition-all duration-300 ${i === index
                    ? "ring-1 ring-primary ring-offset-2 ring-offset-slate-50 scale-110 z-10"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
              >
                <img
                  src={photo.src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
