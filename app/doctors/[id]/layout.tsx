import type { Metadata } from "next"
import { getDoctorById } from "@/lib/mock-api"

type Props = {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const doctor = getDoctorById(id)
  if (!doctor) {
    return { title: "Doctor Not Found" }
  }
  return {
    title: doctor.name,
    description: doctor.bio,
    openGraph: {
      title: `${doctor.name} | metrodocshospital`,
      description: doctor.bio,
    },
  }
}

export default function DoctorDetailLayout({ children }: { children: React.ReactNode }) {
  return children
}
