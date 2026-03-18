import type { Metadata } from "next";
import { FacilityPage } from "@/components/facility-page";

export const metadata: Metadata = {
  title: "Third Floor | Metro Rizal Doctors Hospital",
  description:
    "Outpatient services and OPD at Metro Rizal Doctors Hospital. Specialty clinics and comfortable waiting areas.",
};

export default function ThirdFloorPage() {
  return (
    <FacilityPage
      title="Third Floor"
      subtitle="Outpatient Services"
      description="Our third floor is dedicated to outpatient services, featuring multiple specialty clinics and a comfortable OPD waiting area. This floor is designed to provide efficient, high-quality care for patients who don't require hospitalization."
      iconName="Stethoscope"
      images={[
        "/about/third-floor/FRD_5242-1024x683.jpg",
        "/about/third-floor/FRD_5243-1024x683.jpg",
        "/about/third-floor/FRD_5245-1024x683.jpg",
        "/about/third-floor/FRD_5253-1024x683.jpg",
        "/about/third-floor/FRD_5254-1024x683.jpg",
        "/about/third-floor/IMG_7968-1024x683.jpg",
        "/about/third-floor/IMG_7971-1024x683.jpg",
        "/about/third-floor/IMG_7974-1024x683.jpg",
        "/about/third-floor/IMG_7976-1024x683.jpg",
        "/about/third-floor/IMG_7978-1024x683.jpg",
      ]}
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
          description:
            "Ten fully-equipped consultation rooms designed to provide comprehensive care across a range of medical specialties. Each room is staffed by our team of experienced physicians and dedicated support staff, ensuring personalized attention, accurate diagnoses, and high-quality treatment for every patient.",
          images: [
            "/about/third-floor/FRD_5242-1024x683.jpg",
            "/about/third-floor/FRD_5243-1024x683.jpg",
            "/about/third-floor/FRD_5245-1024x683.jpg",
          ],
        },
      ]}

      sections2={[
        {
          title: "OPD Waiting Area",
          description:
            "A spacious, air-conditioned waiting area with comfortable seating, entertainment systems, and refreshment facilities for patients and companions.",
          images: [
            "/about/third-floor/IMG_7974-1024x683.jpg",
            "/about/third-floor/IMG_7976-1024x683.jpg",
            "/about/third-floor/IMG_7978-1024x683.jpg",
          ],
        },
      ]}

      highlights={[
      ]}
      breadcrumblabel="Third Floor"
    />
  );
}
