"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { getServices, ICON_MAP } from "@/lib/mock-api";
import { cn } from "@/lib/utils";

const ORBIT_COLORS = [
  "bg-[#004b23]",    // Shade of Green
  "bg-[#006400]",    
  "bg-[#007200]",    
  "bg-[#008000]",   
  "bg-[#38b000]",   
  "bg-[#70e000]",    
  "bg-[#9ef01a]",      
];

export function ServicesHighlights() {
  const allServices = getServices();
  const services = allServices.slice(0, 6); 
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitRotation, setOrbitRotation] = useState(0);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % services.length);
      setOrbitRotation((prev) => prev + (360 / services.length));
    }, 6000);
    return () => clearInterval(interval);
  }, [services.length]);

  const activeService = services[activeIndex];
  const ActiveIcon = activeService ? ICON_MAP[activeService.icon] : null;

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-9">
        
        {/* Header section */}
        <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-2"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-primary font-normal"
          >
            Comprehensive Healthcare Services
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center">
          
          {/* Left Side: Content Box */}
          <div className="flex flex-col justify-center order-2 lg:order-1 px-4 lg:pl-10 lg:pr-2">
            <motion.h3 
               initial={{ opacity: 0, x: -20 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="text-3xl md:text-[2.75rem] font-bold text-foreground leading-[1.25] mb-8"
            > Excellence in Healthcare  
            </motion.h3>

            <div className="min-h-[260px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex flex-col items-start"
                >
                  <h4 className="text-xl font-bold text-primary mb-3">
                    {activeService?.title || "Services"}
                  </h4>
                  <p className="text-gray-500 leading-relaxed mb-6 max-w-md text-[15px]">
                    {activeService?.description}
                    {" "} This is a sample text and here you need to add your own text that describes your own concept in your way and that fit best for your topic and make it simple as much as you can that is better.
                  </p>
                  
                  {activeService?.href && (
                    <Link
                      href={activeService.href}
                      className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Learn more
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: Orbit Graphic */}
          <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px] order-1 lg:order-2 w-full">
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={isInView ? { opacity: 1, scale: 1 } : {}}
               transition={{ duration: 0.4, delay: 0.3 }}
               className="relative w-full max-w-[330px] md:max-w-[430px] aspect-square"
            >
              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[150px] h-[150px] md:w-[150px] md:h-[150px] bg-[#4f772d] rounded-full flex items-center justify-center shadow-xl border-[5px] border-white transition-all hover:scale-105 duration-500 overflow-hidden">
                 <AnimatePresence mode="popLayout">
                   <motion.div
                     key={activeIndex}
                     initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                     animate={{ opacity: 1, scale: 1, rotate: 0 }}
                     exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                     transition={{ duration: 0.4, ease: "backOut" }}
                     className="flex items-center justify-center p-2"
                   >
                     {ActiveIcon ? (
                       <ActiveIcon className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-md" />
                     ) : (
                       <Settings className="w-16 h-16 md:w-20 md:h-20 text-white animate-[spin_10s_linear_infinite]" />
                     )}
                   </motion.div>
                 </AnimatePresence>
              </div>

              {/* Orbiting Circles Container - Animates Rotation */}
              <motion.div 
                className="absolute inset-0 z-20"
                animate={{ rotate: orbitRotation }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {services.map((service, i) => {
                  const angle = (i * (360 / services.length)) - 90; 
                  const angleRad = (angle * Math.PI) / 180;
                  
                  // Radius percentage
                  const x = 50 + Math.cos(angleRad) * 44; 
                  const y = 50 + Math.sin(angleRad) * 44; 

                  const SIcon = ICON_MAP[service.icon];
                  const isActive = activeIndex === i;
                  const bgColor = ORBIT_COLORS[i % ORBIT_COLORS.length];

                  return (
                    <motion.button
                      key={service.title}
                      onClick={() => {
                        setActiveIndex(i);
                        setOrbitRotation(prev => prev + (360 / services.length));
                      }}
                      // Counter-rotate individual icons so they stay completely upright!
                      initial={{ x: "-50%", y: "-50%", rotate: 0 }}
                      animate={{ x: "-50%", y: "-50%", rotate: -orbitRotation }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className={cn(
                        "absolute",
                        "w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full flex flex-col items-center justify-center gap-1.5 transition-shadow duration-300 ease-out",
                        "border-[5px] shadow-lg z-20 overflow-hidden",
                        bgColor,
                        isActive ? "border-white shadow-2xl z-30 ring-4 ring-primary/50 ring-offset-2" : "border-white/95 opacity-90 hover:opacity-100"
                      )}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                       {SIcon && <SIcon className="w-7 h-7 md:w-8 md:h-8 text-white shrink-0" />}
                       <span className="text-white text-[11px] md:text-[13px] font-semibold px-2 text-center leading-tight line-clamp-2 w-full">
                          {service.title.replace('Department', '').trim()} 
                       </span>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
