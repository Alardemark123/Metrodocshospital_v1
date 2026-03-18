"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { src: "/floating-image1.jpg", alt: "Hospital facilities" },
  { src: "/floating-image2.jpg", alt: "Medical team" },
  { src: "/floating-image3.jpg", alt: "Patient care" },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // We remove [index] from the dependency array.
    // The functional update (prev) ensures we always have the current value.
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 6000);

    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 1. We lock the height here using an aspect ratio (e.g., 16/7) */}
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] lg:aspect-[21/9] bg-gray-100">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            /* 2. Absolute positioning ensures the next image overlaps the old one 
             without pushing the content down */
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={photos[index].src}
              alt={photos[index].alt}
              /* 3. object-cover ensures the image fills the locked box perfectly */
              className="w-full h-full object-cover block"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-12 bg-[#5CA51B]"
                : "w-2 bg-white/50 hover:bg-white/80 shadow-md"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
