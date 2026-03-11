import type { Department, DepartmentPreview } from "./types"

const departments: Department[] = [
  {
    id: "emergency",
    icon: "Siren",
    name: "Emergency Department",
    description: "Our 24/7 emergency department is equipped to handle all medical emergencies with rapid response teams, trauma specialists, and state-of-the-art equipment.",
    features: ["24/7 availability", "Trauma care", "Cardiac emergencies", "Pediatric emergencies"],
    color: "bg-red-500/10 text-red-600",
    bgGradient: "from-red-500/20 to-red-500/5",
  },
  {
    id: "radiology",
    icon: "ScanLine",
    name: "Radiology",
    description: "Advanced diagnostic imaging services including MRI, CT scans, X-rays, ultrasound, and nuclear medicine for accurate diagnosis and treatment planning.",
    features: ["MRI & CT scans", "Digital X-ray", "Ultrasound", "Mammography"],
    color: "bg-blue-500/10 text-blue-600",
    bgGradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "rehabilitation",
    icon: "Activity",
    name: "Rehabilitation",
    description: "Comprehensive physical therapy and rehabilitation programs to help patients recover strength, mobility, and independence after surgery, injury, or illness.",
    features: ["Physical therapy", "Occupational therapy", "Speech therapy", "Cardiac rehab"],
    color: "bg-primary/10 text-primary",
    bgGradient: "from-primary/20 to-primary/5",
  },
  {
    id: "internal-medicine",
    icon: "Pill",
    name: "Internal Medicine",
    description: "Expert diagnosis and management of adult diseases, chronic conditions, and complex medical cases by our team of experienced internists.",
    features: ["Chronic disease management", "Preventive care", "Health screenings", "Adult immunizations"],
    color: "bg-purple-500/10 text-purple-600",
    bgGradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: "pediatrics",
    icon: "Baby",
    name: "Pediatrics",
    description: "Specialized healthcare for infants, children, and adolescents, from routine check-ups to complex pediatric conditions, in a child-friendly environment.",
    features: ["Well-child visits", "Vaccinations", "Developmental care", "Pediatric specialists"],
    color: "bg-pink-500/10 text-pink-600",
    bgGradient: "from-pink-500/20 to-pink-500/5",
  },
  {
    id: "cardiology",
    icon: "HeartPulse",
    name: "Cardiology",
    description: "Comprehensive heart care from prevention to intervention, including diagnostic testing, cardiac catheterization, and heart failure management.",
    features: ["ECG & Echo", "Stress testing", "Cardiac catheterization", "Heart failure clinic"],
    color: "bg-red-500/10 text-red-600",
    bgGradient: "from-red-500/20 to-red-500/5",
  },
  {
    id: "laboratory",
    icon: "FlaskConical",
    name: "Laboratory",
    description: "State-of-the-art diagnostic laboratory providing accurate and timely test results to support clinical decision-making and patient care.",
    features: ["Blood tests", "Pathology", "Microbiology", "Rapid results"],
    color: "bg-teal-500/10 text-teal-600",
    bgGradient: "from-teal-500/20 to-teal-500/5",
  },
]

export function getDepartments(): Department[] {
  return departments
}

export function getDepartmentFilters(): string[] {
  return ["All", "Cardiology", "Internal Medicine", "Pediatrics", "Rehabilitation", "Emergency", "Radiology", "Laboratory"]
}

export function getDepartmentsPreview(): DepartmentPreview[] {
  return departments.map((d) => ({
    icon: d.icon,
    name: d.name,
    description:
      d.id === "emergency"
        ? "24/7 emergency care with rapid response teams ready to handle any medical crisis."
        : d.id === "radiology"
          ? "Advanced imaging services including MRI, CT scans, X-rays, and ultrasound."
          : d.id === "rehabilitation"
            ? "Comprehensive physical therapy and rehabilitation programs for recovery."
            : d.id === "internal-medicine"
              ? "Expert diagnosis and treatment of adult diseases and chronic conditions."
              : d.id === "pediatrics"
                ? "Specialized healthcare for infants, children, and adolescents."
                : d.id === "cardiology"
                  ? "Comprehensive heart care from prevention to advanced interventions."
                  : "State-of-the-art diagnostic testing with quick and accurate results.",
    color: d.color,
    href: `/departments#${d.id}`,
  }))
}
