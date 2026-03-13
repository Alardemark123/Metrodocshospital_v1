import type { Metadata } from "next";
import { FacilityPage } from "@/components/facility-page";

export const metadata: Metadata = {
  title: "Second Floor | metrodocshospital",
  description:
    "Lobby, prayer area, and nursery complex at metrodocshospital. Patient services and family care.",
};

export default function SecondFloorPage() {
  return (
    <FacilityPage
      title="Second Floor"
      subtitle="Patient Services"
      description="The second floor of metrodocshospital houses essential patient services including our welcoming lobby area, a peaceful prayer space for spiritual comfort, and our comprehensive nursery complex for newborns and their families."
      iconName="Building2"
      images={[
        "/about/second-floor/FRD_5293-1024x683.jpg",
        "/about/second-floor/FRD_5294-1024x683.jpg",
        "/about/second-floor/FRD_5297-1024x683.jpg",
        "/about/second-floor/FRD_5301-1024x683.jpg",
        "/about/second-floor/IMG_7984-1024x683.jpg",
        "/about/second-floor/IMG_7986-1024x683.jpg",
        "/about/second-floor/IMG_8018-1024x683.jpg",
        "/about/second-floor/IMG_8019-1024x683.jpg",
      ]}
      features={[
        "Spacious and comfortable lobby area",
        "Patient registration services",
        "Multi-faith prayer room",
        "Quiet meditation spaces",
        "Advanced nursery facilities",
        "Neonatal Intensive Care Unit (NICU)",
        "Mother-baby bonding rooms",
        "Lactation support center",
        "Family waiting areas",
        "Visitor information desk",
      ]}
      sections={[
        {
          title: "Lobby",
          description:
            "A welcoming space designed to ease patient and visitor anxiety with comfortable seating, natural lighting, and helpful staff ready to assist.",
        },
        {
          title: "Prayer Area",
          description:
            "A serene multi-faith space where patients and families can find spiritual comfort, reflection, and peace during their hospital stay.",
        },
        {
          title: "Nursery Complex",
          description:
            "State-of-the-art facilities for newborn care, including regular nursery, NICU, and specialized care for premature and high-risk infants.",
        },
      ]}
      highlights={[
        { title: "Seating Capacity", value: "100+" },
        { title: "Nursery Beds", value: "40" },
        { title: "NICU Beds", value: "12" },
        { title: "Prayer Rooms", value: "3" },
      ]}
      breadcrumblabel="Second Floor"
    />
  );
}
