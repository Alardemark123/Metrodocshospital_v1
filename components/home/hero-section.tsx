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
      <div className="relative w-full h-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-auto"
          >
            <img
              src={photos[index].src}
              alt={photos[index].alt}
              className="w-full h-auto block"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 md:w-12 bg-[#5CA51B]"
                : "w-2 bg-white/50 hover:bg-white/80 shadow-sm"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
