import type { Value, Facility } from "./types"

const values: Value[] = [
  {
    icon: "Heart",
    title: "Compassion",
    description:
      "We treat every patient with empathy, kindness, and respect, recognizing the human being behind every medical case.",
  },
  {
    icon: "Target",
    title: "Excellence",
    description:
      "We pursue the highest standards in medical care, continuously improving our practices and embracing innovation.",
  },
  {
    icon: "Users",
    title: "Collaboration",
    description:
      "We work together as a unified team, partnering with patients and families to achieve the best health outcomes.",
  },
  {
    icon: "Award",
    title: "Integrity",
    description:
      "We uphold honesty, transparency, and ethical conduct in all our interactions and decisions.",
  },
]

const facilities: Facility[] = [
  { name: "Rehab Room", href: "/about/rehab-room", description: "Rehabilitation facility overview" },
  { name: "Radiology Room", href: "/about/radiology-room", description: "Diagnostic imaging services" },
  { name: "Emergency Room", href: "/about/emergency-room", description: "24/7 emergency care" },
  { name: "Second Floor", href: "/about/second-floor", description: "Lobby, Prayer Area, Nursery Complex" },
  { name: "Third Floor", href: "/about/third-floor", description: "Clinics, OPD Waiting Area" },
  { name: "Fourth Floor", href: "/about/fourth-floor", description: "Private, Semi-Private, Suite Rooms" },
]

export function getValues(): Value[] {
  return values
}

export function getFacilities(): Facility[] {
  return facilities
}
