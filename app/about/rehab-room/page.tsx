import { FacilityPage } from "@/components/facility-page"
import { Activity } from "lucide-react"

export default function RehabRoomPage() {
  return (
    <FacilityPage
      title="Rehabilitation Room"
      subtitle="Recovery & Therapy"
      description="Our rehabilitation facility is designed to help patients recover their strength, mobility, and independence. With state-of-the-art equipment and experienced therapists, we provide comprehensive rehabilitation services tailored to each patient's needs."
      icon={Activity}
      features={[
        "Physical therapy with certified specialists",
        "Occupational therapy for daily living skills",
        "Speech and language therapy",
        "Post-surgical rehabilitation programs",
        "Stroke recovery programs",
        "Sports injury rehabilitation",
        "Neurological rehabilitation",
        "Cardiac rehabilitation",
        "Advanced therapeutic equipment",
        "Hydrotherapy pool",
      ]}
      highlights={[
        { title: "Therapy Sessions Daily", value: "50+" },
        { title: "Certified Therapists", value: "12" },
        { title: "Recovery Rate", value: "95%" },
        { title: "Equipment Types", value: "30+" },
      ]}
    />
  )
}
