"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-20 -mb-16 md:-mb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-primary/10 p-8 sm:p-10 md:p-12 border border-border/50"
        >
          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
            {/* Left side text and features */}
            <div className="text-center md:text-left text-foreground flex-1">
              <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-foreground">
                Need Medical Assistance?
              </h2>
              <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 mt-4 text-sm font-medium text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" /></div> 
                  Available 24/7
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" /></div> 
                  Certified Specialists
                </li>
                <li className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" /></div> 
                  Emergency Ready
                </li>
              </ul>
            </div>

            {/* Right side Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
               <Button
                 size="lg"
                 variant="outline"
                 asChild
                 className="w-full sm:w-auto border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground transition-all rounded-full px-8 font-semibold"
               >
                 <a href="tel:+15551234567">
                   <Phone className="mr-2 h-4 w-4 text-primary" />
                   Call Hotline
                 </a>
               </Button>
               <Button
                 size="lg"
                 asChild
                 className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-full px-8 shadow-lg shadow-primary/25 font-semibold"
               >
                 <Link href="/contact">
                   Book Appointment
                   <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
               </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
