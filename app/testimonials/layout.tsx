import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what our patients say about their experience at Metro Docs Hospital — real stories from real people we've had the privilege to care for.",
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
