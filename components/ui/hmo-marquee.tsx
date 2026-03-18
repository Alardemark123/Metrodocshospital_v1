"use client";

import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

const hmoRow1 = [
  { name: "AMAPHIL", logo: "/about/client/1.png" },
  { name: "Asian Life", logo: "/about/client/2.png" },
  { name: "Generali", logo: "/about/client/3.png" },
  { name: "East West Healthcare", logo: "/about/client/4.png" },
  { name: "Cocolife", logo: "/about/client/5.png" },
  { name: "HMI", logo: "/about/client/6.png" },
  { name: "The House Printers", logo: "/about/client/7.png" },
  { name: "Getwell Health Systems", logo: "/about/client/9.png" },
  { name: "Maxicare", logo: "/about/client/19.png" },
  { name: "Philcare", logo: "/about/client/21.png" },
  { name: "Medilink", logo: "/about/client/23.png" },
  { name: "PhilCare", logo: "/about/client/25.png" },
];

const hmoRow2 = [
  { name: "Lacson & Lacson", logo: "/about/client/10.png" },
  { name: "HPPI", logo: "/about/client/11.png" },
  { name: "Avega", logo: "/about/client/12-1.png" },
  { name: "Intellicare", logo: "/about/client/13.png" },
  { name: "Kaiser", logo: "/about/client/14.png" },
  { name: "Life & Health", logo: "/about/client/15.png" },
  { name: "IMS", logo: "/about/client/16.png" },
  { name: "Medicard", logo: "/about/client/18.png" },
  { name: "MedAsia", logo: "/about/client/20.png" },
  { name: "Medicare-Plus", logo: "/about/client/22.png" },
  { name: "Pacific Cross", logo: "/about/client/24.png" },
  { name: "Value Care", logo: "/about/client/26.png" },
];

export function HmoMarquee() {
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  useEffect(() => {
    controls1.start({
      x: ["0%", "-50%"],
      transition: { duration: 22, repeat: Infinity, ease: "linear" },
    });
    controls2.start({
      x: ["-50%", "0%"],
      transition: { duration: 26, repeat: Infinity, ease: "linear" },
    });
  }, [controls1, controls2]);

  const pause = () => {
    controls1.stop();
    controls2.stop();
  };

  const resume = () => {
    controls1.start({
      x: ["0%", "-50%"],
      transition: { duration: 22, repeat: Infinity, ease: "linear" },
    });
    controls2.start({
      x: ["-50%", "0%"],
      transition: { duration: 26, repeat: Infinity, ease: "linear" },
    });
  };

  const sharedCard = (hmo: { name: string; logo: string }, i: number) => (
    <div
      key={i}
      className="flex shrink-0 items-center gap-3 rounded-2xl border border-border bg-card px-6 py-4 shadow-sm"
    >
      <div className="relative h-10 w-20 shrink-0 overflow-hidden rounded-xl bg-white">
        <Image
          src={hmo.logo}
          alt={hmo.name}
          fill
          className="object-contain p-1"
        />
      </div>
      <span className="whitespace-nowrap text-sm font-semibold text-card-foreground">
        {hmo.name}
      </span>
    </div>
  );

  return (
    <div
      className="space-y-4 overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Row 1 — scrolls left */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 gap-4 animate-marquee-left hover:[animation-play-state:paused]">
          {[...hmoRow1, ...hmoRow1].map((hmo, i) => sharedCard(hmo, i))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 gap-4 animate-marquee-right hover:[animation-play-state:paused]">
          {[...hmoRow2, ...hmoRow2].map((hmo, i) => sharedCard(hmo, i))}
        </div>
      </div>
    </div>
  );
}
