import { HeroSection } from "@/components/home/hero-section"
import { HospitalIntro } from "@/components/home/hospital-intro"
import { ServicesHighlights } from "@/components/home/services-highlights"
import { DepartmentsPreview } from "@/components/home/departments-preview"
import { DoctorsHighlight } from "@/components/home/doctors-highlight"
import { LatestNews } from "@/components/home/latest-news"
import { Testimonials } from "@/components/home/testimonials"
import { CTABanner } from "@/components/home/cta-banner"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HospitalIntro />
      <ServicesHighlights />
      <DepartmentsPreview />
      <DoctorsHighlight />
      <LatestNews />
      <Testimonials />
      <CTABanner />
    </>
  )
}
