"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeatures, ICON_MAP } from "@/lib/mock-api";
import { Button } from "@/components/ui/button";
import { NetworkBackground } from "./network-background";

export function HospitalIntro() {
  const features = getFeatures();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white py-24 md:py-20 overflow-hidden">
      <NetworkBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Editorial Header */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-3xl mb-8 md:mb-10"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-6 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-primary font-medium tracking-widest text-xs sm:text-sm uppercase">
              About Our Hospital
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
            A Legacy of Healing,<br/>
            <span className="text-primary font-extrabold">A Future of Hope.</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-start">
          {/* Left / Video (Spans 7 cols) */}
          <motion.div
             initial={{ opacity: 0, scale: 0.98 }}
             animate={isInView ? { opacity: 1, scale: 1 } : {}}
             transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
             className="col-span-1 lg:col-span-7 gap-10"
          >
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 ring-1 ring-slate-900/5 shadow-2xl shadow-slate-200/50">
              <iframe
                src="https://www.youtube.com/embed/iJMZbE_Pz7Y?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=iJMZbE_Pz7Y"
                title="Metro Rizal Doctors Hospital"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
                suppressHydrationWarning
              />
            </div>
          </motion.div>

          {/* Right / Text & Stats (Spans 5 cols) */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={isInView ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
             className="col-span-1 lg:col-span-5 flex flex-col justify-center pt-4 lg:pt-0"
          >
            <p className="text-lg md:text-lg text-slate-600 leading-relaxed font-light text-pretty mb-6">
              At <strong className="font-semibold text-primary">Metro Rizal Doctors Hospital</strong>, we are committed to providing you with the highest quality of healthcare services. We understand that seeking medical attention can be difficult, and we are here to support you every step of the way.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { value: "25+", label: "Years of Service" },
                { value: "98%", label: "Patient Focus" },
                { value: "50+", label: "Expert Doctors" },
                { value: "24/7", label: "Care & Support" },
              ].map((stat, i) => (
                <div key={stat.label} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-3xl font-black text-primary tracking-tight">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-base transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 w-full sm:w-auto"
              >
                Discover our Story
              </Link>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
