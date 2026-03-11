import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News & Events",
  description: "Latest news, events, health tips, and community updates from metrodocshospital.",
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
