import type { Metadata } from "next"
import { FacilityPage } from "@/components/facility-page"

export const metadata: Metadata = {
  title: "Radiology Room",
  description: "Diagnostic imaging at metrodocshospital: MRI, CT, X-ray, ultrasound, mammography, and image-guided interventions.",
}

export default function RadiologyRoomPage() {
  return (
    <FacilityPage
      title="Radiology Room"
      subtitle="Diagnostic Imaging"
      description="Our radiology department is equipped with the latest imaging technology to provide accurate diagnoses. Our team of skilled radiologists and technicians work together to ensure you receive the highest quality diagnostic services."
      iconName="ScanLine"
      features={[
        "Digital X-ray imaging",
        "Magnetic Resonance Imaging (MRI)",
        "Computed Tomography (CT) scans",
        "Ultrasound imaging",
        "Mammography screening",
        "Fluoroscopy procedures",
        "Nuclear medicine imaging",
        "PET-CT scanning",
        "Bone density scanning (DEXA)",
        "Image-guided interventions",
      ]}
      highlights={[
        { title: "Scans Per Day", value: "100+" },
        { title: "Imaging Machines", value: "8" },
        { title: "Report Turnaround", value: "24h" },
        { title: "Accuracy Rate", value: "99%" },
      ]}
    />
  )
}
