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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer Martinez",
    quote:
      "The care I received at metrodocshospital was exceptional. From the moment I walked in, the staff made me feel comfortable and well-cared for. Dr. Chen and her team saved my life.",
  },
  {
    id: 2,
    name: "Robert Thompson",
    quote:
      "After my knee surgery, the rehabilitation team at metrodocshospital helped me get back on my feet faster than I ever expected. Their dedication to patient recovery is truly remarkable.",
  },
  {
    id: 3,
    name: "Maria Santos",
    quote:
      "As a new mother, I was anxious about my baby's health. The pediatric team was incredibly supportive and patient, answering all my questions and providing excellent care for my little one.",
  },
  {
    id: 4,
    name: "David Kim",
    quote:
      "The emergency department responded quickly when I had my accident. The doctors and nurses were professional, compassionate, and kept my family informed throughout my treatment.",
  },
  {
    id: 5,
    name: "Linda Foster",
    quote:
      "I've been a patient at metrodocshospital for over 10 years. The consistent quality of care and the genuine concern the staff shows for my well-being keeps me coming back.",
  },
]

export function getFeatures(): Feature[] {
  return features
}

export function getServices(): Service[] {
  return services
}

export function getTestimonials(): Testimonial[] {
  return testimonials
}

export { getDepartmentsPreview }
