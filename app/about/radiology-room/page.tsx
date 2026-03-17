import type { Metadata } from "next";
import { FacilityPage } from "@/components/facility-page";

export const metadata: Metadata = {
  title: "Radiology Room | metrodocshospital",
  description:
    "Diagnostic imaging at metrodocshospital: MRI, CT, X-ray, ultrasound, mammography, and image-guided interventions.",
};

export default function RadiologyRoomPage() {
  return (
    <FacilityPage
      title="Radiology Room"
      subtitle="Diagnostic Imaging"
      description="Our radiology department is equipped with the latest imaging technology to provide accurate diagnoses. Our team of skilled radiologists and technicians work together to ensure you receive the highest quality diagnostic services."
      iconName="ScanLine"
      images={[
        "/about/radiology/FRD_5339-1024x683.jpg",
        "/about/radiology/FRD_5340-1024x683.jpg",
        "/about/radiology/FRD_5342-1024x683.jpg",
      ]}
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
      ]}
      breadcrumblabel="Radiology Room"
    />
  );
}
