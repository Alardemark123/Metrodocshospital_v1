import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Departments",
  description:
    "Specialized medical departments at metrodocshospital. Emergency, radiology, rehabilitation, internal medicine, pediatrics, cardiology, laboratory.",
};

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
