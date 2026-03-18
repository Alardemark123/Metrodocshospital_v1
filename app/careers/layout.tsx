import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers",
  description: "Build your career at Metro Rizal Doctors Hospital. Explore job openings, benefits, and join our healthcare team.",
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
