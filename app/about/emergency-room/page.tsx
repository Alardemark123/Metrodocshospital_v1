import { FacilityPage } from "@/components/facility-page"
import { Siren } from "lucide-react"

export default function EmergencyRoomPage() {
  return (
    <FacilityPage
      title="Emergency Room"
      subtitle="24/7 Emergency Care"
      description="Our emergency department operates around the clock, providing immediate care for life-threatening conditions and urgent medical needs. Our highly trained emergency medicine team is ready to respond to any medical crisis with speed and expertise."
      icon={Siren}
      features={[
        "24/7 emergency services availability",
        "Rapid triage and assessment",
        "Trauma care specialists",
        "Cardiac emergency response",
        "Stroke care protocols",
        "Pediatric emergency care",
        "On-site diagnostic imaging",
        "Emergency surgical facilities",
        "Intensive Care Unit access",
        "Ambulance and helicopter transport",
      ]}
      highlights={[
        { title: "Average Response Time", value: "<5min" },
        { title: "Emergency Beds", value: "24" },
        { title: "ER Specialists", value: "15" },
        { title: "Lives Saved Yearly", value: "500+" },
      ]}
    />
  )
}
