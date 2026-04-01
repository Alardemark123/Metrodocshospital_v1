import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { HospitalIntro } from "@/components/home/hospital-intro";
import { ServicesHighlights } from "@/components/home/services-highlights";
import { DepartmentsPreview } from "@/components/home/departments-preview";
import { DoctorsHighlight } from "@/components/home/doctors-highlight";
import { LatestNews } from "@/components/home/latest-news";
import { Testimonials } from "@/components/home/testimonials";
import { CreditedHmo } from "@/components/home/credited-hmo";
import { NetworkBackground } from "@/components/home/network-background";

export const metadata: Metadata = {
  title: "Home | Metro Rizal Doctors Hospital",
  description:
    "Metro Rizal Doctors Hospital delivers compassionate care with trusted medical professionals. Find doctors, explore departments, and access quality healthcare.",
};

export default function HomePage() {
  return (
    <>
    <NetworkBackground />
      <HeroSection />
      <HospitalIntro />
      <ServicesHighlights />
      {/* <DepartmentsPreview /> */}
      <LatestNews />
      <DoctorsHighlight />
      <CreditedHmo />
      <Testimonials />
    </>
  );
}
