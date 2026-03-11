import { FacilityPage } from "@/components/facility-page"
import { Building2 } from "lucide-react"

export default function SecondFloorPage() {
  return (
    <FacilityPage
      title="Second Floor"
      subtitle="Patient Services"
      description="The second floor of ModernCare Hospital houses essential patient services including our welcoming lobby area, a peaceful prayer space for spiritual comfort, and our comprehensive nursery complex for newborns and their families."
      icon={Building2}
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
          description: "A welcoming space designed to ease patient and visitor anxiety with comfortable seating, natural lighting, and helpful staff ready to assist.",
        },
        {
          title: "Prayer Area",
          description: "A serene multi-faith space where patients and families can find spiritual comfort, reflection, and peace during their hospital stay.",
        },
        {
          title: "Nursery Complex",
          description: "State-of-the-art facilities for newborn care, including regular nursery, NICU, and specialized care for premature and high-risk infants.",
        },
      ]}
      highlights={[
        { title: "Seating Capacity", value: "100+" },
        { title: "Nursery Beds", value: "40" },
        { title: "NICU Beds", value: "12" },
        { title: "Prayer Rooms", value: "3" },
      ]}
    />
  )
}
