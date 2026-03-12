import type { Feature, Service, Testimonial } from "./types"
import { getDepartmentsPreview } from "./departments"

const features: Feature[] = [
  {
    icon: "Heart",
    title: "Patient-Centered Care",
    description: "Every treatment plan is tailored to your unique needs and preferences.",
  },
  {
    icon: "Shield",
    title: "Advanced Technology",
    description: "State-of-the-art medical equipment for accurate diagnosis and treatment.",
  },
  {
    icon: "Users",
    title: "Expert Medical Team",
    description: "Board-certified physicians and caring nursing staff dedicated to you.",
  },
  {
    icon: "Award",
    title: "Accredited Excellence",
    description: "Recognized for maintaining the highest standards in healthcare.",
  },
]

const services: Service[] = [
  {
    icon: "Stethoscope",
    title: "General Medicine",
    description: "Comprehensive primary care and preventive health services for all ages.",
    href: "/departments#general-medicine",
  },
  {
    icon: "Heart",
    title: "Cardiology",
    description: "Expert heart care with advanced diagnostic and treatment options.",
    href: "/departments#cardiology",
  },
  {
    icon: "Brain",
    title: "Neurology",
    description: "Specialized care for brain, spine, and nervous system conditions.",
    href: "/departments#neurology",
  },
  {
    icon: "Baby",
    title: "Pediatrics",
    description: "Gentle, expert care for infants, children, and adolescents.",
    href: "/departments#pediatrics",
  },
  {
    icon: "Bone",
    title: "Orthopedics",
    description: "Treatment for bones, joints, muscles, and sports injuries.",
    href: "/departments#orthopedics",
  },
  {
    icon: "Eye",
    title: "Ophthalmology",
    description: "Complete eye care from routine exams to advanced surgery.",
    href: "/departments#ophthalmology",
  },
]



export function getFeatures(): Feature[] {
  return features
}

export function getServices(): Service[] {
  return services
}

export { getDepartmentsPreview }
