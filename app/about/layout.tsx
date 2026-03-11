import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Legacy of healing at metrodocshospital. Our mission, values, and facilities. Over 25 years of compassionate healthcare.",
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
