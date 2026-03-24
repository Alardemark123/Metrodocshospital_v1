"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { src: "/floating-image1.jpg", alt: "Hospital facilities" },
  { src: "/floating-image2.jpg", alt: "Medical team" },
  { src: "/floating-image3.jpg", alt: "Patient care" },
];

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    zIndex: 1,
  },
  exit: {
    opacity: 0,
    zIndex: 0,
  },
};

export function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % photos.length); 
    }, 6000);

    return () => clearInterval(t);
  }, []);

  const goToSlide = (newIndex: number) => {
    setImageIndex(newIndex);
  };

  return (
    <section className="relative w-full max-h-[500px] md:max-h-[600px] lg:max-h-[700px] xl:max-h-[800px] overflow-hidden bg-white">
      <img 
        src={photos[0].src} 
        alt="layout spacer tracking" 
        className="w-full h-auto max-h-[400px] md:max-h-[500px] lg:max-h-[600px] xl:max-h-[700px] object-cover invisible pointer-events-none select-none" 
      />

      {/* Background Slider */}
      <AnimatePresence initial={false}>
        <motion.div
           key={imageIndex}
           variants={variants}
           initial="enter"
           animate="center"
           exit="exit"
           transition={{
             opacity: { duration: 0.9, ease: "easeInOut" },
           }}
           className="absolute inset-0 w-full h-full"
        >
          <img
            src={photos[imageIndex].src}
            alt={photos[imageIndex].alt}
            className="w-full h-full object-cover object-center" 
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-30">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i !== imageIndex) {
                 goToSlide(i);
              }
            }}
            className={`transition-all duration-500 rounded-full shadow-md ${
              i === imageIndex 
                ? "w-8 md:w-12 h-2 md:h-2.5 bg-white opacity-100" 
                : "w-2.5 md:w-3 h-2.5 md:h-3 bg-white/60 hover:bg-white opacity-80 hover:opacity-100"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
    </section>
  );
}
