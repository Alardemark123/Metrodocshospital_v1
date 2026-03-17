import type { Metadata } from "next";
import { FacilityPage } from "@/components/facility-page";

export const metadata: Metadata = {
  title: "Rehabilitation Room | Metro Rizal Doctors Hospital",
  description:
    "Recovery and therapy at Metro Rizal Doctors Hospital: physical, occupational, and speech therapy; post-surgical and stroke rehabilitation.",
};

export default function RehabRoomPage() {
  return (
    <FacilityPage
      title="Rehabilitation Room"
      subtitle="Recovery & Therapy"
      description="Our rehabilitation facility is designed to help patients recover their strength, mobility, and independence. With state-of-the-art equipment and experienced therapists, we provide comprehensive rehabilitation services tailored to each patient's needs."
      iconName="Activity"
      images={[
        "/about/rehab/FRD_5332-1024x683.jpg",
        "/about/rehab/FRD_5333-1024x683.jpg",
        "/about/rehab/FRD_5336-1024x683.jpg",
        "/about/rehab/FRD_5337-1024x683.jpg",
        "/about/rehab/IMG_8050-1024x683.jpg",
      ]}
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
      ]}
      breadcrumblabel="Rehab Room"
    />
  );
}
