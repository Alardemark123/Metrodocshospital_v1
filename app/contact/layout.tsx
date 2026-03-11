import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact metrodocshospital. Address, phone, hours, and contact form. Schedule appointments and get in touch.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
