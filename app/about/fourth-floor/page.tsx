import type { Metadata } from "next";
import { FacilityPage } from "@/components/facility-page";

export const metadata: Metadata = {
  title: "Fourth Floor | metrodocshospital",
  description:
    "Inpatient rooms at metrodocshospital: private suites, semi-private rooms, 24/7 nursing care.",
};

export default function FourthFloorPage() {
  return (
    <FacilityPage
      title="Fourth Floor"
      subtitle="Inpatient Rooms"
      description="The fourth floor houses our inpatient facilities, offering a range of room options from private suites to semi-private accommodations. Each room is designed with patient comfort and recovery in mind, supported by our dedicated nursing stations."
      iconName="Bed"
      images={[
        "/about/fourth-floor/FRD_5218-1024x683.jpg",
        "/about/fourth-floor/FRD_5224-1024x682.jpg",
        "/about/fourth-floor/FRD_5225-1024x683.jpg",
        "/about/fourth-floor/FRD_5230-1024x683.jpg",
        "/about/fourth-floor/FRD_5232-1024x683.jpg",
        "/about/fourth-floor/FRD_5234-1024x683.jpg",
        "/about/fourth-floor/FRD_5235-1024x683.jpg",
        "/about/fourth-floor/IMG_7938-1024x683.jpg",
        "/about/fourth-floor/IMG_7945-1024x683.jpg",
        "/about/fourth-floor/IMG_7949-1024x682.jpg",
        "/about/fourth-floor/IMG_7951-1024x683.jpg",
        "/about/fourth-floor/IMG_7954-1024x683.jpg",
        "/about/fourth-floor/IMG_7955-1024x683.jpg",
        "/about/fourth-floor/IMG_7959-1024x683.jpg",
      ]}
      features={[
        "Luxurious private suite rooms",
        "Comfortable semi-private rooms",
        "Standard private rooms",
        "24/7 nurse call system",
        "In-room entertainment systems",
        "Private bathrooms in all rooms",
        "Adjustable medical beds",
        "Climate control in each room",
        "Family accommodation options",
        "Room service dining",
      ]}
      sections={[
        {
          title: "Private Room",
          description:
            "Single-occupancy rooms offering privacy and comfort, ideal for patients who prefer personal space during their recovery.",
        },
        {
          title: "Semi-Private Room",
          description:
            "Shared accommodations with curtain dividers, providing a balance of community support and personal space at an affordable rate.",
        },
        {
          title: "Suite Room",
          description:
            "Premium accommodations with living area, private bathroom, and enhanced amenities for patients seeking the highest level of comfort.",
        },
        {
          title: "Nurse Station",
          description:
            "Centrally located nursing stations ensuring rapid response to patient needs with continuous monitoring and care coordination.",
        },
      ]}
      highlights={[
        { title: "Total Beds", value: "120" },
        { title: "Private Suites", value: "15" },
        { title: "Nurse Stations", value: "4" },
        { title: "Nurses on Duty", value: "20" },
      ]}
    />
  );
}
