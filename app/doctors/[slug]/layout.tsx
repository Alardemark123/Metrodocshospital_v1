import type { Metadata } from "next";
import { getDoctorBySlug } from "@/lib/mock-api";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = getDoctorBySlug(slug);
  if (!doctor) {
    return { title: "Doctor Not Found" };
  }
  return {
    title: doctor.name,
    description: doctor.bio,
    openGraph: {
      title: `${doctor.name} | metrodocshospital`,
      description: doctor.bio,
    },
  };
}

export default function DoctorDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
