import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Department",
  description:
    "Specialized medical departments at metrodocshospital. Emergency, radiology, rehabilitation, internal medicine, pediatrics, cardiology, laboratory.",
};

export default function DepartmentDetails({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
