"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { HmoMarquee } from "@/components/ui/hmo-marquee";

export function CreditedHmo() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-accent/20 blur-2xl" />
      <div className="pointer-events-none absolute right-16 bottom-10 h-16 w-16 rotate-45 rounded-lg border border-primary/10" />
      <div className="pointer-events-none absolute left-10 top-10 h-10 w-10 rounded-full border border-primary/10" />

      <div className="relative mx-auto max-w-7xl px-4">
        <FadeIn className="mb-14 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Accredited Partners
            </span>
          </div>
          <h2 className="mb-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Accredited <span className="text-primary">HMOs</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Metro Rizal Doctors Hospital works with leading health maintenance
            organizations so you can focus on getting better — not on the
            paperwork.
          </p>
        </FadeIn>

        <HmoMarquee />

        <FadeIn className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Don't see your HMO?{" "}
            <Link
              href="/contact"
              className="font-semibold text-primary hover:underline"
            >
              Contact us
            </Link>{" "}
            — we're continuously expanding our accredited partners.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
