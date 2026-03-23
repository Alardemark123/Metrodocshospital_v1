"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { HmoMarquee } from "@/components/ui/hmo-marquee";

export function CreditedHmo() {
  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <FadeIn className="mb-8 text-center">
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
