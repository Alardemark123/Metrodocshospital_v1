import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Doctors",
  description: "Meet our expert physicians at metrodocshospital. Board-certified doctors across cardiology, neurology, pediatrics, and more.",
}

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
