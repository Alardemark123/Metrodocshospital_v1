import type { Metadata } from "next"
import { FacilityPage } from "@/components/facility-page"

export const metadata: Metadata = {
  title: "Third Floor",
  description: "Outpatient services and OPD at metrodocshospital. Specialty clinics and comfortable waiting areas.",
}

export default function ThirdFloorPage() {
  return (
    <FacilityPage
      title="Third Floor"
      subtitle="Outpatient Services"
      description="Our third floor is dedicated to outpatient services, featuring multiple specialty clinics and a comfortable OPD waiting area. This floor is designed to provide efficient, high-quality care for patients who don't require hospitalization."
      iconName="Stethoscope"
      features={[
        "Multiple specialty consultation clinics",
        "General medicine outpatient services",
        "Cardiology clinic",
        "Orthopedic consultation rooms",
        "Pediatric outpatient clinic",
        "Women's health services",
        "Dermatology clinic",
        "ENT consultation rooms",
        "Comfortable OPD waiting areas",
        "Digital queue management system",
      ]}
      sections={[
        {
          title: "Specialty Clinics",
          description: "Ten fully-equipped consultation rooms for various medical specialties, staffed by our expert physicians and support team.",
        },
        {
          title: "OPD Waiting Area",
          description: "A spacious, air-conditioned waiting area with comfortable seating, entertainment systems, and refreshment facilities for patients and companions.",
        },
      ]}
      highlights={[
        { title: "Daily Consultations", value: "200+" },
        { title: "Specialty Clinics", value: "10" },
        { title: "Average Wait Time", value: "15min" },
        { title: "Patient Satisfaction", value: "96%" },
      ]}
    />
  )
}
